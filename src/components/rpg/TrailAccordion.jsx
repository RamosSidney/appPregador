import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trophy, CheckCircle2, Lock, Sparkles, Sword, Flame, Baby, Zap, Crown, Brain, Landmark, Mic } from 'lucide-react';
import ModuleCard from './ModuleCard';

// Map icon names to Lucide components
const ICON_MAP = {
  Baby,
  Zap,
  Crown,
  Brain,
  Landmark,
  Sword,
  Mic,
  Flame,
  Trophy
};

export default function TrailAccordion({
  trail,
  completedModules = [],
  completedBossFights = [],
  isUnlocked = true,
  onOpenModule,
  onOpenQuiz,
  onOpenBossFight
}) {
  const [isOpen, setIsOpen] = useState(false);

  const IconComponent = ICON_MAP[trail.icon] || Trophy;

  // Calculate trail module progress
  const trailModuleIds = trail.modules.map(m => m.id);
  const completedCount = trailModuleIds.filter(id => completedModules.includes(id)).length;
  const totalModules = trail.modules.length;
  const isTrailCompleted = completedCount === totalModules && completedBossFights.includes(trail.id);
  const isBossFightUnlocked = completedCount === totalModules;

  const progressPercent = Math.round((completedCount / totalModules) * 100);

  return (
    <div className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
      isTrailCompleted
        ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
        : isUnlocked
        ? 'bg-[#0F172A]/85 backdrop-blur-xl border-slate-800 hover:border-purple-500/40 shadow-xl'
        : 'bg-slate-950/40 border-slate-900 opacity-60'
    }`}>
      {/* Accordion Header Bar */}
      <div
        onClick={() => isUnlocked && setIsOpen(!isOpen)}
        className={`p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none transition-colors ${
          isOpen ? 'bg-slate-900/60' : 'hover:bg-slate-900/40'
        }`}
      >
        {/* Left Info Group */}
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${trail.color} flex items-center justify-center shadow-lg shrink-0 border border-white/20`}>
            <IconComponent className="w-6 h-6 text-white drop-shadow" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-black uppercase tracking-wider text-cyan-400">
                {trail.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[10px] font-extrabold">
                {trail.badge}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white">{trail.title}</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">{trail.subtitle}</p>
          </div>
        </div>

        {/* Right Progress & Status Group */}
        <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
          {/* Mini Progress Bar */}
          <div className="space-y-1 w-36">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-slate-400">PROGRESSO</span>
              <span className="text-cyan-400">{completedCount}/{totalModules} Módulos</span>
            </div>
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Status Badge */}
          {isTrailCompleted ? (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Concluída
            </span>
          ) : completedCount > 0 ? (
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> Em Progresso
            </span>
          ) : isUnlocked ? (
            <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
              Disponível
            </span>
          ) : (
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-500 border border-slate-800 text-xs font-bold flex items-center gap-1">
              <Lock className="w-4 h-4" /> Bloqueada
            </span>
          )}

          {/* Chevron Collapse Indicator */}
          <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Accordion Content Body */}
      <AnimatePresence>
        {isOpen && isUnlocked && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-slate-800 bg-slate-950/40 p-5 sm:p-6 space-y-4"
          >
            {/* Modules List */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span>Módulos de Aprendizado</span>
              </h4>

              {trail.modules.map((mod, idx) => {
                const isModCompleted = completedModules.includes(mod.id);
                // First module is unlocked by default; subsequent modules unlock when previous is completed
                const isModUnlocked = idx === 0 || completedModules.includes(trail.modules[idx - 1].id);

                return (
                  <ModuleCard
                    key={mod.id}
                    module={mod}
                    isCompleted={isModCompleted}
                    isUnlocked={isModUnlocked}
                    onOpenModule={onOpenModule}
                    onOpenQuiz={onOpenQuiz}
                  />
                );
              })}
            </div>

            {/* Trail Boss Fight Section */}
            <div className="pt-3 border-t border-slate-800/80">
              <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                completedBossFights.includes(trail.id)
                  ? 'bg-emerald-950/30 border-emerald-500/40'
                  : isBossFightUnlocked
                  ? 'bg-gradient-to-r from-amber-950/50 via-purple-950/40 to-slate-900 border-amber-500/50 shadow-lg'
                  : 'bg-slate-950/50 border-slate-900 opacity-60'
              }`}>
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl font-black text-sm flex items-center justify-center shrink-0 border ${
                    completedBossFights.includes(trail.id)
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : isBossFightUnlocked
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                      : 'bg-slate-900 text-slate-600 border-slate-800'
                  }`}>
                    <Trophy className="w-5 h-5" />
                  </div>

                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                      AVALIAÇÃO FINAL DA TRILHA
                    </span>
                    <h5 className="text-sm font-black text-white">Boss Fight: Quiz Geral de Revisão</h5>
                    <p className="text-xs text-slate-400">
                      {completedBossFights.includes(trail.id)
                        ? 'Insígnia Conquistada! Você dominou o conteúdo desta trilha.'
                        : isBossFightUnlocked
                        ? 'Desafio final liberado! Responda ao Quiz Geral para liberar a Insígnia e +100 XP.'
                        : 'Conclua todos os 3 módulos para liberar a Avaliação Geral da Trilha.'}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 w-full sm:w-auto">
                  {completedBossFights.includes(trail.id) ? (
                    <button
                      onClick={() => onOpenBossFight(trail)}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Trophy className="w-3.5 h-3.5" /> Refazer Boss Fight
                    </button>
                  ) : isBossFightUnlocked ? (
                    <button
                      onClick={() => onOpenBossFight(trail)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-900/50 hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Sword className="w-4 h-4" /> Enfrentar Boss Fight (+100 XP)
                    </button>
                  ) : (
                    <span className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900 text-slate-500 border border-slate-800 text-xs font-bold flex items-center justify-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> Bloqueado
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
