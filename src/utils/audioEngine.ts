/**
 * Procedural Tactile Audio Engine
 * Zero-byte procedural sound synthesis using native Web Audio API (AudioContext).
 * Generates mechanical keyboard clicks, tactile UI pops, and theme-switch chirps.
 */

class TactileAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.isMuted = localStorage.getItem('sl_sound_effects') !== 'enabled';
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public isMutedState(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sl_sound_effects', this.isMuted ? 'disabled' : 'enabled');
    }
    if (!this.isMuted) {
      this.initContext();
      this.playClick('soft');
    }
    return this.isMuted;
  }

  public playClick(type: 'mechanical' | 'soft' | 'toggle' | 'bell' = 'soft') {
    if (this.isMuted || typeof window === 'undefined') return;

    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (type === 'mechanical') {
      // Keystroke "thock" sound: fast triangle burst dropping in pitch
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.02);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
      osc.start(now);
      osc.stop(now + 0.03);
    } else if (type === 'toggle') {
      // Harmonic chirp for theme toggle
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(1040, now + 0.035);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.045);
    } else if (type === 'bell') {
      // Terminal alert bell
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.07);
    } else {
      // Soft UI press pop
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);
      osc.start(now);
      osc.stop(now + 0.02);
    }

    osc.connect(gain);
    gain.connect(this.ctx.destination);
  }
}

export const audioEngine = new TactileAudioEngine();
