import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock, BookOpen, HelpCircle, Eye, Sparkles } from 'lucide-react';

export default function ModuleCard({
  module,
  isCompleted,
  isUnlocked,
  onOpenModule,
  onOpenQuiz
}) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.005 }}
      transition={{ duration: 0.2 }}
      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
        isCompleted
          ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-500/60 shadow-lg shadow-emerald-950/20'
          : isUnlocked
          ? 'bg-slate-900/80 border-slate-800 hover:border-purple-500/50 shadow-lg'
          : 'bg-slate-950/60 border-slate-900/80 hover:border-slate-800 opacity-90'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Module Title & Icon */}
        <div className="flex items-start gap-3.5">
          <div className={`w-10 h-10 rounded-xl font-black text-sm flex items-center justify-center shrink-0 border shadow-md ${
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
              : isUnlocked
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
              : 'bg-slate-900 text-slate-500 border-slate-800'
          }`}>
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : isUnlocked ? (
              <BookOpen className="w-5 h-5 text-purple-300" />
            ) : (
              <Lock className="w-5 h-5 text-slate-500" />
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-black text-white leading-snug">{module.title}</h4>

              {isCompleted ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Concluído
                </span>
              ) : isUnlocked ? (
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[10px] font-black uppercase tracking-wider">
                  Disponível
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-500" /> Bloqueado
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-normal">{module.subtitle}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center flex-wrap">
          {isCompleted ? (
            <div className="flex items-center gap-2 flex-wrap">
              {/* Reler Módulo Action */}
              <button
                onClick={() => onOpenModule(module)}
                className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:border-emerald-500/40"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Reler Módulo</span>
              </button>

              {/* Refazer Quiz Action */}
              <button
                onClick={() => onOpenQuiz(module)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Refazer Quiz</span>
              </button>
            </div>
          ) : isUnlocked ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenModule(module)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-purple-900/50 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Estudar Módulo</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Allow opening reading modal in preview mode even if locked */}
              <button
                onClick={() => onOpenModule(module)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-purple-400" />
                <span>Explorar Lição</span>
              </button>

              <span className="px-3 py-2 rounded-xl bg-slate-950 text-slate-500 border border-slate-900 text-xs font-bold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Quiz Bloqueado</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
