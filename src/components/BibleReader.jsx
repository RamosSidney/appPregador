import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Copy, Share2, Sparkles, ArrowLeft, Send, X,
  ChevronLeft, ChevronRight, Play, Pause, Volume2, Search, Type, Sliders, Music
} from 'lucide-react';
import { marked } from 'marked';
import { generateBibleLensAI, refineBibleChatAI } from '../services/aiService.js';
import { audioService } from '../services/audioService.js';
import { backgroundMusicService, MUSIC_TRACKS } from '../services/backgroundMusicService.js';

export default function BibleReader({ userCredits, onDeductCredit, config, onOpenSettings }) {
  const [bibleDatabase, setBibleDatabase] = useState(null);
  const [selectedBook, setSelectedBook] = useState('João');
  const [selectedChapter, setSelectedChapter] = useState('1');
  const [versesList, setVersesList] = useState([]);
  const [fontSerif, setFontSerif] = useState(true);
  const [fontSize, setFontSize] = useState(18);

  // Background Music State
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [selectedMusicTrack, setSelectedMusicTrack] = useState('cinematic');
  const [showMusicMenu, setShowMusicMenu] = useState(false);

  // Verse Selection / Highlight State
  const [selectedVerseRef, setSelectedVerseRef] = useState(null);
  const [selectedVerseText, setSelectedVerseText] = useState('');
  const [menuPosition, setMenuPosition] = useState(null);
  const [highlights, setHighlights] = useState(() => {
    try {
      const saved = localStorage.getItem('app_pregador_bible_highlights');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Audio Narration State & Auto-Play Ref
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const isAutoPlayingNextRef = useRef(false);

  // Calculate active spoken verse index and verse number
  const activeVerseIdx = versesList.length > 0
    ? Math.min(versesList.length - 1, Math.floor((audioProgress / 100) * versesList.length))
    : -1;
  const activeSpokenVerseNum = isPlayingAudio && activeVerseIdx >= 0 ? versesList[activeVerseIdx]?.num : null;

  // Sync Audio & Music playing state on mount
  useEffect(() => {
    setIsPlayingAudio(audioService.isPlaying);
    setIsPlayingMusic(backgroundMusicService.isPlaying);
  }, []);

  // Smooth Auto-Scroll page to keep spoken verse centered in viewport
  useEffect(() => {
    if (isPlayingAudio && activeSpokenVerseNum) {
      const el = document.querySelector(`[data-verse-num="${activeSpokenVerseNum}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeSpokenVerseNum, isPlayingAudio]);

  // Fullscreen Refinement Chat State
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelTitle, setPanelTitle] = useState('');
  const [actionType, setActionType] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Font Size Handlers
  const handleDecreaseFontSize = () => {
    setFontSize(prev => Math.max(14, prev - 2));
  };

  const handleIncreaseFontSize = () => {
    setFontSize(prev => Math.min(32, prev + 2));
  };

  // Background Music Handlers
  const toggleBackgroundMusic = (trackId = null) => {
    const targetTrack = trackId || selectedMusicTrack;
    const isNowPlaying = backgroundMusicService.toggle(targetTrack);
    setIsPlayingMusic(isNowPlaying);
  };

  const handleSelectMusicTrack = (trackId) => {
    setSelectedMusicTrack(trackId);
    backgroundMusicService.play(trackId);
    setIsPlayingMusic(true);
  };

  // 1. Fetch NVI Bible JSON on mount
  useEffect(() => {
    async function loadNvi() {
      try {
        const res = await fetch('/nvi.json');
        if (!res.ok) throw new Error("Erro ao carregar nvi.json");
        const text = await res.text();
        const data = JSON.parse(text.trim().replace(/^\uFEFF/, ''));
        setBibleDatabase(data);
      } catch (err) {
        console.error("Erro ao carregar bíblia:", err);
      }
    }
    loadNvi();
  }, []);

  // Stop audio on unmount or chapter change
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  }, [selectedBook, selectedChapter]);

  // 2. Update Verses when Book or Chapter changes
  useEffect(() => {
    if (!bibleDatabase) return;

    const bookData = bibleDatabase.find(b => b.name === selectedBook);
    const chapterIdx = parseInt(selectedChapter, 10) - 1;

    if (bookData && bookData.chapters && bookData.chapters[chapterIdx]) {
      const list = bookData.chapters[chapterIdx].map((text, idx) => ({
        num: idx + 1,
        text
      }));
      setVersesList(list);
    } else {
      setVersesList([]);
    }
    setSelectedVerseRef(null);
    setSelectedVerseText('');
    setMenuPosition(null);
  }, [selectedBook, selectedChapter, bibleDatabase]);

  // 3. Keep Floating Menu aligned with verse during page scroll
  useEffect(() => {
    if (!selectedVerseRef) return;

    const handleScroll = () => {
      try {
        const el = document.querySelector(`[data-verse-ref="${selectedVerseRef}"]`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const topPos = Math.max(80, rect.top - 10);
          const leftPos = Math.min(Math.max(140, rect.left + rect.width / 2), window.innerWidth - 140);
          setMenuPosition({ left: leftPos, top: topPos });
        }
      } catch (e) {
        // Safe fallback
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedVerseRef]);

  const currentBookData = bibleDatabase?.find(b => b.name === selectedBook);
  const chapterOptionsCount = currentBookData?.chapters?.length || 1;

  // Chapter Navigation
  const handlePrevChapter = () => {
    const chNum = parseInt(selectedChapter, 10);
    if (chNum > 1) {
      setSelectedChapter((chNum - 1).toString());
    } else {
      const currentBookIdx = bibleDatabase?.findIndex(b => b.name === selectedBook);
      if (currentBookIdx > 0) {
        const prevBook = bibleDatabase[currentBookIdx - 1];
        setSelectedBook(prevBook.name);
        setSelectedChapter(prevBook.chapters.length.toString());
      }
    }
  };

  const handleNextChapter = () => {
    const chNum = parseInt(selectedChapter, 10);
    if (chNum < chapterOptionsCount) {
      setSelectedChapter((chNum + 1).toString());
    } else {
      const currentBookIdx = bibleDatabase?.findIndex(b => b.name === selectedBook);
      if (currentBookIdx < (bibleDatabase?.length || 0) - 1) {
        const nextBook = bibleDatabase[currentBookIdx + 1];
        setSelectedBook(nextBook.name);
        setSelectedChapter('1');
      }
    }
  };

  // Audio Player Narration with Realtime Progress & Auto-Next Chapter
  const startChapterNarration = (bookName, chapterNum, verses) => {
    if (!verses || verses.length === 0) return;
    const chapterText = verses.map(v => v.text).join(' ');
    const rawText = `${bookName}, capítulo ${chapterNum}. ${chapterText}`;

    setAudioProgress(0);
    setIsPlayingAudio(true);

    audioService.speak(rawText, {
      rate: 0.95,
      style: 'devocional',
      onProgress: (percent) => {
        setAudioProgress(percent);
      },
      onEnd: () => {
        setIsPlayingAudio(false);
        setAudioProgress(100);
        // Auto-advance to next chapter automatically when finished!
        const chNum = parseInt(chapterNum, 10);
        const bookData = bibleDatabase?.find(b => b.name === bookName);
        if (bookData && chNum < bookData.chapters.length) {
          isAutoPlayingNextRef.current = true;
          setSelectedChapter((chNum + 1).toString());
        } else {
          const currentBookIdx = bibleDatabase?.findIndex(b => b.name === bookName);
          if (currentBookIdx < (bibleDatabase?.length || 0) - 1) {
            const nextBook = bibleDatabase[currentBookIdx + 1];
            isAutoPlayingNextRef.current = true;
            setSelectedBook(nextBook.name);
            setSelectedChapter('1');
          }
        }
      },
      onError: () => {
        setIsPlayingAudio(false);
        setAudioProgress(0);
      }
    });
  };

  const toggleAudioNarration = () => {
    if (isPlayingAudio) {
      audioService.stop();
      setIsPlayingAudio(false);
      setAudioProgress(0);
    } else {
      startChapterNarration(selectedBook, selectedChapter, versesList);
    }
  };

  // Auto-play next chapter when advancing automatically
  useEffect(() => {
    if (isAutoPlayingNextRef.current && versesList.length > 0) {
      isAutoPlayingNextRef.current = false;
      const timer = setTimeout(() => {
        startChapterNarration(selectedBook, selectedChapter, versesList);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [selectedBook, selectedChapter, versesList]);

  // Handle Verse Click (Toggle selection: select / unselect)
  const handleVerseClick = (e, verse) => {
    e.stopPropagation();
    const ref = `${selectedBook} ${selectedChapter}:${verse.num}`;

    // If clicking the currently selected verse, toggle off (unselect)
    if (selectedVerseRef === ref) {
      setSelectedVerseRef(null);
      setSelectedVerseText('');
      setMenuPosition(null);
      return;
    }

    // Otherwise select the new verse
    setSelectedVerseRef(ref);
    setSelectedVerseText(verse.text);

    const rect = e.currentTarget.getBoundingClientRect();
    const topPos = Math.max(80, rect.top - 10);
    const leftPos = Math.min(Math.max(140, rect.left + rect.width / 2), window.innerWidth - 140);

    setMenuPosition({
      left: leftPos,
      top: topPos
    });
  };

  const handleApplyHighlight = (color) => {
    if (!selectedVerseRef) return;
    const newHighlights = { ...highlights };
    if (color === 'clear') {
      delete newHighlights[selectedVerseRef];
    } else {
      newHighlights[selectedVerseRef] = color;
    }
    setHighlights(newHighlights);
    localStorage.setItem('app_pregador_bible_highlights', JSON.stringify(newHighlights));
    setMenuPosition(null);
  };

  const handleCopyVerse = () => {
    if (!selectedVerseRef || !selectedVerseText) return;
    navigator.clipboard.writeText(`"${selectedVerseText}" (${selectedVerseRef})`);
    alert("Versículo copiado! 📋");
    setMenuPosition(null);
  };

  const handleShareVerse = () => {
    if (!selectedVerseRef || !selectedVerseText) return;
    const shareText = `*Lente Bíblica appPregador 2.0* ⚡\n\n"${selectedVerseText}"\n(_${selectedVerseRef}_)`;

    if (navigator.share) {
      navigator.share({ title: 'appPregador 2.0', text: shareText }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Mensagem copiada para envio! 📲");
    }
    setMenuPosition(null);
  };

  // Trigger Real AI Action
  const handleTriggerAction = async (type) => {
    if (!selectedVerseRef) return;
    setMenuPosition(null);

    const title = type === 'quebra-gelo' ? '🎲 Quebra-Gelo Célula' : '💡 Tradução Gen Z / Alpha';
    setPanelTitle(title);
    setActionType(type);
    setIsPanelOpen(true);

    const promptUser = `Versículo: ${selectedVerseRef} -> "${selectedVerseText}"`;
    setChatMessages([{ role: 'user', content: promptUser }]);
    setIsLoading(true);

    try {
      const aiReply = await generateBibleLensAI({
        verseRef: selectedVerseRef,
        verseText: selectedVerseText,
        actionType: type,
        config
      });

      await onDeductCredit();

      setChatMessages([
        { role: 'user', content: promptUser },
        { role: 'assistant', content: aiReply }
      ]);
    } catch (err) {
      alert(err.message || "Erro ao gerar resposta com IA.");
      if (onOpenSettings) onOpenSettings();
    } finally {
      setIsLoading(false);
    }
  };

  // Send Follow-up Chat Refinement with Real AI
  const handleSendChatRefine = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const userText = chatInput;
    setChatInput('');
    const newHistory = [...chatMessages, { role: 'user', content: userText }];
    setChatMessages(newHistory);
    setIsLoading(true);

    try {
      let sysPrompt = actionType === 'quebra-gelo'
        ? `Você é um líder de jovens e teólogo especialista em dinâmicas de grupo para Gen Z e Alpha.`
        : `Você é um tradutor cultural teológico especializado na Geração Z e Alpha.`;

      const aiReply = await refineBibleChatAI({
        systemPrompt: sysPrompt,
        history: newHistory,
        config
      });

      await onDeductCredit();

      setChatMessages([...newHistory, { role: 'assistant', content: aiReply }]);
    } catch (err) {
      alert(err.message || "Erro ao refinar chat com IA.");
      if (onOpenSettings) onOpenSettings();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 pb-28 relative max-w-4xl mx-auto" onClick={() => setMenuPosition(null)}>
      {/* Top Header Bar - Strict Single Line Layout with Compact Selectors & Audio Next to Chapter */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 sm:p-3 shadow-2xl sticky top-16 sm:top-20 z-30 overflow-x-auto scrollbar-none no-scrollbar">
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 min-w-max w-full">
          {/* Left Group: Book & Chapter Selectors + Audio Button + NVI */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Book Dropdown Pill (Auto-adjusted snug width & larger font size) */}
            <div className="relative">
              <select
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                style={{ width: `${Math.min(145, Math.max(74, selectedBook.length * 9.5 + 26))}px` }}
                className="bg-slate-950/90 border border-white/15 hover:border-purple-500 rounded-full pl-3 pr-5 py-1 text-xs sm:text-sm font-black text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all truncate"
              >
                {bibleDatabase?.map((b) => (
                  <option key={b.name} value={b.name} className="bg-slate-900 text-white font-bold text-xs py-1">{b.name}</option>
                ))}
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-400 text-[8px] pointer-events-none">▼</span>
            </div>

            {/* Chapter Selector Pill (Numbers only, larger font size & compact snug width) */}
            <div className="relative">
              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                style={{ width: `${Math.max(46, selectedChapter.length * 10 + 24)}px` }}
                className="bg-slate-950/90 border border-white/15 hover:border-purple-500 rounded-full pl-2.5 pr-4 py-1 text-xs sm:text-sm font-black text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all text-center"
              >
                {Array.from({ length: chapterOptionsCount }, (_, i) => i + 1).map((ch) => (
                  <option key={ch} value={ch.toString()} className="bg-slate-900 text-white font-bold text-xs py-1">{ch}</option>
                ))}
              </select>
              <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-purple-400 text-[8px] pointer-events-none">▼</span>
            </div>

            {/* Audio TTS Button Right After Chapter */}
            <button
              onClick={toggleAudioNarration}
              className={`p-1.5 sm:p-2 rounded-full border transition-all ${
                isPlayingAudio
                  ? 'bg-amber-500/20 border-amber-400 text-amber-400 animate-pulse'
                  : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-white'
              }`}
              title={isPlayingAudio ? 'Pausar Áudio' : 'Ouvir Capítulo'}
            >
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* NVI Tag */}
            <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-black uppercase">
              NVI
            </span>
          </div>

          {/* Right Group: Font Size Controls & Font Family */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Font Size Controls */}
            <div className="flex items-center bg-slate-950/80 border border-white/10 rounded-full p-0.5">
              <button
                onClick={handleDecreaseFontSize}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-xs font-extrabold"
                title="Diminuir Fonte (A-)"
              >
                A-
              </button>
              <span className="text-[10px] font-mono text-purple-300 font-bold px-1 select-none">
                {fontSize}px
              </span>
              <button
                onClick={handleIncreaseFontSize}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-xs font-extrabold"
                title="Aumentar Fonte (A+)"
              >
                A+
              </button>
            </div>

            {/* Font Family (Serif/Sans) Toggle */}
            <button
              onClick={() => setFontSerif(!fontSerif)}
              className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full border transition-all text-xs font-extrabold flex items-center gap-1 ${
                fontSerif
                  ? 'bg-purple-600/20 border-purple-500/40 text-purple-300 font-serif'
                  : 'bg-slate-950/80 border-white/10 text-slate-300 font-sans'
              }`}
              title="Alternar Fonte Serif/Sans"
            >
              <Type className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">{fontSerif ? 'Serif' : 'Sans'}</span>
            </button>

            {/* Background Ambient Music Toggle & Menu */}
            <div className="relative">
              <button
                onClick={() => toggleBackgroundMusic()}
                onContextMenu={(e) => { e.preventDefault(); setShowMusicMenu(!showMusicMenu); }}
                className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full border transition-all text-xs font-extrabold flex items-center gap-1 cursor-pointer ${
                  isPlayingMusic
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                    : 'bg-slate-950/80 border-white/10 text-slate-400 hover:text-white'
                }`}
                title={isPlayingMusic ? 'Pausar Fundo Musical (Clique com botão direito para escolher estilo)' : 'Ativar Fundo Musical Motivacional/Cinemático'}
              >
                <Music className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px]">{isPlayingMusic ? 'Fundo ON' : 'Fundo'}</span>
              </button>

              {/* Music Track Selector Popover Dropdown */}
              {showMusicMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-slate-950/95 backdrop-blur-2xl border border-purple-500/40 rounded-2xl p-3 shadow-2xl z-50 space-y-2">
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Fundo Musical Bíblico</span>
                    <button onClick={() => setShowMusicMenu(false)} className="text-slate-400 hover:text-white text-xs font-bold">✕</button>
                  </div>
                  <div className="space-y-1">
                    {MUSIC_TRACKS.map(track => (
                      <button
                        key={track.id}
                        onClick={() => {
                          handleSelectMusicTrack(track.id);
                          setShowMusicMenu(false);
                        }}
                        className={`w-full text-left p-2 rounded-xl border text-xs transition-all ${
                          selectedMusicTrack === track.id && isPlayingMusic
                            ? 'bg-purple-600/30 border-purple-400 text-white font-bold'
                            : 'bg-slate-900 border-white/10 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="font-bold">{track.name}</div>
                        <div className="text-[9px] text-slate-400">{track.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bible Reading Continuous Flow Container with Left Audio Progress Bar */}
      <div className="relative flex items-stretch gap-2.5 sm:gap-3">
        {/* Sleek Vertical Progress Indicator Bar tracking Audio Narration */}
        <div className="w-1.5 sm:w-2 bg-slate-900/90 border border-slate-800 rounded-full overflow-hidden shrink-0 relative flex flex-col justify-start my-1 shadow-inner">
          <motion.div
            className="w-full bg-gradient-to-b from-purple-500 via-cyan-400 to-amber-400 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.8)]"
            animate={{ height: `${audioProgress}%` }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        </div>

        {/* Bible Text Container */}
        <div
          className={`flex-1 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-5 sm:p-10 shadow-2xl space-y-4 ${
            fontSerif ? "font-serif" : "font-sans"
          }`}
          style={{ fontSize: `${fontSize}px` }}
        >
          <div className="leading-relaxed sm:leading-loose text-slate-200 space-y-3">
            {versesList.map((verse) => {
              const ref = `${selectedBook} ${selectedChapter}:${verse.num}`;
              const highlightColor = highlights[ref];
              const isSelected = selectedVerseRef === ref;
              const isSpokenVerse = isPlayingAudio && activeSpokenVerseNum === verse.num;

              let highlightBg = '';
              if (highlightColor === 'green') highlightBg = 'bg-emerald-500/25 text-white rounded px-1';
              else if (highlightColor === 'blue') highlightBg = 'bg-cyan-500/25 text-white rounded px-1';
              else if (highlightColor === 'yellow') highlightBg = 'bg-amber-500/30 text-white rounded px-1';
              else if (highlightColor === 'pink') highlightBg = 'bg-rose-500/30 text-white rounded px-1';

              let spokenClass = '';
              if (isSpokenVerse) {
                spokenClass = 'bg-cyan-500/30 border-b-2 border-cyan-400 text-cyan-100 font-bold ring-2 ring-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.5)] px-1.5 py-0.5 animate-pulse';
              }

              return (
                <span
                  key={verse.num}
                  data-verse-ref={ref}
                  data-verse-num={verse.num}
                  onClick={(e) => handleVerseClick(e, verse)}
                  className={`cursor-pointer transition-all duration-200 inline-block mr-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-purple-600/40 border-b-2 border-purple-400 text-white font-bold ring-2 ring-purple-500/50 px-1' : ''
                  } ${spokenClass || highlightBg || 'hover:bg-slate-800/60'}`}
                >
                  <sup className="text-[0.65em] font-extrabold text-amber-400/90 mr-1 select-none font-sans">
                    {verse.num}
                  </sup>
                  <span>{verse.text}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Context Action Bar Menu */}
      {menuPosition && selectedVerseRef && (
        <div
          className="fixed z-50 transform -translate-x-1/2 -translate-y-full bg-slate-950/95 backdrop-blur-2xl border border-white/15 rounded-full px-3 py-2 shadow-2xl shadow-purple-950/80 flex items-center gap-1.5 sm:gap-2 animate-fadeIn max-w-[95vw] overflow-x-auto scrollbar-none"
          style={{ left: menuPosition.left, top: menuPosition.top }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Color Dots */}
          <div className="flex items-center gap-1.5 px-1.5 border-r border-white/15 shrink-0">
            <button onClick={() => handleApplyHighlight('green')} className="w-5 h-5 rounded-full bg-emerald-400 hover:scale-110 transition-transform" />
            <button onClick={() => handleApplyHighlight('blue')} className="w-5 h-5 rounded-full bg-cyan-400 hover:scale-110 transition-transform" />
            <button onClick={() => handleApplyHighlight('yellow')} className="w-5 h-5 rounded-full bg-amber-400 hover:scale-110 transition-transform" />
            <button onClick={() => handleApplyHighlight('pink')} className="w-5 h-5 rounded-full bg-rose-400 hover:scale-110 transition-transform" />
            <button onClick={() => handleApplyHighlight('clear')} className="w-5 h-5 rounded-full border border-white/30 text-[9px] flex items-center justify-center text-slate-400 hover:text-white">✕</button>
          </div>

          {/* Action Buttons */}
          <button onClick={handleCopyVerse} className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold shrink-0" title="Copiar Versículo">
            <Copy className="w-4 h-4" />
          </button>
          <button onClick={handleShareVerse} className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold shrink-0" title="Compartilhar">
            <Share2 className="w-4 h-4" />
          </button>
          <button onClick={() => handleTriggerAction('quebra-gelo')} className="px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 text-xs font-black flex items-center gap-1 border border-cyan-500/30 shrink-0">
            <Sparkles className="w-3.5 h-3.5" /> Quebra-Gelo
          </button>
          <button onClick={() => handleTriggerAction('traducao')} className="px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-300 hover:bg-purple-500 hover:text-white text-xs font-black flex items-center gap-1 border border-purple-500/30 shrink-0">
            💡 Traduzir Gen Z
          </button>
        </div>
      )}

      {/* Floating Bottom Quick Controls Bar */}
      <div className="fixed bottom-20 left-0 right-0 z-40 px-4 pointer-events-none flex justify-center">
        <div className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/90 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-purple-950/60">
          <button
            onClick={handlePrevChapter}
            className="p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-all border border-white/10"
            title="Capítulo Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={toggleAudioNarration}
            className={`p-3.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold shadow-lg shadow-purple-950/60 hover:scale-105 active:scale-95 transition-all flex items-center justify-center ${
              isPlayingAudio ? 'animate-pulse' : ''
            }`}
            title={isPlayingAudio ? 'Pausar Narração por Voz' : 'Ouvir Capítulo por Voz'}
          >
            {isPlayingAudio ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          {/* Quick Toggle Background Music Button */}
          <button
            onClick={() => toggleBackgroundMusic()}
            className={`p-2.5 rounded-full border transition-all cursor-pointer ${
              isPlayingMusic
                ? 'bg-amber-500/20 border-amber-400 text-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                : 'bg-slate-950/80 border-white/10 text-slate-400 hover:text-white'
            }`}
            title={isPlayingMusic ? 'Pausar Fundo Musical' : 'Ativar Fundo Musical Motivacional/Cinemático'}
          >
            <Music className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={handleNextChapter}
            className="p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-all border border-white/10"
            title="Próximo Capítulo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 100% Fullscreen Refinement Chat Panel (Borda Infinita #0B0E14) */}
      <AnimatePresence>
        {isPanelOpen && (
          <div className="fixed inset-0 z-[100] bg-[#0b0d17] text-slate-100 overflow-y-auto w-full h-full min-h-screen font-sans selection:bg-cyan-500 selection:text-slate-950 scroll-smooth">
            
            {/* 1. HEADER FIXO COM NAVEGAÇÃO E BADGE */}
            <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/90 border-b border-slate-800/80 px-4 py-3 flex items-center justify-between shrink-0 shadow-lg">
              <button
                onClick={() => setIsPanelOpen(false)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 text-xs sm:text-sm font-extrabold transition-all min-h-[44px] cursor-pointer shadow-md"
                aria-label="Voltar para a Bíblia"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar para a Bíblia</span>
              </button>
              
              <div className="flex items-center gap-2 bg-purple-950/40 border border-purple-500/30 px-3 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-bold text-purple-300">Tradução Gen Z / Alpha</span>
              </div>
            </header>

            {/* 2. CONTEÚDO PRINCIPAL (FOCO DE LEITURA RESPONSIVO - pb-48 GARANTE SCROLL ATÉ O FIM) */}
            <main className="max-w-3xl w-full mx-auto px-4 py-6 flex flex-col gap-6 pb-48">
              
              {/* CARD DO VERSÍCULO BÍBLICO (H-AUTO COMPLETO SEM TRUNCAMENTO DE TEXTO) */}
              <section className="w-full h-auto rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-xl flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                  <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-black">
                    {selectedVerseRef}
                  </span>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">NVI</span>
                </div>
                
                <blockquote className="font-serif text-slate-100 text-sm sm:text-base md:text-lg leading-relaxed italic border-l-4 border-purple-500 pl-4 py-1 break-words whitespace-normal font-medium">
                  "{selectedVerseText}"
                </blockquote>
              </section>

              {/* CHAT MESSAGES STREAM */}
              {chatMessages.map((msg, index) => {
                if (index === 0 && msg.role === 'user') return null;
                return (
                  <article key={index} className="w-full h-auto rounded-2xl bg-slate-900/90 border border-slate-800 p-5 md:p-6 shadow-2xl flex flex-col gap-4 relative">
                    {/* Glowing Accent Top Line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-cyan-400 to-amber-400 rounded-t-2xl" />

                    {/* HEADER DO CARD IA */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-4 mt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400 text-lg">✨</span>
                        <h1 className="text-xs sm:text-sm font-bold tracking-wide text-slate-100 uppercase">
                          {msg.role === 'user' ? 'Sua Dúvida' : 'Estudo & Tradução Teológica IA'}
                        </h1>
                      </div>

                      <div className="flex items-center gap-2">
                        {msg.role === 'assistant' && (
                          <button
                            onClick={() => {
                              if (isPlayingAudio) {
                                audioService.stop();
                                setIsPlayingAudio(false);
                              } else {
                                audioService.speak(msg.content, {
                                  rate: 1.0,
                                  style: 'genz',
                                  onEnd: () => setIsPlayingAudio(false),
                                  onError: () => setIsPlayingAudio(false)
                                });
                                setIsPlayingAudio(true);
                              }
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border min-h-[36px] cursor-pointer ${
                              isPlayingAudio
                                ? 'bg-amber-500/20 border-amber-400 text-amber-400 animate-pulse'
                                : 'bg-slate-950 border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-slate-800'
                            }`}
                            title="Ouvir Tradução por Áudio"
                            aria-label="Ouvir Tradução por Áudio"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isPlayingAudio ? 'Pausar' : 'Ouvir Tradução'}</span>
                          </button>
                        )}

                        <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                          Gen Z & Alpha Edition
                        </span>
                      </div>
                    </div>

                    {/* MARKDOWN PROSE CONTENT */}
                    <div
                      className="prose prose-invert max-w-none text-slate-100 text-sm md:text-base leading-relaxed space-y-4 prose-h1:text-xl sm:prose-h1:text-2xl prose-h1:font-black prose-h1:text-purple-300 prose-h2:text-base sm:prose-h2:text-lg prose-h2:font-extrabold prose-h2:text-cyan-300 prose-h3:text-amber-400 prose-strong:text-amber-300 prose-blockquote:border-l-4 prose-blockquote:border-cyan-400 prose-blockquote:bg-purple-950/20 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-li:marker:text-purple-400 break-words"
                      dangerouslySetInnerHTML={{ __html: marked.parse(msg.content || '') }}
                    />
                  </article>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs sm:text-sm flex items-center gap-3 shadow-lg">
                    <Sparkles className="w-5 h-5 animate-spin text-purple-400" />
                    <span>Conectando exegese bíblica a metáforas da Geração Z e Alpha...</span>
                  </div>
                </div>
              )}
            </main>

            {/* 3. FLOATING STICKY INPUT BAR AT BOTTOM */}
            <div className="fixed bottom-0 left-0 right-0 z-40 px-4 py-3 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 shadow-2xl">
              <div className="max-w-3xl mx-auto space-y-2">
                {/* Prompt Suggestion Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none no-scrollbar pb-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setChatInput("Me dê mais 3 metáforas digitais para jovens...")}
                    className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-300 whitespace-nowrap transition-all cursor-pointer"
                  >
                    ✨ Mais metáforas digitais
                  </button>
                  <button
                    type="button"
                    onClick={() => setChatInput("Como posso aplicar esse versículo na célula ou grupo de jovens?")}
                    className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-purple-300 whitespace-nowrap transition-all cursor-pointer"
                  >
                    💡 Aplicação para a Célula
                  </button>
                  <button
                    type="button"
                    onClick={() => setChatInput("Quais referências cruzadas adicionais explicam este tema?")}
                    className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-300 whitespace-nowrap transition-all cursor-pointer"
                  >
                    📜 Mais referências bíblicas
                  </button>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSendChatRefine} className="relative flex items-center shadow-2xl">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Peça mais exemplos, contexto extra ou metáforas..." 
                    className="w-full bg-slate-900/90 backdrop-blur-md text-slate-100 placeholder-slate-500 text-sm rounded-full pl-5 pr-12 py-3 border border-slate-700/80 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                  <button 
                    type="submit" 
                    disabled={isLoading || !chatInput.trim()}
                    aria-label="Enviar pergunta"
                    className="absolute right-1.5 p-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
