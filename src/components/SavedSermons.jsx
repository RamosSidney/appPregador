import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Star, Trash2, Copy, Mic, BookMarked, Sparkles } from 'lucide-react';

export default function SavedSermons({
  savedSermons,
  onToggleFavorite,
  onDeleteSermon,
  onOpenPulpit,
  onNavigateToGenerator
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'favorites'

  const filteredSermons = savedSermons.filter((sermon) => {
    const matchesSearch =
      sermon.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.vibe?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === 'favorites') {
      return matchesSearch && sermon.isFavorite;
    }
    return matchesSearch;
  });

  const favoritesCount = savedSermons.filter(s => s.isFavorite).length;

  return (
    <div className="space-y-6 pb-safe-dock">
      {/* Search Bar & Filters Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar sermões por título ou tag..."
            className="w-full bg-slate-950/70 border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills with Counter Badges */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              activeFilter === 'all'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/60 border border-purple-400/40'
                : 'bg-slate-950/60 text-slate-400 border border-white/10 hover:text-slate-200'
            }`}
          >
            <span>Todos</span>
            <span className="px-1.5 py-0.5 rounded-full bg-black/30 text-[10px]">
              {savedSermons.length}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('favorites')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              activeFilter === 'favorites'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-950/60 border border-amber-400/40 font-black'
                : 'bg-slate-950/60 text-slate-400 border border-white/10 hover:text-slate-200'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Favoritos</span>
            <span className="px-1.5 py-0.5 rounded-full bg-black/30 text-[10px]">
              {favoritesCount}
            </span>
          </button>
        </div>
      </div>

      {/* List or Empty State */}
      {filteredSermons.length === 0 ? (
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <BookMarked className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">Nenhum Sermão Encontrado</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              {searchQuery
                ? 'Nenhum resultado corresponde aos termos da sua pesquisa.'
                : 'Sua biblioteca de mensagens salvas está vazia. Gere o seu primeiro sermão virando a chave!'}
            </p>
          </div>
          <button
            onClick={onNavigateToGenerator}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Gerar Meu Primeiro Sermão</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredSermons.map((sermon) => (
              <motion.div
                key={sermon.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-900/70 border border-white/10 rounded-2xl p-5 flex flex-col justify-between glass-panel-hover group"
              >
                <div className="space-y-3">
                  {/* Top Bar inside Card */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-extrabold uppercase">
                        #{sermon.vibe || 'GenZ'}
                      </span>
                    </div>

                    <button
                      onClick={() => onToggleFavorite(sermon.id)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        sermon.isFavorite
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                          : 'bg-slate-950/40 border-white/10 text-slate-500 hover:text-amber-400'
                      }`}
                      title="Favoritar Sermão"
                    >
                      <Star className={`w-4 h-4 ${sermon.isFavorite ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>

                  {/* Title & Preview Text */}
                  <div>
                    <h4 className="text-base font-extrabold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {sermon.title || 'Sermão Disruptivo'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {sermon.content?.replace(/[#*`]/g, '') || ''}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(sermon.content);
                        alert('Sermão copiado!');
                      }}
                      className="p-2 rounded-lg bg-slate-950/60 border border-white/10 text-slate-300 hover:text-white text-xs font-bold transition-all"
                      title="Copiar Texto"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onOpenPulpit(sermon)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-slate-950 text-xs font-bold transition-all"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>Púlpito</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onDeleteSermon(sermon.id)}
                    className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all"
                    title="Excluir Sermão"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
