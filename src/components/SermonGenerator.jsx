import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Check,
  Sparkles,
  Copy,
  Bookmark,
  Mic,
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  Share2,
  RefreshCw
} from 'lucide-react';
import { marked } from 'marked';
import { sanitizeHtml } from '../services/securityService.js';
import { generateWeeklyDevotionalAI, generateSeriesCurriculumAI } from '../services/aiService.js';

export default function SermonGenerator({
  onGenerate,
  onSaveSermon,
  onOpenPulpit,
  onPlayAudio,
  userCredits,
  onDeductCredit,
  config,
  isGenerating,
  generatedSermon,
  onResultStateChange
}) {
  const [studyFormat, setStudyFormat] = useState('Pregação Expositiva');
  const [selectedPainVibes, setSelectedPainVibes] = useState(['Identidade em Cristo']);
  const [customTheme, setCustomTheme] = useState('');

  // 3-Second Loading Animation & Fullscreen Result Page State
  const [isLocal3sLoading, setIsLocal3sLoading] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showFullResultPage, setShowFullResultPage] = useState(false);

  // Proposta 2: Active Tab inside Result ('estudo' | 'devocional' | 'serie')
  const [resultTab, setResultTab] = useState('estudo');
  const [weeklyDevotionalContent, setWeeklyDevotionalContent] = useState('');
  const [seriesCurriculumContent, setSeriesCurriculumContent] = useState('');
  const [isExpandingAI, setIsExpandingAI] = useState(false);

  // Reset expansion tabs whenever a new sermon is generated
  useEffect(() => {
    setResultTab('estudo');
    setWeeklyDevotionalContent('');
    setSeriesCurriculumContent('');
  }, [generatedSermon?.id]);

  const studyFormats = [
    { id: 'Pregação Expositiva', label: 'Pregação Expositiva', icon: BookOpen },
    { id: 'Estudo & Ensino Bíblico', label: 'Aula / Estudo Bíblico', icon: GraduationCap },
    { id: 'Série de 4 Semanas (Currículo)', label: 'Série de 4 Semanas', icon: Calendar },
    { id: 'Pequeno Grupo / Célula', label: 'Estudo para Célula', icon: Users }
  ];

  const painOptions = [
    'Identidade em Cristo',
    'Ansiedade & Paz Interior',
    'Propósito & Vocação',
    'Fé em Tempos de Dúvida',
    'Santidade & Foco',
    'Perdão & Recomeço',
    'Comunhão & Família',
    'Esperança nas Provações'
  ];

  const togglePainChip = (value) => {
    if (selectedPainVibes.includes(value)) {
      if (selectedPainVibes.length > 1) {
        setSelectedPainVibes(selectedPainVibes.filter(v => v !== value));
      }
    } else {
      if (selectedPainVibes.length < 2) {
        setSelectedPainVibes([...selectedPainVibes, value]);
      } else {
        setSelectedPainVibes([selectedPainVibes[1], value]);
      }
    }
  };

  // Trigger Generation with 3s Animation
  const handleGenerateClick = async () => {
    if (userCredits <= 0) {
      alert("Créditos de Raios zerados!");
      return;
    }

    setIsLocal3sLoading(true);
    setCountdown(3);

    const combinedTheme = customTheme.trim()
      ? `${studyFormat}: ${customTheme.trim()}`
      : `${studyFormat} — ${selectedPainVibes.join(' & ')}`;

    const minDelayPromise = new Promise((resolve) => setTimeout(resolve, 3000));
    const genPromise = Promise.resolve(
      onGenerate({
        painVibes: selectedPainVibes,
        popVibes: [studyFormat],
        customRef: '',
        customTheme: combinedTheme
      })
    );

    const [, success] = await Promise.all([minDelayPromise, genPromise]);
    setIsLocal3sLoading(false);

    if (success !== false) {
      setShowFullResultPage(true);
      if (onResultStateChange) onResultStateChange(true);
    }
  };

  // Handle 3s Countdown Timer Sync with AI Response
  useEffect(() => {
    let timer;
    if (isLocal3sLoading) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setCountdown(3);
    }
    return () => clearInterval(timer);
  }, [isLocal3sLoading]);

  // Safety fallback: ensure modal closes if generation finishes
  useEffect(() => {
    if (isLocal3sLoading && countdown === 0 && !isGenerating) {
      setIsLocal3sLoading(false);
      if (generatedSermon) {
        setShowFullResultPage(true);
        if (onResultStateChange) onResultStateChange(true);
      }
    }
  }, [isLocal3sLoading, countdown, isGenerating, generatedSermon, onResultStateChange]);

  const handleCloseFullResult = () => {
    setShowFullResultPage(false);
    if (onResultStateChange) onResultStateChange(false);
  };

  const handleOpenFullResultManually = () => {
    if (generatedSermon) {
      setShowFullResultPage(true);
      if (onResultStateChange) onResultStateChange(true);
    }
  };

  // Proposta 2A: Generate 5-Day Devotional Kit (Mon-Fri)
  const handleSelectDevotionalTab = async () => {
    setResultTab('devocional');
    if (weeklyDevotionalContent || isExpandingAI || !generatedSermon) return;

    setIsExpandingAI(true);
    try {
      const content = await generateWeeklyDevotionalAI({
        studyTitle: generatedSermon.title,
        studyContent: generatedSermon.content,
        config
      });
      if (onDeductCredit) await onDeductCredit();
      setWeeklyDevotionalContent(content);
    } catch (err) {
      alert(err.message || 'Erro ao gerar Kit Devocional da Semana.');
      setResultTab('estudo');
    } finally {
      setIsExpandingAI(false);
    }
  };

  // Proposta 2B: Generate 4-Week Teaching Series Plan
  const handleSelectSeriesTab = async () => {
    setResultTab('serie');
    if (seriesCurriculumContent || isExpandingAI || !generatedSermon) return;

    setIsExpandingAI(true);
    try {
      const content = await generateSeriesCurriculumAI({
        studyTitle: generatedSermon.title,
        studyContent: generatedSermon.content,
        config
      });
      if (onDeductCredit) await onDeductCredit();
      setSeriesCurriculumContent(content);
    } catch (err) {
      alert(err.message || 'Erro ao gerar Planejamento de Série de 4 Semanas.');
      setResultTab('estudo');
    } finally {
      setIsExpandingAI(false);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copiado! 📋`);
  };

  const activeDisplayedContent =
    resultTab === 'devocional'
      ? weeklyDevotionalContent
      : resultTab === 'serie'
      ? seriesCurriculumContent
      : generatedSermon?.content || '';

  return (
    <div className="w-full bg-[#0B0E14] text-white min-h-screen border-none m-0 p-0 pb-40">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 pt-3 sm:pt-5 space-y-4">
        {/* Step 1: Modalidade de Ensino / Estudo */}
        <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-2.5 shadow-lg">
          <label className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 block">
            1. Modalidade do Estudo ou Mensagem
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {studyFormats.map((fmt) => {
              const Icon = fmt.icon;
              const active = studyFormat === fmt.id;
              return (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setStudyFormat(fmt.id)}
                  className={`min-h-[46px] p-2.5 rounded-xl text-left flex items-center gap-2 text-xs font-extrabold transition-all cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border border-purple-400/50 shadow-md'
                      : 'bg-slate-950/80 hover:bg-slate-800/80 text-slate-300 border border-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-amber-300' : 'text-cyan-400'}`} />
                  <span className="leading-tight">{fmt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Eixo Temático / Necessidade Espiritual */}
        <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-2.5 shadow-lg">
          <label className="text-xs font-extrabold uppercase tracking-wider text-purple-400 block">
            2. Eixo Temático & Necessidade Espiritual (Escolha até 2)
          </label>
          <div className="flex flex-wrap gap-2">
            {painOptions.map((option) => {
              const isSelected = selectedPainVibes.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => togglePainChip(option)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md border border-purple-400/50'
                      : 'bg-slate-950/80 hover:bg-slate-800/80 text-slate-300 border border-white/10'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-300 shrink-0" />}
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Passagem Bíblica ou Tema Específico */}
        <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-2 shadow-lg">
          <label className="text-xs font-extrabold uppercase tracking-wider text-amber-400 block">
            3. Passagem Bíblica ou Tema Específico (Opcional)
          </label>
          <input
            type="text"
            value={customTheme}
            onChange={(e) => setCustomTheme(e.target.value)}
            placeholder="Ex: Romanos 8:28, O Bom Samaritano, Fruto do Espírito, Carta aos Efésios..."
            className="w-full min-h-[46px] bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
          />
        </div>

        {/* Primary Action Button (Well above the Bottom Nav) */}
        <div className="pt-1 space-y-2.5">
          <button
            type="button"
            disabled={isGenerating || isLocal3sLoading}
            onClick={handleGenerateClick}
            className="w-full min-h-[54px] py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-xl shadow-purple-950/60 active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-white/20 cursor-pointer"
          >
            <Zap className={`w-5 h-5 text-amber-300 fill-amber-300 ${isGenerating || isLocal3sLoading ? 'animate-spin' : ''}`} />
            <span>
              {isGenerating || isLocal3sLoading
                ? 'PREPARANDO ESTUDO & EXEGESE...'
                : '⚡ GERAR ESTUDO & ESBOÇO COMPLETO'}
            </span>
          </button>

          {generatedSermon && !showFullResultPage && !isLocal3sLoading && (
            <button
              type="button"
              onClick={handleOpenFullResultManually}
              className="w-full min-h-[44px] py-2.5 rounded-xl bg-slate-900/90 border border-purple-500/30 text-purple-300 hover:text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Abrir Último Estudo Gerado ({generatedSermon.title})</span>
            </button>
          )}
        </div>
      </div>

      {/* 3-Second Loading Animation Modal */}
      <AnimatePresence>
        {isLocal3sLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-[#0B0E14] w-screen h-screen min-h-screen flex flex-col items-center justify-center p-6 text-center m-0 border-none overflow-hidden"
          >
            <div className="relative w-28 h-28 flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/30 animate-ping" />
              <div className="absolute inset-0 rounded-full border-4 border-t-amber-400 border-r-purple-500 border-b-cyan-400 border-l-transparent animate-spin" />
              <div className="w-20 h-20 rounded-full bg-slate-900 border border-white/20 flex flex-col items-center justify-center shadow-2xl shadow-purple-950/80">
                <span className="text-3xl font-black text-amber-400">{countdown > 0 ? countdown : 1}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">seg</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
              Elaborando Estudo & Esboço Teológico...
            </h3>

            <p className="text-xs sm:text-sm text-purple-300 max-w-sm mx-auto font-medium">
              {countdown === 3 && "📖 Examinando contexto bíblico e referências cruzadas..."}
              {countdown === 2 && "🎓 Estruturando tópicos de ensino e exegese prática..."}
              {countdown === 1 && "✨ Finalizando aplicações pastorais e perguntas de mentoria..."}
              {countdown === 0 && "🚀 Abrindo estudo completo em tela cheia..."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Study Result Page with Weekly Devotional & 4-Week Series Tabs */}
      <AnimatePresence>
        {showFullResultPage && generatedSermon && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#0B0E14] w-full h-full overflow-y-auto flex flex-col m-0 p-0 border-none"
          >
            {/* Sticky Top Navigation Bar */}
            <div className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-8 py-3 flex items-center justify-between gap-2 shrink-0">
              <button
                onClick={handleCloseFullResult}
                className="min-w-[44px] min-h-[44px] px-3 rounded-xl bg-slate-950/80 border border-white/15 text-cyan-400 hover:text-white hover:border-cyan-400 text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 truncate">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <h3 className="text-sm font-extrabold text-white truncate">{generatedSermon.title}</h3>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => onSaveSermon(generatedSermon)}
                  className="px-3 py-2 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-extrabold flex items-center gap-1 transition-all cursor-pointer"
                  title="Salvar na Biblioteca"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Salvar</span>
                </button>

                <button
                  onClick={() => onPlayAudio({
                    title: generatedSermon.title,
                    subtitle: 'Narração de Estudo',
                    content: activeDisplayedContent
                  })}
                  className="px-3 py-2 rounded-xl bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-extrabold flex items-center gap-1 transition-all cursor-pointer"
                  title="Ouvir Narração"
                >
                  🎙️ <span className="hidden sm:inline">Ouvir</span>
                </button>

                <button
                  onClick={() => onOpenPulpit({ ...generatedSermon, content: activeDisplayedContent })}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-black shadow-lg hover:brightness-110 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Púlpito</span>
                </button>
              </div>
            </div>

            {/* Main Study Content Container */}
            <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-5 sm:py-8 space-y-5 pb-32">
              {/* Proposta 2: Multi-Tool Curriculum & Weekly Devotional Switcher Bar */}
              <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-2 flex flex-wrap sm:flex-nowrap items-center gap-1.5 shadow-lg">
                <button
                  type="button"
                  onClick={() => setResultTab('estudo')}
                  className={`flex-1 min-h-[42px] px-3 py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    resultTab === 'estudo'
                      ? 'bg-purple-600 text-white shadow'
                      : 'bg-slate-950/80 text-slate-300 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span>📖 Estudo Base</span>
                </button>

                <button
                  type="button"
                  onClick={handleSelectDevotionalTab}
                  className={`flex-1 min-h-[42px] px-3 py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    resultTab === 'devocional'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow'
                      : 'bg-slate-950/80 text-emerald-300 hover:text-white border border-emerald-500/20'
                  }`}
                >
                  <Share2 className="w-3.5 h-3.5 shrink-0" />
                  <span>📲 Kit Devocional (Seg–Sex)</span>
                </button>

                <button
                  type="button"
                  onClick={handleSelectSeriesTab}
                  className={`flex-1 min-h-[42px] px-3 py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    resultTab === 'serie'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow'
                      : 'bg-slate-950/80 text-amber-300 hover:text-white border border-amber-500/20'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>📅 Planejar Série (4 Semanas)</span>
                </button>
              </div>

              {/* Loading Indicator when generating Devotional Kit or 4-Week Series */}
              {isExpandingAI ? (
                <div className="rounded-2xl bg-slate-900/90 border border-purple-500/30 p-8 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-purple-400 animate-spin mx-auto" />
                  <h4 className="text-base font-black text-white">
                    {resultTab === 'devocional'
                      ? 'Gerando os 5 Devocionais da Semana (Segunda a Sexta)...'
                      : 'Estruturando o Currículo Completo de 4 Semanas...'}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Organizando leituras bíblicas, perguntas de reflexão e aplicações práticas para seus alunos e igreja.
                  </p>
                </div>
              ) : (
                <>
                  <div
                    className="prose prose-invert max-w-none text-slate-100 text-sm sm:text-base leading-relaxed space-y-4 font-sans selection:bg-purple-500 selection:text-white bg-slate-900/40 border border-white/10 rounded-2xl p-5 sm:p-7"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(marked.parse(activeDisplayedContent)) }}
                  />

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          activeDisplayedContent,
                          resultTab === 'devocional'
                            ? 'Kit Devocional da Semana'
                            : resultTab === 'serie'
                            ? 'Planejamento de Série (4 Semanas)'
                            : 'Estudo Completo'
                        )
                      }
                      className="flex-1 py-3.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                      <span>
                        {resultTab === 'devocional'
                          ? 'Copiar Kit Devocional para WhatsApp da Turma/Igreja'
                          : resultTab === 'serie'
                          ? 'Copiar Planejamento Completo de 4 Semanas'
                          : 'Copiar Estudo Completo'}
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
