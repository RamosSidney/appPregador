import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Trophy, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

export default function AcademyHeader({ userLevel, userXp, completedModulesCount, totalModulesCount = 24, badgesCount = 0 }) {
  const maxXp = 500;
  const xpPercent = Math.min(100, Math.max(0, (userXp / maxXp) * 100));
  const overallPercent = Math.round((completedModulesCount / totalModulesCount) * 100);

  return (
    <div className="bg-gradient-to-r from-[#0F172A] via-slate-900 to-[#0F172A] border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-purple-950/40 relative overflow-hidden">
      {/* Subtle Background Glow Orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        {/* Left Info Group */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 fill-current" />
              LÍDER NÍVEL {userLevel}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-extrabold text-xs flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              +5 Raios bônus por Módulo
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-extrabold text-xs flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {badgesCount} Insígnias Conquistadas
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            Academia RPG de <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">Comunicadores</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Ambiente de alta performance para treinamento, aprendizado modular e retenção de conhecimento com Quizzes e Boss Fights.
          </p>
        </div>

        {/* Right Progress Stats Card */}
        <div className="w-full lg:w-80 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-3 shadow-inner shrink-0">
          <div className="flex items-center justify-between text-xs font-black">
            <span className="text-purple-400 flex items-center gap-1">
              <Award className="w-4 h-4" /> PROGRESSO XP
            </span>
            <span className="text-amber-400 font-mono">{userXp} / {maxXp} XP</span>
          </div>

          {/* Relucent XP Bar */}
          <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-amber-400 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.8)]"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>

          {/* Overall Completion Indicator */}
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 pt-1 border-t border-slate-800/60">
            <span className="flex items-center gap-1.5 text-slate-300">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              {completedModulesCount} / {totalModulesCount} Módulos
            </span>
            <span className="text-cyan-400 font-extrabold">{overallPercent}% Geral</span>
          </div>
        </div>
      </div>
    </div>
  );
}
