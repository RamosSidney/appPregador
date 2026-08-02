import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Check, Sparkles, Copy, Bookmark, Mic, RefreshCw, Flame, Hash, Film } from 'lucide-react';
import { marked } from 'marked';

export default function SermonGenerator({
  onGenerate,
  onSaveSermon,
  onOpenPulpit,
  onPlayAudio,
  userCredits,
  isGenerating,
  generatedSermon
}) {
  const [selectedPainVibes, setSelectedPainVibes] = useState(['Ansiedade & Pressão']);
  const [selectedPopVibes, setSelectedPopVibes] = useState(['TikTok Algorithm']);
  const [customRef, setCustomRef] = useState('');
  const [customTheme, setCustomTheme] = useState('');

  const painOptions = [
    'Ansiedade & Pressão', 'Vício em Telas / Dopamina', 'Crise de Identidade',
    'Solidão no Quarto', 'Falta de Propósito', 'Comparações no Feed'
  ];

  const popOptions = [
    'TikTok Algorithm', 'Anime / Geek', 'Jogos / RPG / FPS',
    'Skins & Filtros', 'Modo Foco / Multitask', 'Trends das Redes'
  ];

  const toggleChip = (value, type) => {
    if (type === 'pain') {
      if (selectedPainVibes.includes(value)) {
        setSelectedPainVibes(selectedPainVibes.filter(v => v !== value));
      } else {
        if (selectedPainVibes.length < 2) {
          setSelectedPainVibes([...selectedPainVibes, value]);
        } else {
          setSelectedPainVibes([selectedPainVibes[1], value]);
        }
      }
    } else {
      if (selectedPopVibes.includes(value)) {
        setSelectedPopVibes(selectedPopVibes.filter(v => v !== value));
      } else {
        if (selectedPopVibes.length < 2) {
          setSelectedPopVibes([...selectedPopVibes, value]);
        } else {
          setSelectedPopVibes([selectedPopVibes[1], value]);
        }
      }
    }
  };

  const handleGenerateClick = () => {
    onGenerate({
      painVibes: selectedPainVibes,
      popVibes: selectedPopVibes,
      customRef,
      customTheme
    });
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copiado! 📋`);
  };

  return (
    <div className="space-y-6 pb-safe-dock">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs tracking-widest uppercase mb-1">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>Gerador de Sermões Disruptivos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Engajamento Real para Gen Z & Alpha
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Selecione a dor da juventude e a linguagem cultural para gerar esboços teológicos profundos com ganchos virais.
          </p>
        </div>
      </div>

      {/* Grid Desktop 2 Colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Coluna 1: Parâmetros (Lado Esquerdo) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Section: Dores da Juventude */}
          <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-5 space-y-3">
            <label className="text-xs font-extrabold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <span>1. Dores da Juventude (Escolha até 2)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {painOptions.map((option) => {
                const isSelected = selectedPainVibes.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleChip(option, 'pain')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-950/60 border border-purple-400/50 scale-[1.02]'
                        : 'bg-slate-950/60 hover:bg-slate-800/80 text-slate-300 border border-white/10'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Universo Pop & Redes */}
          <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-5 space-y-3">
            <label className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <span>2. Universo Pop & Analogias (Escolha até 2)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {popOptions.map((option) => {
                const isSelected = selectedPopVibes.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleChip(option, 'pop')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-950/60 border border-cyan-400/50 scale-[1.02]'
                        : 'bg-slate-950/60 hover:bg-slate-800/80 text-slate-300 border border-white/10'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Referência e Tema */}
          <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Gancho Pop Customizado (Opcional)</label>
              <input
                type="text"
                value={customRef}
                onChange={(e) => setCustomRef(e.target.value)}
                placeholder="Ex: Homem-Aranha, Valorant, Matrix..."
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Tema Central Customizado (Opcional)</label>
              <input
                type="text"
                value={customTheme}
                onChange={(e) => setCustomTheme(e.target.value)}
                placeholder="Ex: Superação, Pureza, Identidade..."
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>
          </div>

          {/* CTA Principal */}
          <button
            type="button"
            disabled={isGenerating}
            onClick={handleGenerateClick}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-cyan-500 hover:from-amber-400 hover:via-purple-500 hover:to-cyan-400 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-purple-950/60 active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-white/20 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Zap className={`w-5 h-5 text-amber-400 fill-amber-400 ${isGenerating ? 'animate-spin' : 'animate-bounce'}`} />
            <span>{isGenerating ? 'PROCESSANDO INTELIGÊNCIA IA...' : 'GERAR MENSAGEM VIRAL ⚡'}</span>
          </button>
        </div>

        {/* Coluna 2: Preview / Sermão Gerado (Lado Direito) */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 min-h-[500px] flex flex-col justify-between shadow-2xl relative">
            {isGenerating ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <RefreshCw className="w-10 h-10 text-purple-400 animate-spin" />
                <div>
                  <h4 className="text-lg font-bold text-white">Criando Esboço Disruptivo...</h4>
                  <p className="text-xs text-slate-400 mt-1">Conectando teologia ortodoxa a ganchos da Geração Z.</p>
                </div>
              </div>
            ) : generatedSermon ? (
              <div className="space-y-6">
                {/* Header do Resultado */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="text-sm font-extrabold text-white">Sermão Prontinho</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSaveSermon(generatedSermon)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-bold transition-all"
                    >
                      <Bookmark className="w-3.5 h-3.5" /> Salvar
                    </button>
                    <button
                      onClick={() => onPlayAudio({
                        title: generatedSermon.title,
                        subtitle: 'Narração de Esboço',
                        content: generatedSermon.content
                      })}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-bold transition-all"
                    >
                      🎙️ Ouvir
                    </button>
                    <button
                      onClick={() => onOpenPulpit(generatedSermon)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold shadow-md hover:brightness-110 transition-all"
                    >
                      <Mic className="w-3.5 h-3.5" /> Modo Púlpito
                    </button>
                  </div>
                </div>

                {/* Conteúdo Markdown */}
                <div
                  className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed space-y-3"
                  dangerouslySetInnerHTML={{ __html: marked.parse(generatedSermon.content || '') }}
                />

                {/* Quick Copy Footer */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  <button
                    onClick={() => copyToClipboard(generatedSermon.content, 'Sermão Completo')}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-950/60 border border-white/10 hover:bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copiar Texto
                  </button>
                  <button
                    onClick={() => copyToClipboard(generatedSermon.reelsScript || generatedSermon.content, 'Roteiro Reels')}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-950/60 border border-white/10 hover:bg-slate-800 text-cyan-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Film className="w-3.5 h-3.5" /> Copiar Roteiro Reels
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-800/60 border border-white/10 flex items-center justify-center text-slate-500">
                  <Sparkles className="w-8 h-8 text-slate-600" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-300">Sua Prévia Aparecerá Aqui</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                    Selecione as tags no painel à esquerda e clique em gerar para criar sua pregação.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
