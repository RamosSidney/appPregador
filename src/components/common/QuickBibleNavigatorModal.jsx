import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X, BookOpen, ChevronRight, Hash } from 'lucide-react';

/**
 * QuickBibleNavigatorModal
 * Instant selector modal for jumping directly to any Book, Chapter, and Verse.
 */
export default function QuickBibleNavigatorModal({
  isOpen,
  onClose,
  bibleDatabase,
  currentBook,
  currentChapter,
  onSelectTarget
}) {
  if (!isOpen || !bibleDatabase) return null;

  const [searchBook, setSearchBook] = useState('');
  const [selectedBookObj, setSelectedBookObj] = useState(() => {
    return bibleDatabase.find(b => b.name === currentBook) || bibleDatabase[0];
  });
  const [selectedChapterNum, setSelectedChapterNum] = useState(parseInt(currentChapter, 10) || 1);
  const [selectedVerseNum, setSelectedVerseNum] = useState(1);

  useEffect(() => {
    const b = bibleDatabase.find(b => b.name === currentBook);
    if (b) {
      setSelectedBookObj(b);
      setSelectedChapterNum(parseInt(currentChapter, 10) || 1);
    }
  }, [currentBook, currentChapter, bibleDatabase]);

  const filteredBooks = bibleDatabase.filter(b =>
    b.name.toLowerCase().includes(searchBook.toLowerCase())
  );

  const chapterCount = selectedBookObj?.chapters?.length || 1;
  const verseCount = selectedBookObj?.chapters?.[selectedChapterNum - 1]?.length || 1;

  const handleConfirmJump = () => {
    if (onSelectTarget) {
      onSelectTarget({
        book: selectedBookObj.name,
        chapter: selectedChapterNum.toString(),
        verseNum: selectedVerseNum
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl bg-[#0F172A] border border-purple-500/30 rounded-3xl p-6 shadow-2xl shadow-purple-950/60 relative overflow-hidden flex flex-col space-y-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Navegação Rápida da Bíblia NVI</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Steps Container: Book -> Chapter -> Verse */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[300px] max-h-[420px]">
          {/* Step 1: Select Book */}
          <div className="flex flex-col space-y-2 border-r border-slate-800/60 pr-2">
            <span className="text-xs font-black uppercase text-purple-400">1. Escolha o Livro</span>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchBook}
                onChange={(e) => setSearchBook(e.target.value)}
                placeholder="Filtrar livro..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex-1 overflow-y-auto space-y-1 pr-1">
              {filteredBooks.map((b) => (
                <button
                  key={b.name}
                  onClick={() => {
                    setSelectedBookObj(b);
                    setSelectedChapterNum(1);
                    setSelectedVerseNum(1);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    selectedBookObj?.name === b.name
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{b.name}</span>
                  <span className="text-[10px] opacity-70">{b.chapters.length} cap</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Chapter */}
          <div className="flex flex-col space-y-2 border-r border-slate-800/60 pr-2">
            <span className="text-xs font-black uppercase text-cyan-400">
              2. Capítulo ({selectedBookObj?.name})
            </span>
            <div className="flex-1 overflow-y-auto grid grid-cols-4 gap-1.5 p-1 align-content-start">
              {Array.from({ length: chapterCount }, (_, i) => i + 1).map((ch) => (
                <button
                  key={ch}
                  onClick={() => {
                    setSelectedChapterNum(ch);
                    setSelectedVerseNum(1);
                  }}
                  className={`py-2 rounded-xl text-xs font-black transition-all ${
                    selectedChapterNum === ch
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-black scale-105'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Select Verse */}
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-black uppercase text-amber-400">
              3. Versículo (Cap. {selectedChapterNum})
            </span>
            <div className="flex-1 overflow-y-auto grid grid-cols-4 gap-1.5 p-1 align-content-start">
              {Array.from({ length: verseCount }, (_, i) => i + 1).map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVerseNum(v)}
                  className={`py-2 rounded-xl text-xs font-black transition-all ${
                    selectedVerseNum === v
                      ? 'bg-amber-400 text-slate-950 shadow-md font-black scale-105'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  v.{v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Target Summary & Action */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs font-bold text-slate-300">
            Ir para: <span className="text-white font-extrabold text-sm">{selectedBookObj?.name} {selectedChapterNum}:{selectedVerseNum}</span>
          </div>

          <button
            onClick={handleConfirmJump}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-950/50 flex items-center gap-1.5"
          >
            <span>Navegar Agora</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
