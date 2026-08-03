import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, ShieldCheck, Sword } from 'lucide-react';

const MESSAGES = [
  "Preparando seu ambiente de crescimento...",
  "Fortalecendo conexões e alinhando propósito...",
  "Pronto para impactar a nova geração!"
];

export default function RPGTransitionLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const DURATION_MS = 3000;
    const INTERVAL_MS = 30;
    const totalSteps = DURATION_MS / INTERVAL_MS;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min(100, Math.round((step / totalSteps) * 100));
      setProgress(currentProgress);

      if (currentProgress >= 66) {
        setMessageIndex(2);
      } else if (currentProgress >= 33) {
        setMessageIndex(1);
      } else {
        setMessageIndex(0);
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
      className="fixed inset-0 z-50 bg-[#0B0F19]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 selection:bg-purple-500 overflow-hidden"
    >
      {/* Ambient Pulsing Orbs: Purple #8B5CF6 to Cyan #06B6D4 */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-gradient-to-tr from-purple-600/25 to-cyan-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse-fast" />

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md text-center flex flex-col items-center">
        {/* Animated Central Emblem */}
        <div className="relative mb-8 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="w-28 h-28 rounded-full border border-purple-500/30 border-t-purple-400 border-r-cyan-400 p-2 shadow-[0_0_35px_rgba(139,92,246,0.35)]"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            className="absolute w-20 h-20 rounded-full border border-dashed border-cyan-400/40"
          />

          <div className="absolute w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-purple-900/80 border border-white/20">
            <Trophy className="w-8 h-8 text-amber-300 fill-amber-300 drop-shadow-[0_0_12px_rgba(252,211,77,0.9)] animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sword className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academia RPG de Comunicadores</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Treinamento de <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">Alto Impacto</span>
          </h2>
        </motion.div>

        {/* Dynamic Phrases */}
        <div className="h-16 flex items-center justify-center px-4 mb-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="text-base sm:text-lg font-semibold text-slate-200 text-center tracking-wide flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{MESSAGES[messageIndex]}</span>
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-xs space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 px-1">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              CARREGANDO TRILHAS
            </span>
            <span className="font-bold text-white text-sm">{progress}%</span>
          </div>

          <div className="w-full h-2.5 bg-slate-900/90 rounded-full p-0.5 border border-white/10 overflow-hidden relative shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
