import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
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
  Target
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="fixed inset-0 w-full h-full z-[100] bg-[#0B0E14] text-slate-100 overflow-y-auto m-0 p-0 rounded-none border-none selection:bg-purple-500 flex flex-col"
    >
      {/* 1. TOP BAR FIXO DE RETORNO (Min 44px Touch Target) */}
      <header className="sticky top-0 z-30 w-full bg-[#0B0E14]/95 backdrop-blur-xl border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-3 shrink-0">
        {/* Left: Prominent Back Button (44px min touch target) */}
        <button
          onClick={onClose}
          className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-purple-500/50 text-slate-200 font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm group shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-purple-400 group-hover:-translate-x-1 transition-transform" />
          <span>← Voltar</span>
        </button>

        {/* Center: Compact Module Title & Badge */}
        <div className="flex items-center gap-2 max-w-md truncate justify-center text-center">
          <h3 className="text-xs sm:text-sm font-black text-white truncate">{module.title}</h3>
          {module.xp && (
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-extrabold text-[10px] items-center gap-1 shrink-0">
              <Zap className="w-3 h-3 fill-amber-400" /> +{module.xp} XP
            </span>
          )}
        </div>

        {/* Right: Status Pill & Close Button */}
        <div className="flex items-center gap-2 shrink-0">
          {isCompleted ? (
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" /> Concluído
            </span>
          ) : isUnlocked ? (
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-black uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Em Estudo
            </span>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5 text-amber-400" /> Modo Exploratório
            </span>
          )}

          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Fechar Lição"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 2. ÁREA DE LEITURA FLUIDA E BORDA INFINITA (max-w-4xl) */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 space-y-6 pb-28">
        {/* Status Notification Banners */}
        {!isUnlocked && (
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/40 flex items-center gap-3 text-xs sm:text-sm text-amber-300 shadow-md">
            <Lock className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <strong className="text-amber-200 block">Modo Exploratório / Ementa Completa</strong>
              Você pode ler todo o material teórico e prático desta lição. Para responder ao Quiz e ganhar XP, conclua os módulos pré-requisito anteriores.
            </div>
          </div>
        )}

        {isCompleted && (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-3 text-xs sm:text-sm text-emerald-300 shadow-md">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Módulo Concluído! Todo o conteúdo técnico, esboços e ganchos permanecem liberados para releitura.</span>
          </div>
        )}

        {/* Lesson Header Title */}
        <div className="space-y-2 border-b border-slate-800/80 pb-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 block">
            {trail?.title || 'Trilha de Aprendizado'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {module.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{module.subtitle}</p>
        </div>

        {/* 3. ABAS DESLIZANTES HORIZONTAIS (SLIDING TABS CONTAINER) */}
        <div className="w-full flex items-center gap-2 overflow-x-auto scrollbar-none no-scrollbar pb-2 whitespace-nowrap border-b border-slate-800/80 shrink-0">
          <button
            onClick={() => setActiveTab('teologia')}
            className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'teologia'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Teologia & Psicologia</span>
          </button>

          <button
            onClick={() => setActiveTab('sermao')}
            className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'sermao'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Ilustração & Esboço</span>
          </button>

          <button
            onClick={() => setActiveTab('ganchos')}
            className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'ganchos'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800'
            }`}
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Ganchos & Metáforas</span>
          </button>

          <button
            onClick={() => setActiveTab('roteiro')}
            className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'roteiro'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Roteiro de Púlpito</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="space-y-6 leading-relaxed">
          {/* TAB 1: TEOLOGIA & PSICOLOGIA */}
          {activeTab === 'teologia' && (
            <div className="space-y-5">
              <div className="w-full bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-purple-400 font-extrabold text-xs sm:text-sm uppercase tracking-wider border-b border-slate-800/80 pb-3">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Contexto Prático, Psicologia Cristã & Base Bíblica</span>
                </div>
                <div
                  className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: module.contextoPratico }}
                />
              </div>

              <div className="w-full bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-cyan-950/40 border border-cyan-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs sm:text-sm uppercase tracking-wider border-b border-slate-800/80 pb-3">
                  <Lightbulb className="w-4.5 h-4.5 text-cyan-400 fill-cyan-400/20" />
                  <span>Insight Prático para o Púlpito e Redes Sociais</span>
                </div>
                <div
                  className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: module.insightAplicacao }}
                />
              </div>
            </div>
          )}

          {/* TAB 2: ILUSTRAÇÃO & ESBOÇO PRÁTICO */}
          {activeTab === 'sermao' && (
            <div className="space-y-5">
              <div className="w-full bg-slate-900/80 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xl">
                <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-amber-400 font-black text-xs sm:text-sm uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>{enriched.sermonIllustration.title}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(
                      `${enriched.sermonIllustration.title}\n\nHistória:\n${enriched.sermonIllustration.story}\n\nEsboço:\n${enriched.sermonIllustration.outline.join('\n')}`,
                      'sermon'
                    )}
                    className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedItem === 'sermon' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                    <span>{copiedItem === 'sermon' ? 'Copiado!' : 'Copiar Esboço'}</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">História / Ilustração de Púlpito:</h4>
                  <p className="text-slate-200 bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800/80 italic leading-relaxed text-sm sm:text-base">
                    "{enriched.sermonIllustration.story}"
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Esboço Estruturado (3 Tópicos Chave):</h4>
                  <div className="space-y-2">
                    {enriched.sermonIllustration.outline.map((point, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 font-bold text-purple-300 text-sm sm:text-base">
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
            <div className="space-y-5">
              <div className="w-full bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
                <h4 className="text-xs sm:text-sm font-black uppercase text-cyan-400 tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Ganchos de Abertura (Primeiros 5 a 10 Segundos)</span>
                </h4>

                <div className="space-y-3">
                  {enriched.openingHooks.map((hook, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-3 hover:border-cyan-500/40 transition-colors">
                      <p className="text-slate-100 font-medium text-sm sm:text-base">{hook}</p>
                      <button
                        onClick={() => handleCopy(hook, `hook-${idx}`)}
                        className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-cyan-400 transition-colors shrink-0 cursor-pointer"
                        title="Copiar Gancho"
                      >
                        {copiedItem === `hook-${idx}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full bg-slate-900/80 border border-purple-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
                <h4 className="text-xs sm:text-sm font-black uppercase text-purple-300 tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span>Metáforas da Cultura Digital & Gamificação</span>
                </h4>

                <div className="space-y-3">
                  {enriched.genZMetaphors.map((meta, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-slate-200 text-sm sm:text-base leading-relaxed">
                      {meta}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ROTEIRO DE PÚLPITO & ABORDAÇÃO */}
          {activeTab === 'roteiro' && (
            <div className="space-y-5">
              <div className="w-full bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
                <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs sm:text-sm uppercase tracking-wider border-b border-slate-800 pb-3">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Guia de Entrega & Oratória Recomendada</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                    <span className="text-xs font-black uppercase text-amber-400 block">Tom de Voz e Ritmo:</span>
                    <p className="text-slate-300 text-sm leading-relaxed">{enriched.communicationGuide.tone}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                    <span className="text-xs font-black uppercase text-cyan-400 block">Linguagem Corporal:</span>
                    <p className="text-slate-300 text-sm leading-relaxed">{enriched.communicationGuide.bodyLanguage}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-950 border border-emerald-500/40 space-y-2">
                  <span className="text-xs font-black uppercase text-emerald-400 block flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Apelo Final & Chamada para Ação (Call to Action):
                  </span>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-semibold">
                    {enriched.communicationGuide.callToAction}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 4. FOOTER ACTIONS STICKY BAR */}
      <footer className="sticky bottom-0 z-30 w-full bg-[#0B0E14]/95 backdrop-blur-xl border-t border-slate-800 px-4 py-3 flex items-center justify-between gap-3 shrink-0">
        <div className="max-w-4xl w-full mx-auto flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-extrabold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4 text-purple-400" />
            <span>Voltar</span>
          </button>

          <div className="flex items-center gap-2">
            {isCompleted ? (
              <button
                onClick={onStartQuiz}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-950/50 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Refazer Quiz</span>
              </button>
            ) : isUnlocked ? (
              <button
                onClick={onStartQuiz}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-purple-900/50 hover:shadow-purple-700/60 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Iniciar Quiz do Módulo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                disabled
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-900 text-slate-500 border border-slate-800 font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-not-allowed"
              >
                <Lock className="w-4 h-4" />
                <span>Quiz Bloqueado</span>
              </button>
            )}
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
