// Audio Service: Web Speech Synthesis (TTS) & Web Speech Recognition (STT) for pt-BR

class AudioService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.recognition = null;
    this.utterance = null;
    this.isPlaying = false;
    this.isListening = false;
    this.currentRate = 1.0;
    this.voicesList = [];

    if (this.synth) {
      this.loadVoices();
      if (typeof window !== 'undefined' && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return [];
    const rawVoices = this.synth.getVoices();
    const ptVoices = rawVoices.filter(v => v.lang.toLowerCase().includes('pt'));
    this.voicesList = ptVoices.length > 0 ? ptVoices : rawVoices;
    return this.voicesList;
  }

  getAvailableVoices() {
    if (!this.voicesList || this.voicesList.length === 0) {
      this.loadVoices();
    }
    return this.voicesList;
  }

  speak(text, { rate = 1.0, voiceName = null, style = 'pastor', pitch = 1.0, onProgress, onEnd, onError } = {}) {
    if (!this.synth) {
      console.warn("Web SpeechSynthesis não suportado neste navegador.");
      if (onError) onError(new Error("Navegador não suporta áudio de voz."));
      return;
    }

    this.stop();
    this.currentRate = rate;

    // Clean Markdown tags for natural speech
    const cleanText = text
      .replace(/#{1,6}\s?/g, '')
      .replace(/[*_`]/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .trim();

    this.utterance = new SpeechSynthesisUtterance(cleanText);
    this.utterance.lang = 'pt-BR';

    // Apply Voice Style Presets
    let adjustedRate = rate;
    let adjustedPitch = pitch;

    if (style === 'pastor') {
      adjustedRate = rate * 0.95;
      adjustedPitch = 0.9;
    } else if (style === 'mentora') {
      adjustedRate = rate * 0.95;
      adjustedPitch = 1.15;
    } else if (style === 'genz') {
      adjustedRate = rate * 1.15;
      adjustedPitch = 1.0;
    } else if (style === 'devocional') {
      adjustedRate = rate * 0.85;
      adjustedPitch = 0.85;
    }

    this.utterance.rate = Math.max(0.5, Math.min(2.0, adjustedRate));
    this.utterance.pitch = Math.max(0.5, Math.min(2.0, adjustedPitch));

    // Try finding specified voice by name or select natural pt-BR voice
    const voices = this.getAvailableVoices();
    let selectedVoiceObj = null;

    if (voiceName) {
      selectedVoiceObj = voices.find(v => v.name === voiceName);
    }

    if (!selectedVoiceObj && style === 'mentora') {
      selectedVoiceObj = voices.find(v => /female|feminina|francisca|luciana|helena|maria|joana|zira/i.test(v.name));
    } else if (!selectedVoiceObj && style === 'pastor') {
      selectedVoiceObj = voices.find(v => /male|masculin|antonio|felipe|daniel|ricardo|humberto/i.test(v.name));
    }

    if (!selectedVoiceObj) {
      selectedVoiceObj = voices.find(v => v.lang.toLowerCase().includes('pt-br') || v.lang.toLowerCase().includes('pt_br')) || voices[0];
    }

    if (selectedVoiceObj) {
      this.utterance.voice = selectedVoiceObj;
    }

    let charCount = 0;
    this.utterance.onboundary = (e) => {
      if (onProgress && cleanText.length > 0) {
        charCount = e.charIndex;
        const progressPercent = Math.min(100, Math.round((charCount / cleanText.length) * 100));
        onProgress(progressPercent);
      }
    };

    this.utterance.onend = () => {
      this.isPlaying = false;
      if (onEnd) onEnd();
    };

    this.utterance.onerror = (err) => {
      this.isPlaying = false;
      if (onError) onError(err);
    };

    this.isPlaying = true;
    this.synth.speak(this.utterance);
  }

  pause() {
    if (this.synth && this.isPlaying) {
      this.synth.pause();
      this.isPlaying = false;
    }
  }

  resume() {
    if (this.synth && !this.isPlaying) {
      this.synth.resume();
      this.isPlaying = true;
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isPlaying = false;
    }
  }

  setRate(rate) {
    this.currentRate = rate;
    if (this.utterance) {
      this.utterance.rate = rate;
    }
  }

  startListening({ onResult, onEnd, onError }) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      if (onError) onError(new Error("Navegador não suporta reconhecimento de voz (STT)."));
      return;
    }

    if (this.recognition) {
      this.stopListening();
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'pt-BR';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (onResult) {
        onResult({ finalTranscript, interimTranscript });
      }
    };

    this.recognition.onerror = (err) => {
      this.isListening = false;
      if (onError) onError(err);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onEnd) onEnd();
    };

    this.isListening = true;
    this.recognition.start();
  }

  stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.isListening = false;
    }
  }
}

export const audioService = new AudioService();
