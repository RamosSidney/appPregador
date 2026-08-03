import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Sparkles, Cpu } from 'lucide-react';

const MESSAGES = [
  "Ajustando ambiente para o seu crescimento...",
  "Fortalecendo conexões de alto impacto...",
  "Ativando o seu propósito para a nova geração."
];

export default function TransitionLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const DURATION_MS = 3000;
    const INTERVAL_MS = 30;
    const totalSteps = DURATION_MS / INTERVAL_MS;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min(100, Math.round((step / totalSteps) * 100));
      setProgress(currentProgress);

      // Rotate messages based on progress
      if (currentProgress >= 66) {
        setCurrentMessageIndex(2);
      } else if (currentProgress >= 33) {
        setCurrentMessageIndex(1);
      } else {
        setCurrentMessageIndex(0);
      }

      if (step >= totalSteps) {
        clearInterval(timer);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 200);
      }
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
      className="fixed inset-0 z-50 bg-[#0B0F19] backdrop-blur-3xl flex flex-col items-center justify-center p-6 selection:bg-purple-500 overflow-hidden"
    >
      {/* Dynamic Background Cyber Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse-fast" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg text-center flex flex-col items-center">
        {/* Animated Central Icon with Rings */}
        <div className="relative mb-10 flex items-center justify-center">
          {/* Outer Pulsing Cyber Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full border border-purple-500/30 border-t-purple-400 border-r-cyan-400 p-2 shadow-[0_0_40px_rgba(139,92,246,0.3)]"
          />

          {/* Counter-rotating Inner Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute w-24 h-24 rounded-full border border-dashed border-cyan-400/40 border-b-cyan-300"
          />

          {/* Central Logo Box */}
          <div className="absolute w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-purple-900/80 border border-white/20">
            <Zap className="w-9 h-9 text-amber-300 fill-amber-300 drop-shadow-[0_0_15px_rgba(252,211,77,0.9)] animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>Iniciando Ecossistema v2.0</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            appPregador <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">2.0</span>
          </h2>
        </motion.div>

        {/* Dynamic Inspirational Phrase */}
        <div className="h-16 flex items-center justify-center px-4 mb-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
              transition={{ duration: 0.35 }}
              className="text-base sm:text-lg font-medium text-slate-200 text-center tracking-wide flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{MESSAGES[currentMessageIndex]}</span>
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Tech Progress Bar Container */}
        <div className="w-full max-w-xs space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 px-1">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              CONEXÃO SEGURA
            </span>
            <span className="font-bold text-white text-sm">{progress}%</span>
          </div>

          <div className="w-full h-2.5 bg-slate-900/90 rounded-full p-0.5 border border-white/10 overflow-hidden relative shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
