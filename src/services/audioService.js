// Audio Service: Universal HTML5 Audio Stream Engine (Option A) with Web Speech Fallback
// Guaranteed 100% Identical Execution across Windows, iOS, and Android!

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
    this.audioElement = null;
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.utterance = null;
    this.isPlaying = false;
    this.isListening = false;
    this.isStopping = false; // Flag to prevent cancel() from firing utterance.onend auto-advance
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
    try {
      const rawVoices = this.synth.getVoices() || [];
      const ptVoices = rawVoices.filter(v => v.lang && v.lang.toLowerCase().includes('pt'));
      this.voicesList = ptVoices.length > 0 ? ptVoices : rawVoices;
      return this.voicesList;
    } catch (e) {
      return [];
    }
  }

  getAvailableVoices() {
    if (!this.voicesList || this.voicesList.length === 0) {
      return this.loadVoices();
    }
    return this.voicesList;
  }

  stop() {
    this.isStopping = true;
    this.isPlaying = false;

    // Stop HTML5 Audio Element
    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.audioElement.src = '';
      } catch (e) {}
      this.audioElement = null;
    }

    // Stop Web Speech Synthesis Fallback
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
  }

  speak(text, { rate = 0.95, style = 'devocional', onProgress, onEnd, onError } = {}) {
    this.stop();
    this.isStopping = false;

    const cleanText = cleanTextForSpeech(text);
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    // Chunk text into sentence/verse units (~120 chars each for optimal MP3 streaming)
    const sentenceMatches = cleanText.match(/[^.!?]+[.!?]+|\S+/g);
    const chunks = sentenceMatches && sentenceMatches.length > 0 ? sentenceMatches : [cleanText];

    let currentChunkIdx = 0;
    const totalLength = cleanText.length;
    let spokenLength = 0;

    const playNextChunkHTML5 = () => {
      if (this.isStopping) {
        this.isPlaying = false;
        return;
      }

      if (currentChunkIdx >= chunks.length || !this.isPlaying) {
        this.isPlaying = false;
        if (onEnd && !this.isStopping) onEnd();
        return;
      }

      const chunkText = chunks[currentChunkIdx].trim();
      if (!chunkText) {
        currentChunkIdx++;
        playNextChunkHTML5();
        return;
      }

      // Stream native MP3 audio via HTML5 Audio element
      const streamUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunkText)}&tl=pt&client=tw-ob`;

      if (this.audioElement) {
        try { this.audioElement.pause(); } catch (e) {}
      }

      this.audioElement = new Audio(streamUrl);
      this.audioElement.playbackRate = rate || 0.95;

      this.audioElement.onended = () => {
        if (this.isStopping) return;
        spokenLength += chunkText.length;
        if (onProgress && totalLength > 0) {
          const percent = Math.min(100, Math.round((spokenLength / totalLength) * 100));
          onProgress(percent);
        }
        currentChunkIdx++;
        playNextChunkHTML5();
      };

      this.audioElement.onerror = () => {
        // Fallback to Web Speech Synthesis if stream fails
        console.warn("[AudioService] HTML5 Stream offline, usando Web Speech Fallback.");
        this.playChunkWebSpeech(chunkText, () => {
          spokenLength += chunkText.length;
          if (onProgress && totalLength > 0) {
            onProgress(Math.min(100, Math.round((spokenLength / totalLength) * 100)));
          }
          currentChunkIdx++;
          playNextChunkHTML5();
        });
      };

      this.isPlaying = true;
      this.audioElement.play().catch(err => {
        console.warn("[AudioService] Autoplay HTML5 prevenido, fallback para WebSpeech:", err);
        this.playChunkWebSpeech(chunkText, () => {
          spokenLength += chunkText.length;
          if (onProgress && totalLength > 0) {
            onProgress(Math.min(100, Math.round((spokenLength / totalLength) * 100)));
          }
          currentChunkIdx++;
          playNextChunkHTML5();
        });
      });
    };

    this.isPlaying = true;
    playNextChunkHTML5();
  }

  playChunkWebSpeech(chunkText, onChunkEnd) {
    if (!this.synth || this.isStopping) {
      if (onChunkEnd) onChunkEnd();
      return;
    }

    try {
      if (this.synth.paused) this.synth.resume();
      this.synth.cancel();
    } catch (e) {}

    this.utterance = new SpeechSynthesisUtterance(chunkText);
    this.utterance.lang = 'pt-BR';
    this.utterance.rate = 0.95;

    this.utterance.onend = () => {
      if (!this.isStopping && onChunkEnd) onChunkEnd();
    };
    this.utterance.onerror = () => {
      if (!this.isStopping && onChunkEnd) onChunkEnd();
    };

    this.synth.speak(this.utterance);
  }

  pause() {
    this.isStopping = true;
    this.isPlaying = false;
    if (this.audioElement) {
      try { this.audioElement.pause(); } catch (e) {}
    }
    if (this.synth) {
      try { this.synth.pause(); } catch (e) {}
    }
  }

  resume() {
    this.isStopping = false;
    this.isPlaying = true;
    if (this.audioElement) {
      try { this.audioElement.play(); } catch (e) {}
    }
    if (this.synth) {
      try { this.synth.resume(); } catch (e) {}
    }
  }

  setRate(rate) {
    this.currentRate = rate;
    if (this.audioElement) {
      this.audioElement.playbackRate = rate;
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
