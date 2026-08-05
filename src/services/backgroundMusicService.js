// Background Music Service for Bible Reading (Continuous Piano Worship & Ambient Pad - Crystal Clear MP3)

export const MUSIC_TRACKS = [
  {
    id: 'piano_worship',
    name: '🎹 Continuous Worship Ambient Piano',
    desc: 'Piano Devocional Suave (Youtube Cs6LqMckWkg Edition)',
    url: 'https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a73467.mp3'
  },
  {
    id: 'moments_of_impact',
    name: '🎻 Moments of Impact (Cinematic)',
    desc: 'Pixabay Orchestral Series 541168',
    url: 'https://cdn.pixabay.com/audio/2024/02/08/audio_55b3769c0d.mp3'
  },
  {
    id: 'ambient_strings',
    name: '🌌 Ambient Worship Pad & Strings',
    desc: 'Atmosférico & Profundo',
    url: 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3'
  }
];

class BackgroundMusicService {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.currentTrackId = 'piano_worship';
    this.volume = 0.25; // Fixed 25% volume for soft background sound
  }

  play(trackId = null) {
    if (trackId) {
      this.currentTrackId = trackId;
    }

    const track = MUSIC_TRACKS.find(t => t.id === this.currentTrackId) || MUSIC_TRACKS[0];

    if (!this.audio || this.audio.src !== track.url) {
      if (this.audio) {
        try { this.audio.pause(); } catch (e) {}
      }
      this.audio = new Audio(track.url);
      this.audio.loop = true;
      this.audio.crossOrigin = 'anonymous';
    }

    this.audio.volume = 0.25; // 25% volume
    this.audio.play()
      .then(() => {
        this.isPlaying = true;
      })
      .catch((err) => {
        console.warn("Autoplay de fundo musical bloqueado ou aguardando interação:", err);
        this.isPlaying = false;
      });
  }

  pause() {
    if (this.audio) {
      try {
        this.audio.pause();
      } catch (e) {}
    }
    this.isPlaying = false;
  }

  toggle(trackId = null) {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play(trackId || this.currentTrackId);
      return true;
    }
  }

  setVolume(vol) {
    this.volume = 0.25;
    if (this.audio) {
      this.audio.volume = 0.25;
    }
  }
}

export const backgroundMusicService = new BackgroundMusicService();
