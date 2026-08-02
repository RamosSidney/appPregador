// Audio Service: Web Speech Synthesis (TTS) & Web Speech Recognition (STT) for pt-BR

class AudioService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.recognition = null;
    this.utterance = null;
    this.isPlaying = false;
    this.isListening = false;
    this.currentRate = 1.0;
  }

  // =========================================================================
  // 1. TEXT-TO-SPEECH (TTS)
  // =========================================================================

  speak(text, { rate = 1.0, onProgress, onEnd, onError } = {}) {
    if (!this.synth) {
      console.warn("Web SpeechSynthesis não suportado neste navegador.");
      if (onError) onError(new Error("Navegador não suporta áudio de voz."));
      return;
    }

    this.stop(); // Stop any previous speech
    this.currentRate = rate;

    // Clean Markdown tags for natural speech
    const cleanText = text
      .replace(/#{1,6}\s?/g, '')
      .replace(/[*_`]/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .trim();

    this.utterance = new SpeechSynthesisUtterance(cleanText);
    this.utterance.lang = 'pt-BR';
    this.utterance.rate = rate;

    // Try selecting a natural pt-BR voice if available
    const voices = this.synth.getVoices();
    const ptVoice = voices.find(v => v.lang.includes('pt-BR') || v.lang.includes('pt_BR'));
    if (ptVoice) {
      this.utterance.voice = ptVoice;
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

  // =========================================================================
  // 2. SPEECH-TO-TEXT (STT - RECONHECIMENTO DE VOZ)
  // =========================================================================

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
      } catch (e) {}
      this.isListening = false;
    }
  }
}

export const audioService = new AudioService();
