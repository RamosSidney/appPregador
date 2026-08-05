import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Check, Sparkles, Copy, Bookmark, Mic, RefreshCw, Flame, ArrowLeft, Film, Share2
} from 'lucide-react';
import { marked } from 'marked';

export default function SermonGenerator({
  onGenerate,
  onSaveSermon,
  onOpenPulpit,
  onPlayAudio,
  userCredits,
  isGenerating,
  generatedSermon,
  onResultStateChange
}) {
  const [selectedPainVibes, setSelectedPainVibes] = useState(['Ansiedade & Pressão']);
  const [customRef, setCustomRef] = useState('');
  const [customTheme, setCustomTheme] = useState('');

  // 3-Second Loading Animation & Fullscreen Result Page State
  const [isLocal3sLoading, setIsLocal3sLoading] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showFullResultPage, setShowFullResultPage] = useState(false);

  const painOptions = [
    'Ansiedade & Pressão', 'Vício em Telas / Dopamina', 'Crise de Identidade',
    'Solidão no Quarto', 'Falta de Propósito', 'Comparações no Feed'
  ];

  const togglePainChip = (value) => {
    if (selectedPainVibes.includes(value)) {
      setSelectedPainVibes(selectedPainVibes.filter(v => v !== value));
    } else {
      if (selectedPainVibes.length < 2) {
        setSelectedPainVibes([...selectedPainVibes, value]);
      } else {
        setSelectedPainVibes([selectedPainVibes[1], value]);
      }
    }
  };

  // Trigger Generation with 3s Animation
  const handleGenerateClick = () => {
    if (userCredits <= 0) {
      alert("Créditos de Raios zerados!");
      return;
    }

    setIsLocal3sLoading(true);
    setCountdown(3);

    // Call AI service in App.jsx
    onGenerate({
      painVibes: selectedPainVibes,
      popVibes: [], // Item 2 removed as requested
      customRef,
      customTheme
    });
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

  // Open Full-Screen Result when countdown reaches 0 AND generatedSermon is available
  useEffect(() => {
    if (isLocal3sLoading && countdown === 0 && !isGenerating && generatedSermon) {
      setIsLocal3sLoading(false);
      setShowFullResultPage(true);
      if (onResultStateChange) onResultStateChange(true);
    }
  }, [isLocal3sLoading, countdown, isGenerating, generatedSermon, onResultStateChange]);

  // Notify parent when full screen result state changes
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

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copiado! 📋`);
  };

  return (
    <div className="w-full bg-[#0B0E14] text-white min-h-screen border-none m-0 p-0 space-y-6 pb-28">
      {/* Edge-to-Edge Borda Infinita Main Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
        {/* Title Header */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs tracking-widest uppercase mb-1">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>Gerador de Sermões Disruptivos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Engajamento Real para Gen Z & Alpha
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Selecione a dor da juventude para gerar esboços teológicos profundos com ganchos virais para redes e cultos.
          </p>
        </div>

        {/* Section: Dores da Juventude */}
        <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-5 space-y-3 shadow-lg">
          <label className="text-xs font-extrabold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <span>Dores & Temas da Juventude (Escolha até 2)</span>
          </label>
          <div className="flex flex-wrap gap-2 pt-1">
            {painOptions.map((option) => {
              const isSelected = selectedPainVibes.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => togglePainChip(option)}
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-950/60 border border-purple-400/50 scale-[1.02]'
                      : 'bg-slate-950/80 hover:bg-slate-800/80 text-slate-300 border border-white/10'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section: Custom Referência e Tema (Opcional) */}
        <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-5 space-y-4 shadow-lg">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Gancho Pop Customizado (Opcional)</label>
            <input
              type="text"
              value={customRef}
              onChange={(e) => setCustomRef(e.target.value)}
              placeholder="Ex: Homem-Aranha, Valorant, Matrix..."
              className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Tema Central Customizado (Opcional)</label>
            <input
              type="text"
              value={customTheme}
              onChange={(e) => setCustomTheme(e.target.value)}
              placeholder="Ex: Superação, Pureza, Identidade..."
              className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>
        </div>

        {/* CTA Principal de Geração */}
        <button
          type="button"
          disabled={isGenerating || isLocal3sLoading}
          onClick={handleGenerateClick}
          className="w-full py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-cyan-500 hover:from-amber-400 hover:via-purple-500 hover:to-cyan-400 text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-xl shadow-purple-950/60 active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-white/20 group relative overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Zap className={`w-5 h-5 text-amber-400 fill-amber-400 ${isGenerating || isLocal3sLoading ? 'animate-spin' : 'animate-bounce'}`} />
          <span>{isGenerating || isLocal3sLoading ? 'PROCESSANDO INTELIGÊNCIA IA...' : '⚡ GERAR MENSAGEM VIRAL ⚡'}</span>
        </button>

        {/* Button to Re-open Previous Result if available */}
        {generatedSermon && !showFullResultPage && !isLocal3sLoading && (
          <button
            onClick={handleOpenFullResultManually}
            className="w-full py-3 rounded-xl bg-slate-900/80 border border-purple-500/30 text-purple-300 hover:text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Ver Mensagem Viral Gerada Anteriormente</span>
          </button>
        )}
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
              {/* Outer Pulse Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/30 animate-ping" />
              <div className="absolute inset-0 rounded-full border-4 border-t-amber-400 border-r-purple-500 border-b-cyan-400 border-l-transparent animate-spin" />
              <div className="w-20 h-20 rounded-full bg-slate-900 border border-white/20 flex flex-col items-center justify-center shadow-2xl shadow-purple-950/80">
                <span className="text-3xl font-black text-amber-400">{countdown > 0 ? countdown : 1}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">seg</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
              Gerando Mensagem Disruptiva...
            </h3>

            <p className="text-xs sm:text-sm text-purple-300 max-w-sm mx-auto font-medium">
              {countdown === 3 && "⚡ Escaneando dores e buscas da juventude..."}
              {countdown === 2 && "🔥 Alinhando hermenêutica com ganchos virais..."}
              {countdown === 1 && "✨ Finalizando aplicação prática e roteiro Reels..."}
              {countdown === 0 && "🚀 Abrindo mensagem viral em tela cheia..."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 100% Full-Screen Responsive Result Page (Borda Infinita) */}
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
            <div className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-3 shrink-0">
              {/* Back Button with 44px Touch Target */}
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

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSaveSermon(generatedSermon)}
                  className="px-3 py-2 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-extrabold flex items-center gap-1 transition-all"
                  title="Salvar na Biblioteca"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Salvar</span>
                </button>

                <button
                  onClick={() => onPlayAudio({
                    title: generatedSermon.title,
                    subtitle: 'Narração de Esboço',
                    content: generatedSermon.content
                  })}
                  className="px-3 py-2 rounded-xl bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-extrabold flex items-center gap-1 transition-all"
                  title="Ouvir Narração"
                >
                  🎙️ <span className="hidden sm:inline">Ouvir</span>
                </button>

                <button
                  onClick={() => onOpenPulpit(generatedSermon)}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-black shadow-lg hover:brightness-110 transition-all flex items-center gap-1"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Púlpito</span>
                </button>
              </div>
            </div>

            {/* Main Sermon Content Container */}
            <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-10 space-y-6 pb-28">
              {/* Vibe Pills Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-black uppercase tracking-wider">
                    {generatedSermon.vibe || 'Mensagem Viral'}
                  </span>
                  <span className="text-xs text-slate-400">{generatedSermon.createdAt}</span>
                </div>

                <div className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-amber-400" /> +20 XP Conquistados
                </div>
              </div>

              {/* Formatted Markdown Body */}
              <div
                className="prose prose-invert max-w-none text-slate-100 text-sm sm:text-base leading-relaxed space-y-4 font-sans selection:bg-purple-500 selection:text-white"
                dangerouslySetInnerHTML={{ __html: marked.parse(generatedSermon.content || '') }}
              />

              {/* Bottom Quick Copy Action Buttons */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => copyToClipboard(generatedSermon.content, 'Sermão Completo')}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-900 border border-white/15 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Copy className="w-4 h-4 text-purple-400" /> Copiar Texto Completo
                </button>

                <button
                  onClick={() => copyToClipboard(generatedSermon.reelsScript || generatedSermon.content, 'Roteiro Reels')}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-900 border border-white/15 hover:bg-slate-800 text-cyan-300 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Film className="w-4 h-4 text-cyan-400" /> Copiar Roteiro Reels
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
