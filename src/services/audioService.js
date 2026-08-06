// Audio Service: High-Performance Speech Synthesis Engine (OpenAI Neural TTS + Web Speech API Fallback)

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
    this.utterance = null;
    this.audioElement = null; // Elemento HTML5 Audio para OpenAI TTS stream
    this.isPlaying = false;
    this.isListening = false;
    this.isStopping = false; // Prevents cancel() from firing utterance.onend auto-advance
    this.currentRate = 1.0;
    this.voicesList = [];
    this.androidKeepAliveTimer = null;
    this.openaiKey = null;

    if (this.synth) {
      this.loadVoices();
      if (typeof window !== 'undefined' && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  setOpenAIKey(key) {
    if (key && typeof key === 'string') {
      this.openaiKey = key.trim();
      try {
        localStorage.setItem('app_pregador_openai_key', this.openaiKey);
      } catch (e) {}
    }
  }

  getOpenAIKey() {
    if (this.openaiKey) return this.openaiKey;
    try {
      return localStorage.getItem('app_pregador_openai_key') || null;
    } catch (e) {
      return null;
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
    this.clearAndroidKeepAlive();
    this.currentSpeechToken = null;

    if (this.utterance) {
      try {
        this.utterance.onend = null;
        this.utterance.onerror = null;
        this.utterance = null;
      } catch (e) {}
    }

    // Parar áudio HTML5 da OpenAI se estiver tocando
    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.audioElement.src = '';
        this.audioElement = null;
      } catch (e) {}
    }

    // Parar síntese nativa
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
  }

  speak(text, { rate = 0.95, style = 'devocional', voiceName = null, openaiKey = null, engine = null, onProgress, onEnd, onError } = {}) {
    this.stop();
    this.isStopping = false;
    this.currentRate = rate;

    const token = Symbol('speechToken');
    this.currentSpeechToken = token;

    const cleanText = cleanTextForSpeech(text);
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const keyToUse = openaiKey || this.getOpenAIKey();

    // Se o usuário escolheu uma voz do sistema (ex: Microsoft Maria, Google) ou engine 'native', usa o motor nativo do navegador
    const isExplicitSystemVoice = voiceName && voiceName !== 'system_default' && !voiceName.startsWith('openai_') && !['onyx', 'nova', 'fable', 'alloy', 'echo', 'shimmer'].includes(voiceName);

    if (engine === 'native' || isExplicitSystemVoice) {
      this.speakNative(cleanText, { rate, style, voiceName, onProgress, onEnd, onError }, token);
      return;
    }

    // Se tivermos uma chave da OpenAI e for voz OpenAI ou estilo temático, usa OpenAI Neural Audio
    if (keyToUse && keyToUse.trim() !== '') {
      this.speakOpenAI(cleanText, { rate, style, voiceName, onProgress, onEnd, onError }, keyToUse.trim(), token);
      return;
    }

    // Fallback nativo do navegador se não houver chave OpenAI
    this.speakNative(cleanText, { rate, style, voiceName, onProgress, onEnd, onError }, token);
  }

  async speakOpenAI(cleanText, { rate = 1.0, style = 'pastor', voiceName = null, onProgress, onEnd, onError }, apiKey, token) {
    // Mapeamento estrito: se voiceName for informado e for voz OpenAI, usa voiceName. Caso contrário, usa o estilo!
    let openAiVoice = 'onyx';

    if (voiceName && voiceName.startsWith('openai_')) {
      openAiVoice = voiceName.replace('openai_', '');
    } else if (['onyx', 'nova', 'fable', 'alloy', 'echo', 'shimmer'].includes(voiceName)) {
      openAiVoice = voiceName;
    } else if (style === 'mentora') {
      openAiVoice = 'nova'; // Tom feminino acolhedor
    } else if (style === 'pastor') {
      openAiVoice = 'onyx'; // Tom masculino solene
    } else if (style === 'devocional') {
      openAiVoice = 'fable'; // Tom calmo, narrativa reflexiva
    } else if (style === 'genz') {
      openAiVoice = 'alloy'; // Tom jovem e equilibrado
    }

    // Truncar textos excessivamente longos para evitar estourar limites em requisições únicas se necessário
    const safeText = cleanText.length > 4000 ? cleanText.substring(0, 4000) + '...' : cleanText;

    try {
      this.isPlaying = true;

      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'tts-1',
          input: safeText,
          voice: openAiVoice,
          speed: Math.max(0.5, Math.min(2.0, rate))
        })
      });

      if (this.currentSpeechToken !== token || this.isStopping) return;

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error?.message || `Status HTTP ${response.status} na API da OpenAI Audio`);
      }

      const blob = await response.blob();
      if (this.currentSpeechToken !== token || this.isStopping) return;

      if (this.audioElement) {
        try {
          this.audioElement.pause();
          this.audioElement.currentTime = 0;
          this.audioElement.src = '';
          this.audioElement = null;
        } catch (e) {}
      }

      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      this.audioElement = audio;
      audio.playbackRate = rate;

      audio.ontimeupdate = () => {
        if (this.currentSpeechToken !== token) {
          try { audio.pause(); audio.src = ''; } catch (e) {}
          return;
        }
        if (this.audioElement && this.audioElement.duration && onProgress) {
          const pct = Math.min(100, Math.round((this.audioElement.currentTime / this.audioElement.duration) * 100));
          onProgress(pct);
        }
      };

      audio.onended = () => {
        if (this.currentSpeechToken !== token) return;
        this.isPlaying = false;
        this.audioElement = null;
        if (onEnd && !this.isStopping) onEnd();
      };

      audio.onerror = (e) => {
        if (this.currentSpeechToken !== token) return;
        console.warn("[AudioService] Erro ao tocar stream da OpenAI:", e);
        this.audioElement = null;
        // Fallback automático para nativo
        this.speakNative(cleanText, { rate, style, voiceName, onProgress, onEnd, onError }, token);
      };

      await this.audioElement.play();

    } catch (err) {
      if (this.currentSpeechToken !== token) return;
      console.warn("[AudioService] Falha na API OpenAI TTS. Recorrendo ao motor nativo:", err.message);
      this.isPlaying = false;
      this.audioElement = null;
      // Fallback gracioso para a voz nativa do sistema em caso de erro na API
      this.speakNative(cleanText, { rate, style, voiceName, onProgress, onEnd, onError }, token);
    }
  }

  speakNative(cleanText, { rate = 0.95, style = 'devocional', voiceName = null, onProgress, onEnd, onError }, token) {
    if (this.currentSpeechToken !== token || this.isStopping) return;

    if (!this.synth) {
      console.warn("Web SpeechSynthesis não suportado neste navegador.");
      if (onError) onError(new Error("Navegador não suporta áudio de voz."));
      return;
    }

    this.isStopping = false;
    this.currentRate = rate;

    // Android/iOS Resume unlock
    try {
      if (this.synth.paused) {
        this.synth.resume();
      }
      this.synth.cancel();
    } catch (e) {}

    // Chunk text into sentence/phrase units for natural speech flow
    const sentenceMatches = cleanText.match(/[^.!?]+[.!?]+|\S+/g);
    const chunks = sentenceMatches && sentenceMatches.length > 0 ? sentenceMatches : [cleanText];

    let currentChunkIdx = 0;
    const totalLength = cleanText.length;
    let spokenLength = 0;

    const speakNextChunk = () => {
      if (this.isStopping || !this.isPlaying || this.currentSpeechToken !== token) {
        this.clearAndroidKeepAlive();
        this.isPlaying = false;
        return;
      }

      if (currentChunkIdx >= chunks.length) {
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
      let adjustedPitch = 1.0;

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

      const voices = this.getAvailableVoices();
      if (voiceName) {
        const customV = voices.find(v => v.name === voiceName);
        if (customV) {
          try { this.utterance.voice = customV; } catch (e) {}
        }
      } else {
        const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent);
        if (!isAndroid) {
          let selectedVoiceObj = voices.find(v => v.lang && v.lang.toLowerCase().includes('pt-br'));
          if (selectedVoiceObj) {
            try { this.utterance.voice = selectedVoiceObj; } catch (e) {}
          }
        }
      }

      this.utterance.onend = () => {
        if (this.isStopping || this.currentSpeechToken !== token) return;
        spokenLength += chunkText.length;
        if (onProgress && totalLength > 0) {
          const percent = Math.min(100, Math.round((spokenLength / totalLength) * 100));
          onProgress(percent);
        }
        currentChunkIdx++;
        speakNextChunk();
      };

      this.utterance.onerror = (err) => {
        if (this.isStopping || this.currentSpeechToken !== token) return;
        if (err.error === 'interrupted' || err.error === 'canceled') return;
        console.warn("[AudioService] Erro no trecho nativo:", err.error || err);
      };

      try {
        if (this.synth.paused) {
          this.synth.resume();
        }
      } catch (e) {}

      this.isPlaying = true;
      this.synth.speak(this.utterance);
    };

    this.isPlaying = true;
    this.startAndroidKeepAlive();
    speakNextChunk();
  }

  startAndroidKeepAlive() {
    this.clearAndroidKeepAlive();
    this.androidKeepAliveTimer = setInterval(() => {
      if (this.synth && this.isPlaying && !this.isStopping && !this.audioElement) {
        try {
          if (this.synth.paused || this.synth.pending) {
            this.synth.resume();
          }
        } catch (e) {}
      }
    }, 1500);

    if (typeof document !== 'undefined' && !this._boundVisibilityHandler) {
      this._boundVisibilityHandler = () => {
        if (document.visibilityState === 'hidden' && this.synth && this.isPlaying && !this.isStopping && !this.audioElement) {
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
    this.isPlaying = false;
    if (this.audioElement) {
      try { this.audioElement.pause(); } catch (e) {}
    } else if (this.synth) {
      try {
        this.synth.pause();
      } catch (e) {}
    }
  }

  resume() {
    this.isStopping = false;
    this.isPlaying = true;
    if (this.audioElement) {
      try { this.audioElement.play(); } catch (e) {}
    } else if (this.synth) {
      try {
        this.synth.resume();
      } catch (e) {}
    }
  }

  setRate(rate) {
    this.currentRate = rate;
    if (this.audioElement) {
      try { this.audioElement.playbackRate = rate; } catch (e) {}
    }
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

