import React from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, Sparkles, HelpCircle, ArrowRight, Lightbulb } from 'lucide-react';

export default function ModuleContentModal({ module, onClose, onStartQuiz }) {
  if (!module) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl selection:bg-purple-500 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="w-full max-w-3xl bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/60 relative my-6 max-h-[90vh] flex flex-col justify-between"
      >
        {/* Top Glow Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-4 mb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-extrabold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Módulo Informativo de Aprendizado</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">{module.title}</h2>
            <p className="text-slate-400 text-xs sm:text-sm">{module.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reading Body */}
        <div className="space-y-6 overflow-y-auto pr-2 mb-6 leading-relaxed">
          {/* Contexto Prático Section */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 space-y-3 shadow-inner">
            <div className="flex items-center gap-2 text-purple-400 font-extrabold text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Contexto Prático, Psicologia Cristã & Base Bíblica</span>
            </div>
            <div
              className="prose prose-invert max-w-none text-slate-200 text-xs sm:text-sm leading-relaxed space-y-3"
              dangerouslySetInnerHTML={{ __html: module.contextoPratico }}
            />
          </div>

          {/* Highlight Section: Insight Prático para o Púlpito e Redes */}
          <div className="bg-gradient-to-r from-purple-950/50 via-indigo-950/40 to-cyan-950/40 border border-cyan-500/40 rounded-2xl p-5 space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-sm uppercase tracking-wider">
              <Lightbulb className="w-4.5 h-4.5 text-cyan-400 fill-cyan-400/20" />
              <span>Insight Prático para o Púlpito e Redes Sociais</span>
            </div>
            <div
              className="prose prose-invert max-w-none text-slate-200 text-xs sm:text-sm leading-relaxed space-y-3"
              dangerouslySetInnerHTML={{ __html: module.insightAplicacao }}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-bold text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Responda ao Quiz para ganhar +{module.xp} XP e +5 Raios</span>
          </div>

          <button
            onClick={onStartQuiz}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-purple-900/50 hover:shadow-purple-700/60 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Iniciar Quiz do Módulo (10 Perguntas)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
