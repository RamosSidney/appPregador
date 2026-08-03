import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock, Sparkles, BookOpen, HelpCircle } from 'lucide-react';

export default function ModuleCard({ module, isCompleted, isUnlocked, onOpenModule, onOpenQuiz }) {
  return (
    <motion.div
      whileHover={isUnlocked ? { scale: 1.01 } : {}}
      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
        isCompleted
          ? 'bg-slate-900/80 border-emerald-500/30 hover:border-emerald-500/50 shadow-md'
          : isUnlocked
          ? 'bg-slate-900/70 border-slate-800 hover:border-purple-500/50 shadow-lg glass-panel-interactive'
          : 'bg-slate-950/40 border-slate-900 opacity-60 cursor-not-allowed'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className={`w-10 h-10 rounded-xl font-black text-sm flex items-center justify-center shrink-0 border ${
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              : isUnlocked
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
              : 'bg-slate-900 text-slate-600 border-slate-800'
          }`}>
            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : isUnlocked ? <BookOpen className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white leading-snug">{module.title}</h4>
            <p className="text-xs text-slate-400 leading-normal">{module.subtitle}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          {isCompleted ? (
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Concluído
              </span>
              <button
                onClick={() => onOpenQuiz(module)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" /> Refazer Quiz
              </button>
            </div>
          ) : isUnlocked ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenModule(module)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-purple-900/50 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Estudar Módulo</span>
              </button>
            </div>
          ) : (
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-500 border border-slate-800 text-xs font-bold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> Bloqueado
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
