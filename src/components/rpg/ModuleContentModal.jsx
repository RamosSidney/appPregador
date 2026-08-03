import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  BookOpen,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Copy,
  Check,
  Lock,
  CheckCircle2,
  Zap,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Target,
  Layers,
  Video
} from 'lucide-react';
import { getEnrichedContentForModule } from '../../data/enrichedContent';

export default function ModuleContentModal({
  module,
  trail,
  isUnlocked = true,
  isCompleted = false,
  onClose,
  onStartQuiz
}) {
  const [activeTab, setActiveTab] = useState('teologia'); // 'teologia', 'sermao', 'ganchos', 'roteiro'
  const [copiedItem, setCopiedItem] = useState(null);

  if (!module) return null;

  const enriched = getEnrichedContentForModule(module, trail);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(key);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-xl selection:bg-purple-500 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="w-full max-w-4xl bg-[#0F172A] border border-slate-800 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-purple-950/60 relative my-auto max-h-[92vh] flex flex-col justify-between overflow-hidden"
      >
        {/* Top Glow Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-cyan-400 to-amber-400" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-4 mb-4 shrink-0">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              {isCompleted ? (
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Módulo Concluído
                </span>
              ) : isUnlocked ? (
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-black uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Módulo em Estudo
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5 text-amber-400" /> Modo Exploratório / Ementa (Bloqueada)
                </span>
              )}

              {module.xp && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-extrabold flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-amber-400" /> +{module.xp} XP
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
              {module.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">{module.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white transition-colors shrink-0 cursor-pointer"
            aria-label="Fechar Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Locked Prerequisite Notification Banner */}
        {!isUnlocked && (
          <div className="mb-4 p-3 rounded-2xl bg-slate-900/90 border border-amber-500/40 flex items-center gap-3 text-xs text-amber-300 shrink-0 shadow-md">
            <Lock className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-extrabold block text-amber-200">Você está navegando na Ementa Expandida!</span>
              Você pode ler todo o conteúdo teórico, exemplos de sermão e ganchos práticos. Para responder ao Quiz e ganhar XP, conclua os módulos anteriores.
            </div>
          </div>
        )}

        {/* Completed Module Notification Banner */}
        {isCompleted && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between gap-3 text-xs text-emerald-300 shrink-0 shadow-md">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Você já revisitou este módulo! Todos os exemplos e roteiros continuam disponíveis para consulta ilimitada.</span>
            </div>
          </div>
        )}

        {/* Multi-Tab Navigation Bar */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-slate-800/90 mb-4 overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('teologia')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'teologia'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Teologia & Psicologia</span>
          </button>

          <button
            onClick={() => setActiveTab('sermao')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'sermao'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Ilustração & Esboço</span>
          </button>

          <button
            onClick={() => setActiveTab('ganchos')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'ganchos'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ganchos & Metáforas</span>
          </button>

          <button
            onClick={() => setActiveTab('roteiro')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'roteiro'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Roteiro de Púlpito</span>
          </button>
        </div>

        {/* Scrollable Main Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-5 leading-relaxed text-slate-200 text-xs sm:text-sm">
          {/* TAB 1: TEOLOGIA & PSICOLOGIA */}
          {activeTab === 'teologia' && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 space-y-3 shadow-inner">
                <div className="flex items-center gap-2 text-purple-400 font-extrabold text-xs sm:text-sm uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Contexto Prático, Psicologia Cristã & Base Bíblica</span>
                </div>
                <div
                  className="prose prose-invert max-w-none text-slate-200 text-xs sm:text-sm leading-relaxed space-y-3"
                  dangerouslySetInnerHTML={{ __html: module.contextoPratico }}
                />
              </div>

              <div className="bg-gradient-to-r from-purple-950/50 via-indigo-950/40 to-cyan-950/40 border border-cyan-500/40 rounded-2xl p-5 space-y-3 shadow-lg">
                <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs sm:text-sm uppercase tracking-wider">
                  <Lightbulb className="w-4.5 h-4.5 text-cyan-400 fill-cyan-400/20" />
                  <span>Insight Prático para o Púlpito e Redes Sociais</span>
                </div>
                <div
                  className="prose prose-invert max-w-none text-slate-200 text-xs sm:text-sm leading-relaxed space-y-3"
                  dangerouslySetInnerHTML={{ __html: module.insightAplicacao }}
                />
              </div>
            </div>
          )}

          {/* TAB 2: ILUSTRAÇÃO & ESBOÇO PRÁTICO */}
          {activeTab === 'sermao' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-5 space-y-4 shadow-xl relative">
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs sm:text-sm uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>{enriched.sermonIllustration.title}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(
                      `${enriched.sermonIllustration.title}\n\nHistória:\n${enriched.sermonIllustration.story}\n\nEsboço:\n${enriched.sermonIllustration.outline.join('\n')}`,
                      'sermon'
                    )}
                    className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedItem === 'sermon' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{copiedItem === 'sermon' ? 'Copiado!' : 'Copiar Esboço'}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">História / Ilustração de Púlpito:</h4>
                  <p className="text-slate-200 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 italic leading-relaxed text-xs sm:text-sm">
                    "{enriched.sermonIllustration.story}"
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Esboço Estruturado (3 Tópicos Chave):</h4>
                  <div className="space-y-2">
                    {enriched.sermonIllustration.outline.map((point, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/70 font-semibold text-purple-300 text-xs sm:text-sm">
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GANCHOS & METÁFORAS (GEN Z/ALPHA) */}
          {activeTab === 'ganchos' && (
            <div className="space-y-4">
              {/* Opening Hooks Section */}
              <div className="bg-slate-950/60 border border-cyan-500/30 rounded-2xl p-5 space-y-4 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-xs sm:text-sm font-black uppercase text-cyan-400 tracking-wider flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span>Ganchos de Abertura (Primeiros 5 a 10 Segundos)</span>
                  </h4>
                </div>

                <div className="space-y-3">
                  {enriched.openingHooks.map((hook, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-3 group hover:border-cyan-500/40 transition-colors">
                      <p className="text-slate-100 font-medium text-xs sm:text-sm">{hook}</p>
                      <button
                        onClick={() => handleCopy(hook, `hook-${idx}`)}
                        className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-cyan-400 transition-colors shrink-0 cursor-pointer"
                        title="Copiar Gancho"
                      >
                        {copiedItem === `hook-${idx}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gen Z / Alpha Metaphors */}
              <div className="bg-slate-950/60 border border-purple-500/30 rounded-2xl p-5 space-y-4 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-xs sm:text-sm font-black uppercase text-purple-300 tracking-wider flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-400" />
                    <span>Metáforas da Cultura Digital & Gamificação</span>
                  </h4>
                </div>

                <div className="space-y-3">
                  {enriched.genZMetaphors.map((meta, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-slate-200 text-xs sm:text-sm leading-relaxed">
                      {meta}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ROTEIRO DE PÚLPITO & ABORDAÇÃO */}
          {activeTab === 'roteiro' && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 border border-emerald-500/30 rounded-2xl p-5 space-y-4 shadow-lg">
                <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs sm:text-sm uppercase tracking-wider border-b border-slate-800 pb-3">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Guia de Entrega & Oratória Recomendada</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <span className="text-xs font-black uppercase text-amber-400 block">Tom de Voz e Ritmo:</span>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{enriched.communicationGuide.tone}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <span className="text-xs font-black uppercase text-cyan-400 block">Linguagem Corporal:</span>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{enriched.communicationGuide.bodyLanguage}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/40 space-y-2">
                  <span className="text-xs font-black uppercase text-emerald-400 block flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Apelo Final & Chamada para Ação (Call to Action):
                  </span>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-medium">
                    {enriched.communicationGuide.callToAction}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 mt-4">
          <div className="text-xs font-bold text-slate-400 flex items-center gap-2 self-start sm:self-center">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              {isCompleted
                ? "Módulo já concluído. Você pode refazer o quiz para testar seus conhecimentos."
                : isUnlocked
                ? `Responda ao Quiz para ganhar +${module.xp || 50} XP e +5 Raios`
                : "Conclua as etapas anteriores para desbloquear este Quiz."}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-extrabold transition-colors cursor-pointer"
            >
              Fechar
            </button>

            {isCompleted ? (
              <button
                onClick={onStartQuiz}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/50 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Refazer Quiz</span>
              </button>
            ) : isUnlocked ? (
              <button
                onClick={onStartQuiz}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/50 hover:shadow-purple-700/60 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Iniciar Quiz do Módulo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                disabled
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 text-slate-500 border border-slate-800 font-extrabold text-xs flex items-center justify-center gap-2 cursor-not-allowed"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Quiz Bloqueado</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
