/**
 * Procedural Tactile Audio Engine
 * Zero-byte procedural sound synthesis using native Web Audio API (AudioContext).
 * Pre-warms synthesized AudioBuffers to eliminate live oscillator/gain allocations and GC pressure.
 * Automatically suspends AudioContext when idle or backgrounded to conserve battery.
 */

type SoundType = 'mechanical' | 'soft' | 'toggle' | 'bell';

class TactileAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private buffers: Map<SoundType, AudioBuffer> = new Map();
  private isMuted: boolean = true;
  private isPreWarmed: boolean = false;
  private suspendTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.isMuted = localStorage.getItem('sl_sound_effects') !== 'enabled';

      // Sync mute state across browser tabs
      window.addEventListener('storage', (e) => {
        if (e.key === 'sl_sound_effects') {
          this.isMuted = e.newValue !== 'enabled';
        }
      });

      // Suspend audio context when tab is backgrounded
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && this.ctx && this.ctx.state === 'running') {
          this.ctx.suspend().catch(() => {});
        }
      });
    }
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;

      this.ctx = new AudioCtx({ latencyHint: 'interactive' });
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    if (!this.isPreWarmed) {
      this.preWarmBuffers();
    }

    return this.ctx;
  }

  /**
   * Pre-synthesizes procedural clicks into static AudioBuffers using OfflineAudioContext.
   * Completely eliminates oscillator allocation, ramp math, and GC churn during clicks.
   */
  private preWarmBuffers(): void {
    if (typeof window === 'undefined') return;
    this.isPreWarmed = true;

    const OfflineCtx =
      window.OfflineAudioContext ||
      (window as unknown as { webkitOfflineAudioContext: typeof OfflineAudioContext })
        .webkitOfflineAudioContext;
    if (!OfflineCtx) return;

    const sampleRate = this.ctx?.sampleRate || 44100;

    const renderSound = async (
      type: SoundType,
      duration: number,
      builder: (ctx: OfflineAudioContext) => void
    ) => {
      try {
        const frameCount = Math.ceil(sampleRate * duration);
        const offline = new OfflineCtx(1, frameCount, sampleRate);
        builder(offline);
        const rendered = await offline.startRendering();
        this.buffers.set(type, rendered);
      } catch {
        // Fallback to real-time synthesis if offline render fails
      }
    };

    // 1. Mechanical "thock": triangle wave pitch drop
    renderSound('mechanical', 0.035, (ctx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, 0);
      osc.frequency.exponentialRampToValueAtTime(250, 0.02);
      gain.gain.setValueAtTime(0.04, 0);
      gain.gain.exponentialRampToValueAtTime(0.0001, 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(0);
      osc.stop(0.03);
    });

    // 2. Toggle: harmonic sine chirp
    renderSound('toggle', 0.05, (ctx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, 0);
      osc.frequency.exponentialRampToValueAtTime(1040, 0.035);
      gain.gain.setValueAtTime(0.035, 0);
      gain.gain.exponentialRampToValueAtTime(0.0001, 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(0);
      osc.stop(0.045);
    });

    // 3. Bell: terminal square chime
    renderSound('bell', 0.075, (ctx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, 0);
      gain.gain.setValueAtTime(0.025, 0);
      gain.gain.exponentialRampToValueAtTime(0.0001, 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(0);
      osc.stop(0.07);
    });

    // 4. Soft: subtle sine press pop
    renderSound('soft', 0.025, (ctx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, 0);
      gain.gain.setValueAtTime(0.03, 0);
      gain.gain.exponentialRampToValueAtTime(0.0001, 0.018);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(0);
      osc.stop(0.02);
    });
  }

  private scheduleAutoSuspend(): void {
    if (this.suspendTimer) {
      clearTimeout(this.suspendTimer);
    }
    this.suspendTimer = setTimeout(() => {
      if (this.ctx && this.ctx.state === 'running') {
        this.ctx.suspend().catch(() => {});
      }
      this.suspendTimer = null;
    }, 2000);
  }

  public isMutedState(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sl_sound_effects', this.isMuted ? 'disabled' : 'enabled');
      window.dispatchEvent(
        new CustomEvent('sl-audio-mute-change', { detail: { isMuted: this.isMuted } })
      );
    }
    if (!this.isMuted) {
      this.initContext();
      this.playClick('soft');
    }
    return this.isMuted;
  }

  public playClick(type: SoundType = 'soft'): void {
    if (this.isMuted || typeof window === 'undefined') return;

    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    this.scheduleAutoSuspend();

    const buffer = this.buffers.get(type);
    if (buffer) {
      // Zero-GC Path: AudioBuffer playback with immediate onended disconnection
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.masterGain);
      source.addEventListener(
        'ended',
        () => {
          source.disconnect();
        },
        { once: true }
      );
      source.start();
      return;
    }

    // Fallback Path: Live procedural node synthesis with explicit node disconnection
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'mechanical') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.02);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
      osc.start(now);
      osc.stop(now + 0.03);
    } else if (type === 'toggle') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(1040, now + 0.035);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.045);
    } else if (type === 'bell') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.07);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);
      osc.start(now);
      osc.stop(now + 0.02);
    }

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.addEventListener(
      'ended',
      () => {
        osc.disconnect();
        gain.disconnect();
      },
      { once: true }
    );
  }
}

export const audioEngine = new TactileAudioEngine();
