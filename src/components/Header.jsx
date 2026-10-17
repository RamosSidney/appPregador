import React from 'react';
import { Zap, Settings, Trophy, Sun, Moon } from 'lucide-react';

export default function Header({
  userCredits,
  userLevel = 1,
  userXp = 0,
  onOpenSettings,
  themeMode = 'dark',
  onToggleTheme
}) {
  const isLight = themeMode === 'light';

  return (
    <header className="sticky top-0 z-40 bg-[#0B0E14]/95 backdrop-blur-xl border-b border-slate-800/80 px-3 py-2 sm:px-6 sm:py-2.5 pt-safe transition-all duration-300">
      {/* Top ambient accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-cyan-400 to-amber-400" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Clean Brand Identity (Uncluttered on Mobile) */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-md border border-white/20 shrink-0">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 fill-amber-300" />
          </div>
          <div className="min-w-0 flex items-baseline gap-1.5">
            <h1 className="text-sm sm:text-lg font-black tracking-tight text-white truncate">
              appPregador
            </h1>
            <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-cyan-400">
              Mentoria & Ensino
            </span>
          </div>
        </div>

        {/* Right: Unified Status Pill + Light/Dark Toggle + Settings */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Unified Level + Credits Pill (Saves space and avoids mobile clutter) */}
          <div
            className="flex items-center gap-2 bg-[#0F172A] border border-slate-800 rounded-xl px-2.5 py-1.5 shadow-sm"
            title={`Nível ${userLevel} (${userXp}/500 XP) • ${userCredits} Raios IA`}
          >
            <span className="flex items-center gap-1 text-[11px] font-extrabold text-purple-300">
              <Trophy className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Nv.{userLevel}</span>
            </span>
            <span className="w-[1px] h-3.5 bg-slate-700/80" />
            <span className="flex items-center gap-1 text-[11px] font-black text-amber-300">
              <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
              <span>{userCredits}</span>
            </span>
          </div>

          {/* Theme Toggle Button (Modo Claro / Escuro) */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isLight ? 'Ativar Modo Escuro' : 'Ativar Modo Claro'}
            title={isLight ? 'Mudar para Modo Escuro' : 'Mudar para Modo Claro'}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0F172A] hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            {isLight ? (
              <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600/20" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Settings Button */}
          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Abrir Configurações e Controle de Dados"
            title="Configurações, API Keys & Dados"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0F172A] hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <Settings className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
