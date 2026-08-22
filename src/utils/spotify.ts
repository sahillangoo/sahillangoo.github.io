/**
 * Curated Local Focus Playlist & Spotify Telemetry
 * Local-only configuration without external network or API fetch calls.
 */

export interface SpotifyTrack {
  title: string;
  artist: string;
  songUrl: string;
  albumTag?: string;
}

export const SPOTIFY_TRACKS: readonly SpotifyTrack[] = [
  {
    title: 'Jhoom',
    artist: 'Ali Zafar',
    songUrl: 'https://open.spotify.com/search/Jhoom%20Ali%20Zafar',
    albumTag: 'Indie Pop',
  },
  {
    title: 'Pasoori',
    artist: 'Ali Sethi & Shae Gill',
    songUrl: 'https://open.spotify.com/search/Pasoori%20Ali%20Sethi%20Shae%20Gill',
    albumTag: 'Coke Studio 14',
  },
  {
    title: 'Tu Jhoom',
    artist: 'Abida Parveen & Naseebo Lal',
    songUrl: 'https://open.spotify.com/search/Tu%20Jhoom%20Abida%20Parveen%20Naseebo%20Lal',
    albumTag: 'Coke Studio 14',
  },
  {
    title: 'Afreen Afreen',
    artist: 'Rahat Fateh Ali Khan & Momina Mustehsan',
    songUrl: 'https://open.spotify.com/search/Afreen%20Afreen%20Coke%20Studio',
    albumTag: 'Coke Studio 9',
  },
  {
    title: 'Tajdar-e-Haram',
    artist: 'Atif Aslam',
    songUrl: 'https://open.spotify.com/search/Tajdar-e-Haram%20Atif%20Aslam',
    albumTag: 'Coke Studio 8',
  },
  {
    title: 'Faasle',
    artist: 'Kaavish & Quratulain Balouch',
    songUrl: 'https://open.spotify.com/search/Faasle%20Kaavish%20Coke%20Studio',
    albumTag: 'Coke Studio 10',
  },
  {
    title: 'Parichay',
    artist: 'Amit Trivedi',
    songUrl: 'https://open.spotify.com/search/Parichay%20Amit%20Trivedi',
    albumTag: 'Indie Classics',
  },
];

export function getFeaturedTrack(index = 0): SpotifyTrack {
  return SPOTIFY_TRACKS[index % SPOTIFY_TRACKS.length] ?? SPOTIFY_TRACKS[0]!;
}

export function getNextTrack(currentIndex: number): { track: SpotifyTrack; nextIndex: number } {
  const nextIndex = (currentIndex + 1) % SPOTIFY_TRACKS.length;
  return {
    track: SPOTIFY_TRACKS[nextIndex] ?? SPOTIFY_TRACKS[0]!,
    nextIndex,
  };
}

export function getRandomTrack(): SpotifyTrack {
  const randomIndex = Math.floor(Math.random() * SPOTIFY_TRACKS.length);
  return SPOTIFY_TRACKS[randomIndex] ?? SPOTIFY_TRACKS[0]!;
}
