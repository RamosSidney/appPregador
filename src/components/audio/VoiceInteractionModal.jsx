import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, PhoneOff, Sparkles, Volume2, MessageSquare, RefreshCw } from 'lucide-react';
import VisualizerWave from './VisualizerWave.jsx';
import { audioService } from '../../services/audioService.js';
import { mentorChatAI } from '../../services/aiService.js';

export default function VoiceInteractionModal({
  isOpen,
  onClose,
  mentor,
  config,
  onDeductCredit
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const initialGreeting = `Olá! Sou o avatar teológico de ${mentor?.name || 'C.S. Lewis'}. Pode falar comigo pelo microfone!`;
      setSubtitle(initialGreeting);
      audioService.speak(initialGreeting, {
        onProgress: () => setIsSpeaking(true),
        onEnd: () => {
          setIsSpeaking(false);
          startMicListening();
        }
      });
    } else {
      audioService.stop();
      audioService.stopListening();
    }
  }, [isOpen, mentor]);

  const startMicListening = () => {
    if (isMuted) return;

    audioService.startListening({
      onResult: ({ finalTranscript, interimTranscript }) => {
        setLiveTranscript(finalTranscript || interimTranscript);

        if (finalTranscript && finalTranscript.trim().length > 3) {
          handleVoiceQuery(finalTranscript);
        }
      },
      onError: (err) => console.warn("Erro no microfone:", err)
    });
    setIsListening(true);
  };

  const handleVoiceQuery = async (queryText) => {
    audioService.stopListening();
    setIsListening(false);
    setSubtitle(`Processando sua dúvida: "${queryText}"...`);

    const newHistory = [...chatHistory, { role: 'user', content: queryText }];
    setChatHistory(newHistory);

    try {
      if (onDeductCredit) await onDeductCredit();

      const reply = await mentorChatAI({
        mentor: mentor || { id: 'lewis', name: 'C.S. Lewis' },
        history: newHistory,
        config
      });

      setSubtitle(reply);
      setChatHistory([...newHistory, { role: 'assistant', content: reply }]);

      audioService.speak(reply, {
        onProgress: () => setIsSpeaking(true),
        onEnd: () => {
          setIsSpeaking(false);
          setLiveTranscript('');
          startMicListening();
        }
      });

    } catch (err) {
      const errReply = "Desculpe, tive um problema ao conectar com a IA. Tente novamente.";
      setSubtitle(errReply);
      audioService.speak(errReply, { onEnd: () => startMicListening() });
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      startMicListening();
    } else {
      setIsMuted(true);
      audioService.stopListening();
      setIsListening(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] bg-slate-950/98 backdrop-blur-3xl flex flex-col items-center justify-between p-6 sm:p-10 select-none">
        {/* Top Header */}
        <div className="w-full max-w-lg flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mentor?.avatarBg || 'from-purple-600 to-cyan-600'} flex items-center justify-center font-black text-white text-lg shadow-lg`}>
              {mentor?.name?.charAt(0) || 'L'}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">{mentor?.name || 'C.S. Lewis'}</h3>
              <p className="text-xs text-cyan-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" /> Chamada de Voz Conectada
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <VisualizerWave isPlaying={isSpeaking} isListening={isListening} barCount={6} />
          </div>
        </div>

        {/* Center Pulsing Neon Voice Sphere (Orbe Neon) */}
        <div className="my-auto flex flex-col items-center justify-center relative">
          {/* Ambient Glow Aura */}
          <motion.div
            animate={
              isSpeaking
                ? { scale: [1, 1.3, 1.1, 1.4, 1], opacity: [0.4, 0.8, 0.5, 0.9, 0.4] }
                : isListening
                ? { scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }
                : { scale: 1, opacity: 0.2 }
            }
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-[70px] absolute pointer-events-none ${
              isSpeaking ? 'bg-purple-500' : isListening ? 'bg-cyan-400' : 'bg-slate-800'
            }`}
          />

          {/* Core Sphere */}
          <motion.div
            animate={
              isSpeaking
                ? { scale: [1, 1.08, 0.96, 1.05, 1] }
                : isListening
                ? { scale: [1, 1.04, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-1 shadow-2xl shadow-purple-950/80 flex items-center justify-center relative z-10 border-2 border-white/30"
          >
            <div className="w-full h-full rounded-full bg-slate-950/80 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center space-y-2 border border-white/10">
              {isSpeaking ? (
                <Volume2 className="w-12 h-12 text-purple-400 animate-bounce" />
              ) : isListening ? (
                <Mic className="w-12 h-12 text-cyan-400 animate-pulse" />
              ) : (
                <Sparkles className="w-12 h-12 text-amber-400" />
              )}

              <span className="text-xs font-black uppercase tracking-wider text-slate-300">
                {isSpeaking ? 'Falando...' : isListening ? 'Ouvindo...' : 'Aguardando'}
              </span>
            </div>
          </motion.div>

          {/* Subtitle / Live Transcription Overlay */}
          <div className="mt-8 max-w-lg text-center space-y-2 z-10">
            {liveTranscript && (
              <p className="text-xs font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 rounded-xl px-4 py-2">
                🗣️ "{liveTranscript}"
              </p>
            )}

            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-lg max-h-32 overflow-y-auto">
              <span className="font-extrabold text-purple-400 block mb-1 text-[10px] uppercase">
                {mentor?.name || 'Mentor'}:
              </span>
              {subtitle || 'Toque no microfone para conversar...'}
            </div>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="w-full max-w-xs flex items-center justify-around bg-slate-900/90 border border-white/10 rounded-full p-3 shadow-2xl">
          {/* Mute Mic Button */}
          <button
            onClick={toggleMute}
            className={`p-4 rounded-full border transition-all ${
              isMuted
                ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                : 'bg-slate-950 border-white/10 text-white hover:bg-slate-800'
            }`}
            title={isMuted ? 'Ativar Microfone' : 'Silenciar Microfone'}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6 text-cyan-400" />}
          </button>

          {/* End Call Button */}
          <button
            onClick={onClose}
            className="p-4 rounded-full bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold shadow-lg shadow-rose-950/60 hover:scale-105 active:scale-95 transition-all"
            title="Encerrar Chamada de Voz"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    </AnimatePresence>
  );
}
