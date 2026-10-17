import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Type,
  Plus,
  Minus,
  Clock,
  Mic,
  MicOff,
  Sparkles,
  RefreshCw,
  Award
} from 'lucide-react';
import { marked } from 'marked';
import { sanitizeHtml } from '../services/securityService.js';
import { analyzeOratoryCoachAI } from '../services/aiService.js';

export default function PulpitMode({ sermon, config, userCredits = 100, onDeductCredit, onClose }) {
  const [fontSize, setFontSize] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 640 ? 22 : 30));
  const [speed, setSpeed] = useState(0); // 0 = Off, 1 = Slow, 2 = Normal, 3 = Fast
  const [timerSeconds, setTimerSeconds] = useState(900); // 15 mins default
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const scrollRef = useRef(null);

  // Proposta 3: Coach de Oratória & Didática com IA
  const [isCoachOpen, setIsCoachOpen] = useState(false);
  const [isRecordingCoach, setIsRecordingCoach] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [coachFeedback, setCoachFeedback] = useState('');
  const [isAnalyzingCoach, setIsAnalyzingCoach] = useState(false);
  const recognitionRef = useRef(null);

  // Auto-scroll loop
  useEffect(() => {
    if (speed === 0) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        let step = speed === 1 ? 1 : speed === 2 ? 2.5 : 4.5;
        scrollRef.current.scrollTop += step;
      }
    }, 40);

    return () => clearInterval(interval);
  }, [speed]);

  // Timer Countdown loop
  useEffect(() => {
    if (!isTimerRunning) return;

    const timer = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  // Recording duration counter for Oratory Coach
  useEffect(() => {
    if (!isRecordingCoach) return;
    const recTimer = setInterval(() => {
      setRecordingSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(recTimer);
  }, [isRecordingCoach]);

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  const formatTimer = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConfigureTimer = () => {
    if (isTimerRunning) {
      alert("Pause o cronômetro para configurar o tempo!");
      return;
    }
    const mins = prompt("Configure o tempo do sermão (em minutos):", Math.floor(timerSeconds / 60));
    if (mins) {
      const parsed = parseInt(mins, 10);
      if (!isNaN(parsed) && parsed > 0) {
        setTimerSeconds(parsed * 60);
      }
    }
  };

  // Start / Stop Live Speech Practice for Oratory Coach
  const handleToggleCoachRecording = () => {
    if (isRecordingCoach) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      setIsRecordingCoach(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Seu navegador não suporta captura de voz direta. Você pode digitar seu trecho abaixo ou clicar em "Gerar Guia de Oratória do Esboço"!');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let fullText = '';
      for (let i = 0; i < event.results.length; i++) {
        fullText += event.results[i][0].transcript + ' ';
      }
      setSpokenTranscript(fullText.trim());
    };

    recognition.onerror = () => {
      setIsRecordingCoach(false);
    };

    recognition.onend = () => {
      setIsRecordingCoach(false);
    };

    setSpokenTranscript('');
    setRecordingSeconds(0);
    setIsRecordingCoach(true);
    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleRunCoachEvaluation = async (useTranscript = true) => {
    if (userCredits <= 0) {
      alert('Créditos de Raios insuficientes!');
      return;
    }

    if (isRecordingCoach && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsRecordingCoach(false);
    }

    setIsAnalyzingCoach(true);
    try {
      const result = await analyzeOratoryCoachAI({
        sermonTitle: sermon?.title || 'Estudo Bíblico',
        sermonOutline: sermon?.content || '',
        spokenTranscript: useTranscript ? spokenTranscript : '',
        durationSeconds: recordingSeconds || 60,
        config
      });
      if (onDeductCredit) await onDeductCredit();
      setCoachFeedback(result);
    } catch (err) {
      alert(err.message || 'Erro ao consultar o Coach de Oratória.');
    } finally {
      setIsAnalyzingCoach(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black text-white flex flex-col overflow-hidden h-dvh pt-safe pb-safe">
      {/* Top Floating Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 sm:p-4 bg-slate-950/95 border-b border-white/10 backdrop-blur-xl shrink-0">
        {/* Row 1: Close + Title + Coach Button + Mobile Timer */}
        <div className="flex items-center justify-between gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onClose}
              aria-label="Sair do Modo Púlpito"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-white/15 text-slate-300 hover:text-white flex items-center justify-center shrink-0 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xs sm:text-sm font-black text-amber-400 truncate max-w-[140px] sm:max-w-xs">
              {sermon?.title || 'Modo Púlpito'}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Proposta 3: Coach de Oratória Button */}
            <button
              type="button"
              onClick={() => setIsCoachOpen(!isCoachOpen)}
              className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                isCoachOpen
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-purple-600/25 border border-purple-400/40 text-purple-200 hover:bg-purple-600 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Coach Oratória IA</span>
            </button>

            {/* Mobile Timer */}
            <div className="flex sm:hidden items-center gap-1 bg-slate-900 border border-white/10 rounded-xl px-2 py-1.5">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-0.5 text-amber-400 hover:text-white cursor-pointer"
                aria-label="Iniciar ou pausar cronômetro"
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>
              <span
                onClick={handleConfigureTimer}
                className="text-xs font-black text-amber-400 cursor-pointer font-mono"
              >
                {formatTimer(timerSeconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: Font Size + Scroll Speed + Desktop Timer */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          {/* Font Size Controls */}
          <div className="flex items-center gap-1 bg-slate-900 border border-white/10 rounded-xl px-2 py-1 shrink-0">
            <Type className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => setFontSize(Math.max(16, fontSize - 2))}
              className="w-7 h-7 flex items-center justify-center text-slate-200 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              aria-label="Diminuir fonte"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-white w-6 text-center font-mono">{fontSize}</span>
            <button
              onClick={() => setFontSize(Math.min(56, fontSize + 2))}
              className="w-7 h-7 flex items-center justify-center text-slate-200 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              aria-label="Aumentar fonte"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Scroll Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-900 border border-white/10 rounded-xl p-1 flex-1 sm:flex-initial justify-around">
            {[
              { label: 'Parado', val: 0 },
              { label: '1x', val: 1 },
              { label: '2x', val: 2 },
              { label: '3x', val: 3 },
            ].map((s) => (
              <button
                key={s.val}
                onClick={() => setSpeed(s.val)}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex-1 sm:flex-initial text-center ${
                  speed === s.val
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Desktop Timer */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1 text-amber-400 hover:text-white cursor-pointer"
            >
              {isTimerRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <span
              onClick={handleConfigureTimer}
              className="text-xs font-black text-amber-400 cursor-pointer hover:underline flex items-center gap-1 font-mono"
              title="Clique para configurar o tempo"
            >
              <Clock className="w-3.5 h-3.5" />
              {formatTimer(timerSeconds)}
            </span>

            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(900);
              }}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Proposta 3: Collapsible Coach de Oratória & Didática Drawer */}
      {isCoachOpen && (
        <div className="bg-slate-900/95 border-b border-purple-500/40 px-4 py-4 sm:px-8 max-h-[65dvh] overflow-y-auto space-y-4 shrink-0">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Laboratório Coach de Oratória & Didática</span>
                </h4>
                <p className="text-xs text-slate-300">
                  Treine sua introdução por voz para medir ritmo (PPM) e clareza, ou gere dicas imediatas de entonação e pausas para este estudo.
                </p>
              </div>
              <button
                onClick={() => setIsCoachOpen(false)}
                className="text-xs font-bold text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-950 border border-white/10 cursor-pointer"
              >
                Fechar Coach
              </button>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleToggleCoachRecording}
                className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
                  isRecordingCoach
                    ? 'bg-rose-600 text-white animate-pulse shadow-lg'
                    : 'bg-slate-950 hover:bg-slate-800 border border-white/15 text-cyan-300'
                }`}
              >
                {isRecordingCoach ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    <span>Parar Gravação ({recordingSeconds}s)</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 text-cyan-400" />
                    <span>1. Treinar Minha Voz no Microfone</span>
                  </>
                )}
              </button>

              {spokenTranscript && (
                <button
                  type="button"
                  disabled={isAnalyzingCoach}
                  onClick={() => handleRunCoachEvaluation(true)}
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Avaliar Minha Fala Gravada</span>
                </button>
              )}

              <button
                type="button"
                disabled={isAnalyzingCoach}
                onClick={() => handleRunCoachEvaluation(false)}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-xs font-black flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Gerar Guia de Entonação & Pausas Deste Esboço</span>
              </button>
            </div>

            {/* Live Transcript Box */}
            {(isRecordingCoach || spokenTranscript) && (
              <div className="rounded-xl bg-slate-950/90 border border-white/10 p-3 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400">
                  Transcrição do Seu Treino ({recordingSeconds}s):
                </span>
                <p className="text-xs text-slate-200 italic">
                  {spokenTranscript || 'Ouvindo sua voz... fale o início da sua mensagem ou explicação bíblica...'}
                </p>
              </div>
            )}

            {/* Loading or AI Coach Feedback */}
            {isAnalyzingCoach && (
              <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 flex items-center gap-3 text-xs text-purple-200">
                <RefreshCw className="w-4 h-4 animate-spin text-purple-400 shrink-0" />
                <span>O Coach de Homilética está analisando ritmo, clareza e estrutura didática...</span>
              </div>
            )}

            {coachFeedback && !isAnalyzingCoach && (
              <div
                className="prose prose-invert max-w-none text-xs sm:text-sm bg-slate-950/90 border border-purple-500/30 rounded-2xl p-4 sm:p-5 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(marked.parse(coachFeedback)) }}
              />
            )}
          </div>
        </div>
      )}

      {/* Teleprompter Scroll Container */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 sm:p-10 md:p-16 max-w-4xl mx-auto w-full leading-relaxed space-y-6 select-none"
        style={{ fontSize: `${fontSize}px` }}
      >
        <div
          className="prose prose-invert max-w-none text-slate-100 font-serif leading-relaxed break-words"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(marked.parse(sermon?.content || '')) }}
        />
        <div className="h-[55dvh]" />
      </div>
    </div>
  );
}
