import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X, BookOpen, ChevronRight } from 'lucide-react';

/**
 * QuickBibleNavigatorModal
 * Mobile-First selector modal for jumping directly to any Book, Chapter, and Verse.
 * On Mobile (<768px): Step-by-step tabs (Livro -> Capítulo -> Versículo) with auto-advance.
 * On Desktop (>=768px): 3-column simultaneous selector.
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

  const [mobileStep, setMobileStep] = useState('book'); // 'book' | 'chapter' | 'verse'
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
    setMobileStep('book');
  }, [currentBook, currentChapter, bibleDatabase, isOpen]);

  const filteredBooks = bibleDatabase.filter(b =>
    b.name.toLowerCase().includes(searchBook.toLowerCase())
  );

  const chapterCount = selectedBookObj?.chapters?.length || 1;
  const verseCount = selectedBookObj?.chapters?.[selectedChapterNum - 1]?.length || 1;

  const handleConfirmJump = (overrideVerse = null) => {
    if (onSelectTarget) {
      onSelectTarget({
        book: selectedBookObj.name,
        chapter: selectedChapterNum.toString(),
        verseNum: overrideVerse !== null ? overrideVerse : selectedVerseNum
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="w-full max-w-2xl bg-[#0F172A] border-t sm:border border-purple-500/30 rounded-t-3xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl shadow-purple-950/60 relative overflow-hidden flex flex-col space-y-4 max-h-[88dvh] pb-safe"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
          <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Ir Para — Bíblia NVI</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Step Tabs (<768px) */}
        <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 md:hidden shrink-0">
          <button
            type="button"
            onClick={() => setMobileStep('book')}
            className={`py-2 px-2 rounded-lg text-xs font-black truncate transition-all ${
              mobileStep === 'book' ? 'bg-purple-600 text-white shadow' : 'text-slate-400'
            }`}
          >
            1. {selectedBookObj?.name || 'Livro'}
          </button>
          <button
            type="button"
            onClick={() => setMobileStep('chapter')}
            className={`py-2 px-2 rounded-lg text-xs font-black transition-all ${
              mobileStep === 'chapter' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400'
            }`}
          >
            2. Cap. {selectedChapterNum}
          </button>
          <button
            type="button"
            onClick={() => setMobileStep('verse')}
            className={`py-2 px-2 rounded-lg text-xs font-black transition-all ${
              mobileStep === 'verse' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400'
            }`}
          >
            3. Verso {selectedVerseNum}
          </button>
        </div>

        {/* Content Area: Step-by-Step on Mobile, 3 Columns on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-[280px] max-h-[55dvh] md:max-h-[380px] overflow-hidden">
          {/* Step 1: Select Book */}
          <div className={`${mobileStep === 'book' ? 'flex' : 'hidden md:flex'} flex-col space-y-2 md:border-r md:border-slate-800/60 md:pr-2 h-full overflow-hidden`}>
            <span className="hidden md:block text-xs font-black uppercase text-purple-400">1. Escolha o Livro</span>
            <div className="relative shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchBook}
                onChange={(e) => setSearchBook(e.target.value)}
                placeholder="Buscar livro (ex: João, Salmos)..."
                className="w-full min-h-[42px] bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
              {filteredBooks.map((b) => (
                <button
                  key={b.name}
                  type="button"
                  onClick={() => {
                    setSelectedBookObj(b);
                    setSelectedChapterNum(1);
                    setSelectedVerseNum(1);
                    setMobileStep('chapter');
                  }}
                  className={`w-full min-h-[42px] text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    selectedBookObj?.name === b.name
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-900/70 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span>{b.name}</span>
                  <span className="text-[10px] opacity-75">{b.chapters.length} cap</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Chapter */}
          <div className={`${mobileStep === 'chapter' ? 'flex' : 'hidden md:flex'} flex-col space-y-2 md:border-r md:border-slate-800/60 md:pr-2 h-full overflow-hidden`}>
            <span className="hidden md:block text-xs font-black uppercase text-cyan-400">
              2. Capítulo ({selectedBookObj?.name})
            </span>
            <div className="flex-1 overflow-y-auto grid grid-cols-5 md:grid-cols-4 gap-2 p-1 align-content-start">
              {Array.from({ length: chapterCount }, (_, i) => i + 1).map((ch) => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => {
                    setSelectedChapterNum(ch);
                    setSelectedVerseNum(1);
                    setMobileStep('verse');
                  }}
                  className={`min-h-[44px] py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    selectedChapterNum === ch
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-black scale-105'
                      : 'bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Select Verse */}
          <div className={`${mobileStep === 'verse' ? 'flex' : 'hidden md:flex'} flex-col space-y-2 h-full overflow-hidden`}>
            <span className="hidden md:block text-xs font-black uppercase text-amber-400">
              3. Versículo (Cap. {selectedChapterNum})
            </span>
            <div className="flex-1 overflow-y-auto grid grid-cols-5 md:grid-cols-4 gap-2 p-1 align-content-start">
              {Array.from({ length: verseCount }, (_, i) => i + 1).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => {
                    setSelectedVerseNum(v);
                    // On mobile, tapping the verse immediately jumps!
                    if (window.innerWidth < 768) {
                      handleConfirmJump(v);
                    }
                  }}
                  className={`min-h-[44px] py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    selectedVerseNum === v
                      ? 'bg-amber-400 text-slate-950 shadow-md font-black scale-105'
                      : 'bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                  }`}
                >
                  v.{v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Target Summary & Action */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 shrink-0">
          <div className="text-xs font-bold text-slate-300 truncate">
            Destino: <span className="text-white font-extrabold text-sm">{selectedBookObj?.name} {selectedChapterNum}:{selectedVerseNum}</span>
          </div>

          <button
            type="button"
            onClick={() => handleConfirmJump()}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-950/50 flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>Ir Agora</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
