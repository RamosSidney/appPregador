// Audio Service: Web Speech Synthesis (TTS) & Web Speech Recognition (STT) for pt-BR (100% Android Chrome & Mobile Compatibility)

export const cleanTextForSpeech = (text) => {
  if (!text) return '';
  return text
    // Remove Emojis e Símbolos Unicode
    .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
    // Remove textos de animação/status
    .replace(/\b\d+\s*SEG\b/gi, '')
    .replace(/\bGerando Mensagem.*?\b/gi, '')
    .replace(/\bAbrindo mensagem.*?\b/gi, '')
    .replace(/\bPROCESSANDO INTELIGÊNCIA.*?\b/gi, '')
    // Remove marcadores de Markdown (*, #, _, ~, `, >, -, +, =, |, etc.)
    .replace(/[*#_~`>-]/g, ' ')
    // Remove URLs e links Markdown
    .replace(/\[.*?\]\(.*?\)/g, '')
    // Remove tags HTML
    .replace(/<[^>]*>?/gm, '')
    // Remove múltiplos espaços
    .replace(/\s+/g, ' ')
    .trim();
};

class AudioService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.recognition = null;
    this.utterance = null;
    this.isPlaying = false;
    this.isListening = false;
    this.isStopping = false; // Flag to prevent synth.cancel() from triggering utterance.onend auto-advance
    this.currentRate = 1.0;
    this.voicesList = [];
    this.androidKeepAliveTimer = null;

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
    this.isStopping = false;
    this.currentRate = rate;

    const cleanText = cleanTextForSpeech(text);

    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    try {
      if (this.synth.paused) {
        this.synth.resume();
      }
      this.synth.cancel();
    } catch (e) {}

    const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent);

    const sentenceMatches = cleanText.match(/[^.!?]+[.!?]+|\S+/g);
    const chunks = isAndroid && cleanText.length > 150 && sentenceMatches
      ? sentenceMatches
      : [cleanText];

    let currentChunkIdx = 0;
    const totalLength = cleanText.length;
    let spokenLength = 0;

    const speakNextChunk = () => {
      if (this.isStopping) {
        this.clearAndroidKeepAlive();
        this.isPlaying = false;
        return;
      }

      if (currentChunkIdx >= chunks.length || !this.isPlaying) {
        this.clearAndroidKeepAlive();
        this.isPlaying = false;
        if (onEnd && !this.isStopping) onEnd();
        return;
      }

      const chunkText = chunks[currentChunkIdx].trim();
      if (!chunkText) {
        currentChunkIdx++;
        speakNextChunk();
        return;
      }

      this.utterance = new SpeechSynthesisUtterance(chunkText);
      this.utterance.lang = 'pt-BR';
      this.utterance.volume = 1.0;

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

      if (!isAndroid) {
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
          selectedVoiceObj = voices.find(v => v.lang.toLowerCase().includes('pt-br') || v.lang.toLowerCase().includes('pt_br'));
        }

        if (selectedVoiceObj) {
          try {
            this.utterance.voice = selectedVoiceObj;
          } catch (e) {}
        }
      }

      this.utterance.onend = () => {
        if (this.isStopping) return;
        spokenLength += chunkText.length;
        if (onProgress && totalLength > 0) {
          const percent = Math.min(100, Math.round((spokenLength / totalLength) * 100));
          onProgress(percent);
        }
        currentChunkIdx++;
        speakNextChunk();
      };

      this.utterance.onerror = (err) => {
        if (this.isStopping) return;
        console.warn("[AudioService] Erro ao sintetizar trecho:", err);
        currentChunkIdx++;
        speakNextChunk();
      };

      try {
        if (this.synth.paused) {
          this.synth.resume();
        }
      } catch (e) {}

      this.synth.speak(this.utterance);
    };

    this.isPlaying = true;
    this.startAndroidKeepAlive();
    speakNextChunk();
  }

  startAndroidKeepAlive() {
    this.clearAndroidKeepAlive();
    this.androidKeepAliveTimer = setInterval(() => {
      if (this.synth && this.isPlaying && !this.isStopping) {
        try {
          if (this.synth.paused || this.synth.pending) {
            this.synth.resume();
          }
        } catch (e) {}
      }
    }, 1500);

    if (typeof document !== 'undefined' && !this._boundVisibilityHandler) {
      this._boundVisibilityHandler = () => {
        if (document.visibilityState === 'hidden' && this.synth && this.isPlaying && !this.isStopping) {
          try { this.synth.resume(); } catch (e) {}
        }
      };
      document.addEventListener('visibilitychange', this._boundVisibilityHandler);
    }
  }

  clearAndroidKeepAlive() {
    if (this.androidKeepAliveTimer) {
      clearInterval(this.androidKeepAliveTimer);
      this.androidKeepAliveTimer = null;
    }
  }

  pause() {
    this.isStopping = true;
    if (this.synth && this.isPlaying) {
      try {
        this.synth.pause();
      } catch (e) {}
      this.isPlaying = false;
    }
  }

  resume() {
    this.isStopping = false;
    if (this.synth && !this.isPlaying) {
      try {
        this.synth.resume();
      } catch (e) {}
      this.isPlaying = true;
    }
  }

  stop() {
    this.isStopping = true;
    this.clearAndroidKeepAlive();
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
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
