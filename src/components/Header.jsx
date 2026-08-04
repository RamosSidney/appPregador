import React from 'react';
import { Zap } from 'lucide-react';

export default function Header({ userCredits }) {
  const maxCredits = 100;
  const energyPercent = Math.min(100, Math.max(0, (userCredits / maxCredits) * 100));

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 px-4 py-3 transition-all duration-300">
      {/* Top ambient glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-cyan-400 to-amber-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo Group */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-purple-900/40 border border-purple-400/30">
            <Zap className="w-6 h-6 text-amber-400 fill-amber-400 animate-pulse-fast drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              appPregador <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent text-xs sm:text-sm font-black px-1.5 py-0.5 rounded border border-purple-500/30 bg-purple-500/10">2.0</span>
            </h1>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
              Geração Z & Alpha
            </p>
          </div>
        </div>

        {/* Energy Panel (Desktop) */}
        <div className="hidden md:flex items-center gap-4 bg-slate-900/70 border border-white/10 rounded-xl px-4 py-2 shadow-inner">
          <div className="flex flex-col gap-1 w-36">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-amber-400 flex items-center gap-1">
                <Zap className="w-3 h-3 fill-amber-400" /> RAIOS
              </span>
              <span className="text-slate-300">{userCredits} / 100</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-[1px] border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                style={{ width: `${energyPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Quick Raios Badge */}
        <div className="flex md:hidden items-center gap-1.5 bg-slate-900/80 border border-white/10 rounded-lg px-2.5 py-1.5">
          <span className="flex items-center gap-1 text-xs font-bold text-amber-400">
            <Zap className="w-3.5 h-3.5 fill-amber-400" /> {userCredits} RAIOS
          </span>
        </div>
      </div>
    </header>
  );
}
