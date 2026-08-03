import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Trophy,
  CheckCircle2,
  Lock,
  Sparkles,
  Sword,
  Flame,
  Baby,
  Zap,
  Crown,
  Brain,
  Landmark,
  Mic,
  Award,
  Eye
} from 'lucide-react';
import ModuleCard from './ModuleCard';

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
  const isBossFightCompleted = completedBossFights.includes(trail.id);
  const isTrailCompleted = completedCount === totalModules && isBossFightCompleted;
  const isBossFightUnlocked = isUnlocked && completedCount === totalModules;

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isTrailCompleted
          ? 'bg-[#0F172A]/90 border-emerald-500/40 shadow-lg'
          : completedCount > 0
          ? 'bg-[#0F172A]/90 border-amber-500/30 shadow-lg'
          : isUnlocked
          ? 'bg-[#0F172A]/80 border-slate-800/90 hover:border-purple-500/40 shadow-lg'
          : 'bg-slate-950/60 border-slate-900 opacity-90'
      }`}
    >
      {/* Accordion Collapsed Header Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none transition-colors ${
          isOpen ? 'bg-slate-900/80' : 'hover:bg-slate-900/40'
        }`}
      >
        {/* Trail Info */}
        <div className="flex items-center gap-3.5">
          <div
            className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${trail.color} flex items-center justify-center shadow-md shrink-0 border border-white/20`}
          >
            <IconComponent className="w-5 h-5 text-white drop-shadow" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
                {trail.category}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white leading-tight">
              {trail.title}
            </h3>
          </div>
        </div>

        {/* Right Status Pill + Counter + Chevron */}
        <div className="flex items-center justify-between sm:justify-end gap-3.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
          {/* Module Counter */}
          <div className="text-xs font-extrabold text-slate-300">
            <span className="text-cyan-400">{completedCount}/{totalModules}</span> Módulos
          </div>

          {/* Status Badge */}
          {isTrailCompleted ? (
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-black flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Concluída
            </span>
          ) : completedCount > 0 ? (
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-black flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Em Progresso
            </span>
          ) : isUnlocked ? (
            <span className="px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[11px] font-black">
              Disponível
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800 text-[11px] font-black flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-slate-400" /> Bloqueada
            </span>
          )}

          {/* Chevron Collapse Indicator */}
          <div
            className={`p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-white bg-slate-900 border-purple-500/40' : ''
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Expanded Body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-slate-800/80 bg-slate-950/60 p-4 sm:p-5 space-y-5"
          >
            {/* Subtitle & Badge Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800/90">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                {trail.subtitle}
              </p>

              {/* Insígnia Card */}
              <div
                className={`px-3.5 py-2 rounded-xl border flex items-center gap-2 shrink-0 ${
                  isBossFightCompleted
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : 'bg-slate-950/80 text-slate-400 border-slate-800'
                }`}
              >
                <Award
                  className={`w-4 h-4 ${
                    isBossFightCompleted ? 'text-amber-400 fill-amber-400' : 'text-slate-500'
                  }`}
                />
                <span className="text-xs font-black">
                  {trail.badge} {isBossFightCompleted ? '(Conquistada 🏆)' : '(Bloqueada 🔒)'}
                </span>
              </div>
            </div>

            {/* Locked Trail Banner */}
            {!isUnlocked && (
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center gap-3 text-xs text-amber-300">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-amber-200">Trilha em Modo Exploratório:</strong> Você pode visualizar a ementa de módulos e clicar em "Explorar Lição" para ler. Para jogar os Quizzes, conclua as etapas anteriores.
                </span>
              </div>
            )}

            {/* Modules List */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ementa da Trilha ({totalModules} Módulos)</span>
              </h4>

              {trail.modules.map((mod, idx) => {
                const isModCompleted = completedModules.includes(mod.id);
                const isModUnlocked = isUnlocked && (idx === 0 || completedModules.includes(trail.modules[idx - 1].id));

                return (
                  <ModuleCard
                    key={mod.id}
                    module={mod}
                    isCompleted={isModCompleted}
                    isUnlocked={isModUnlocked}
                    onOpenModule={(m) => onOpenModule(m, trail, isModUnlocked)}
                    onOpenQuiz={(m) => onOpenQuiz(m)}
                  />
                );
              })}
            </div>

            {/* Boss Fight Section */}
            <div className="pt-2 border-t border-slate-800/80">
              <div
                className={`p-4 sm:p-5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  isBossFightCompleted
                    ? 'bg-emerald-950/30 border-emerald-500/40'
                    : isBossFightUnlocked
                    ? 'bg-gradient-to-r from-amber-950/50 via-purple-950/40 to-slate-900 border-amber-500/50 shadow-lg'
                    : 'bg-slate-950/50 border-slate-900 opacity-80'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl font-black text-sm flex items-center justify-center shrink-0 border ${
                      isBossFightCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : isBossFightUnlocked
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                        : 'bg-slate-900 text-slate-600 border-slate-800'
                    }`}
                  >
                    <Trophy className="w-5 h-5" />
                  </div>

                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                      AVALIAÇÃO GERAL DA TRILHA
                    </span>
                    <h5 className="text-sm font-black text-white">Boss Fight: Quiz de Revisão</h5>
                    <p className="text-xs text-slate-300">
                      {isBossFightCompleted
                        ? 'Insígnia Conquistada! Você dominou o conteúdo desta trilha.'
                        : isBossFightUnlocked
                        ? 'Desafio final liberado! Responda às perguntas para ganhar a Insígnia e +100 XP.'
                        : 'Conclua os 3 módulos para liberar a Avaliação Geral.'}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 w-full sm:w-auto">
                  {isBossFightCompleted ? (
                    <button
                      onClick={() => onOpenBossFight(trail)}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 hover:text-emerald-300 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
                      <Lock className="w-3.5 h-3.5" /> Bloqueada
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
