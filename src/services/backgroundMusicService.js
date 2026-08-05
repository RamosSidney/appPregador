// Background Music Service for Bible Reading (Pixabay Moments of Impact Cinematic & Ambient)

export const MUSIC_TRACKS = [
  {
    id: 'moments_of_impact',
    name: '🎻 Moments of Impact (Cinematic)',
    desc: 'Pixabay Orchestral Cinematic Series 541168',
    url: 'https://cdn.pixabay.com/download/audio/2024/02/08/audio_55b3769c0d.mp3?filename=moments-of-impact-541168.mp3'
  },
  {
    id: 'cinematic',
    name: '🎼 Orquestral Motivacional',
    desc: 'Épico & Inspirador',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=cinematic-documentary-115669.mp3'
  },
  {
    id: 'piano',
    name: '🎹 Piano Devocional Suave',
    desc: 'Calmo & Meditativo',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=inspiring-cinematic-ambient-116199.mp3'
  },
  {
    id: 'synth_pad',
    name: '🌌 Ambient Worship Pad (Offline)',
    desc: 'Atmosférico & Imersivo',
    isSynth: true
  }
];

class BackgroundMusicService {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.currentTrackId = 'moments_of_impact';
    this.volume = 0.25; // Fixed 25% volume so it never overpowers narration
    this.audioCtx = null;
    this.synthOscillators = [];
    this.synthGain = null;
  }

  playSynthPad() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioCtx();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.stopSynthPad();

      this.synthGain = this.audioCtx.createGain();
      this.synthGain.gain.setValueAtTime(this.volume * 0.4, this.audioCtx.currentTime);
      this.synthGain.connect(this.audioCtx.destination);

      // Warm C Major 9th chord frequencies (C3, G3, B3, D4, E4)
      const freqs = [130.81, 196.00, 246.94, 293.66, 329.63];
      this.synthOscillators = freqs.map(freq => {
        const osc = this.audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        const oscGain = this.audioCtx.createGain();
        oscGain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(this.synthGain);
        osc.start();
        return osc;
      });

      this.isPlaying = true;
    } catch (err) {
      console.warn("Erro ao iniciar synth pad:", err);
    }
  }

  stopSynthPad() {
    if (this.synthOscillators.length > 0) {
      this.synthOscillators.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch (e) {}
      });
      this.synthOscillators = [];
    }
  }

  play(trackId = null) {
    if (trackId) {
      this.currentTrackId = trackId;
    }

    const track = MUSIC_TRACKS.find(t => t.id === this.currentTrackId) || MUSIC_TRACKS[0];

    if (track.isSynth) {
      if (this.audio) {
        this.audio.pause();
      }
      this.playSynthPad();
      return;
    }

    this.stopSynthPad();

    if (!this.audio || this.audio.src !== track.url) {
      this.audio = new Audio(track.url);
      this.audio.loop = true;
    }

    this.audio.volume = 0.25; // Fixed 25% volume
    this.audio.play()
      .then(() => {
        this.isPlaying = true;
      })
      .catch((err) => {
        console.warn("Autoplay de áudio Pixabay bloqueado. Usando synth pad fallback:", err);
        this.playSynthPad();
      });
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
    this.stopSynthPad();
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
    this.volume = 0.25; // Keep 25%
    if (this.audio) {
      this.audio.volume = 0.25;
    }
    if (this.synthGain && this.audioCtx) {
      this.synthGain.gain.setValueAtTime(0.25 * 0.4, this.audioCtx.currentTime);
    }
  }
}

export const backgroundMusicService = new BackgroundMusicService();
