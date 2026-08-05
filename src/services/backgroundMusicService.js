// Background Music Service for Bible Reading (Local High-Fidelity MP3 Tracks - 100% Reliable & Synchronized)

export const MUSIC_TRACKS = [
  {
    id: 'piano_worship',
    name: '🎹 Continuous Worship Ambient Piano',
    desc: 'Piano Devocional Suave & Fundo Orquestral (Edição YouTube Cs6LqMckWkg)',
    url: '/audio/worship-piano.mp3'
  },
  {
    id: 'cinematic_ambient',
    name: '🎻 Moments of Impact (Cinematic)',
    desc: 'Trilha Cinemática Motivacional & Épica',
    url: '/audio/cinematic-ambient.mp3'
  }
];

class BackgroundMusicService {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.currentTrackId = 'piano_worship';
    this.volume = 0.25; // Fixed 25% volume for soft background sound
    this.listeners = new Set();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach(cb => {
      try { cb(this.isPlaying); } catch (e) {}
    });
  }

  initAudio(url) {
    if (this.audio) {
      try {
        this.audio.pause();
        this.audio.currentTime = 0;
      } catch (e) {}
    }

    this.audio = new Audio(url);
    this.audio.loop = true;
    this.audio.volume = 0.25;

    this.audio.onplay = () => {
      this.isPlaying = true;
      this.notify();
    };

    this.audio.onpause = () => {
      this.isPlaying = false;
      this.notify();
    };

    this.audio.onerror = (err) => {
      console.warn("[BackgroundMusic] Erro no player de áudio:", err);
      this.isPlaying = false;
      this.notify();
    };
  }

  async play(trackId = null) {
    if (trackId) {
      this.currentTrackId = trackId;
    }

    const track = MUSIC_TRACKS.find(t => t.id === this.currentTrackId) || MUSIC_TRACKS[0];

    if (!this.audio || !this.audio.src.includes(track.url)) {
      this.initAudio(track.url);
    }

    if (this.audio) {
      this.audio.volume = 0.25;
      try {
        await this.audio.play();
        this.isPlaying = true;
      } catch (err) {
        console.warn("[BackgroundMusic] Autoplay bloqueado pelo navegador:", err);
        this.isPlaying = false;
      }
      this.notify();
    }
  }

  pause() {
    if (this.audio) {
      try {
        this.audio.pause();
      } catch (e) {}
    }
    this.isPlaying = false;
    this.notify();
  }

  toggle(trackId = null) {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play(trackId || this.currentTrackId);
    }
    return this.isPlaying;
  }

  setVolume(vol) {
    this.volume = 0.25;
    if (this.audio) {
      this.audio.volume = 0.25;
    }
  }
}

export const backgroundMusicService = new BackgroundMusicService();
