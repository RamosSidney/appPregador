import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Trophy, ShieldCheck, BookOpen } from 'lucide-react';

export default function AcademyHeader({
  userLevel,
  userXp,
  completedModulesCount,
  totalModulesCount = 24,
  badgesCount = 0
}) {
  const maxXp = 500;
  const xpPercent = Math.min(100, Math.max(0, (userXp / maxXp) * 100));

  return (
    <div className="w-full bg-[#0B0E14] border-b border-slate-800/80 px-4 py-3 sm:px-6 sm:py-4 relative overflow-hidden shrink-0">
      {/* Subtle Background Glow Orbs */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 relative z-10">
        {/* Left Info Group & Inline Status Row */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Trophy className="w-3 h-3 fill-current" />
              NÍVEL {userLevel}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-extrabold text-[11px] flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
              +5 Raios bônus
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-extrabold text-[11px] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              {badgesCount} Insígnias
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-extrabold text-[11px] flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-emerald-400" />
              {completedModulesCount}/{totalModulesCount} Módulos
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
            Academia RPG de <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">Comunicadores</span>
          </h1>
        </div>

        {/* Slim 7px Integrated XP Bar */}
        <div className="w-full md:w-72 space-y-1 shrink-0">
          <div className="flex items-center justify-between text-[11px] font-extrabold">
            <span className="text-purple-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-purple-400" /> PROGRESSO XP
            </span>
            <span className="text-amber-400 font-mono">{userXp} / {maxXp} XP</span>
          </div>
          <div className="h-[7px] w-full bg-slate-900 rounded-full overflow-hidden p-0 border border-slate-800 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-amber-400 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
