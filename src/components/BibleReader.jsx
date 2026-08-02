import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Copy, Share2, Sparkles, ArrowLeft, Send, X,
  ChevronLeft, ChevronRight, Play, Pause, Volume2, Search, Type, Sliders
} from 'lucide-react';
import { marked } from 'marked';
import { generateBibleLensAI, refineBibleChatAI } from '../services/aiService.js';

export default function BibleReader({ userCredits, onDeductCredit, config, onOpenSettings }) {
  const [bibleDatabase, setBibleDatabase] = useState(null);
  const [selectedBook, setSelectedBook] = useState('João');
  const [selectedChapter, setSelectedChapter] = useState('1');
  const [versesList, setVersesList] = useState([]);
  const [fontSerif, setFontSerif] = useState(true);
  const [fontSize, setFontSize] = useState(18);

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

  // Audio Narration State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const synthRef = useRef(null);

  // Fullscreen Refinement Chat State
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelTitle, setPanelTitle] = useState('');
  const [actionType, setActionType] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    setMenuPosition(null);
  }, [selectedBook, selectedChapter, bibleDatabase]);

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

  // Audio Player Narration
  const toggleAudioNarration = () => {
    if (!window.speechSynthesis) {
      alert("Navegador não suporta reprodução de áudio TTS.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const chapterText = versesList.map(v => `${v.num}. ${v.text}`).join(' ');
      const utterance = new SpeechSynthesisUtterance(`${selectedBook} capítulo ${selectedChapter}. ${chapterText}`);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  // Handle Verse Selection
  const handleVerseClick = (e, verse) => {
    e.stopPropagation();
    const ref = `${selectedBook} ${selectedChapter}:${verse.num}`;
    setSelectedVerseRef(ref);
    setSelectedVerseText(verse.text);

    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({
      left: rect.left + rect.width / 2,
      top: rect.top + window.scrollY - 10
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
    <div className="space-y-6 pb-28 relative max-w-4xl mx-auto" onClick={() => setMenuPosition(null)}>
      {/* Top Header Bar Inspired by YouVersion / Bible App */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 shadow-2xl sticky top-20 z-30">
        {/* Left Selector Pills */}
        <div className="flex items-center gap-2">
          {/* Book Dropdown Pill */}
          <div className="relative">
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              className="bg-slate-950/90 border border-white/15 hover:border-purple-500 rounded-full px-4 py-1.5 text-xs font-extrabold text-white appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            >
              {bibleDatabase?.map((b) => (
                <option key={b.name} value={b.name}>{b.name}</option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none">▼</span>
          </div>

          {/* Chapter Selector Pill */}
          <div className="relative">
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="bg-slate-950/90 border border-white/15 hover:border-purple-500 rounded-full px-4 py-1.5 text-xs font-extrabold text-white appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            >
              {Array.from({ length: chapterOptionsCount }, (_, i) => i + 1).map((ch) => (
                <option key={ch} value={ch.toString()}>Cap. {ch}</option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none">▼</span>
          </div>

          <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-black tracking-wider uppercase">
            NVI
          </span>
        </div>

        {/* Right Controls (TTS Audio, Font Toggle) */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAudioNarration}
            className={`p-2 rounded-full border transition-all ${
              isPlayingAudio
                ? 'bg-amber-500/20 border-amber-400 text-amber-400 animate-pulse'
                : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-white'
            }`}
            title={isPlayingAudio ? 'Pausar Áudio' : 'Ouvir Capítulo'}
          >
            <Volume2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setFontSerif(!fontSerif)}
            className="p-2 rounded-full bg-slate-950/60 border border-white/10 text-slate-400 hover:text-white transition-all text-xs font-serif font-black"
            title="Alternar Fonte Serif/Sans"
          >
            <Type className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chapter Title Subtitle Header */}
      <div className="px-2 pt-2">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
          <span>{selectedBook} {selectedChapter}</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Toque em qualquer versículo para abrir opções de destaque e ferramentas IA.</p>
      </div>

      {/* Bible Reading Continuous Flow Container (Sans or Serif) */}
      <div
        className={`bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-4 ${
          fontSerif ? "font-serif" : "font-sans"
        }`}
        style={{ fontSize: `${fontSize}px` }}
      >
        <div className="leading-relaxed sm:leading-loose text-slate-200 space-y-3">
          {versesList.map((verse) => {
            const ref = `${selectedBook} ${selectedChapter}:${verse.num}`;
            const highlightColor = highlights[ref];
            const isSelected = selectedVerseRef === ref;

            let highlightBg = '';
            if (highlightColor === 'green') highlightBg = 'bg-emerald-500/25 text-white rounded px-1';
            else if (highlightColor === 'blue') highlightBg = 'bg-cyan-500/25 text-white rounded px-1';
            else if (highlightColor === 'yellow') highlightBg = 'bg-amber-500/30 text-white rounded px-1';
            else if (highlightColor === 'pink') highlightBg = 'bg-rose-500/30 text-white rounded px-1';

            return (
              <span
                key={verse.num}
                onClick={(e) => handleVerseClick(e, verse)}
                className={`cursor-pointer transition-all duration-150 inline-block mr-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-purple-600/30 border-b-2 border-purple-400 text-white font-bold' : ''
                } ${highlightBg || 'hover:bg-slate-800/60'}`}
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

      {/* Floating Context Action Bar Menu */}
      {menuPosition && selectedVerseRef && (
        <div
          className="fixed z-50 transform -translate-x-1/2 -translate-y-full bg-slate-950/95 backdrop-blur-2xl border border-white/15 rounded-full px-3 py-2 shadow-2xl shadow-purple-950/80 flex items-center gap-2 animate-fadeIn"
          style={{ left: menuPosition.left, top: menuPosition.top }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Color Dots */}
          <div className="flex items-center gap-1.5 px-2 border-r border-white/15">
            <button onClick={() => handleApplyHighlight('green')} className="w-5 h-5 rounded-full bg-emerald-400 hover:scale-110 transition-transform" />
            <button onClick={() => handleApplyHighlight('blue')} className="w-5 h-5 rounded-full bg-cyan-400 hover:scale-110 transition-transform" />
            <button onClick={() => handleApplyHighlight('yellow')} className="w-5 h-5 rounded-full bg-amber-400 hover:scale-110 transition-transform" />
            <button onClick={() => handleApplyHighlight('pink')} className="w-5 h-5 rounded-full bg-rose-400 hover:scale-110 transition-transform" />
            <button onClick={() => handleApplyHighlight('clear')} className="w-5 h-5 rounded-full border border-white/30 text-[9px] flex items-center justify-center text-slate-400 hover:text-white">✕</button>
          </div>

          {/* Action Buttons */}
          <button onClick={handleCopyVerse} className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold" title="Copiar Versículo">
            <Copy className="w-4 h-4" />
          </button>
          <button onClick={handleShareVerse} className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold" title="Compartilhar">
            <Share2 className="w-4 h-4" />
          </button>
          <button onClick={() => handleTriggerAction('quebra-gelo')} className="px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 text-xs font-black flex items-center gap-1 border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Quebra-Gelo
          </button>
          <button onClick={() => handleTriggerAction('traducao')} className="px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-300 hover:bg-purple-500 hover:text-white text-xs font-black flex items-center gap-1 border border-purple-500/30">
            💡 Traduzir Gen Z
          </button>
        </div>
      )}

      {/* Floating Bottom Quick Controls Bar (Chapter Nav & TTS Audio Player) Inspired by Screenshot */}
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
            title={isPlayingAudio ? 'Pausar Áudio' : 'Ouvir Narração'}
          >
            {isPlayingAudio ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
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

      {/* Fullscreen Refinement Chat Panel (Borda Infinita) */}
      <AnimatePresence>
        {isPanelOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/40">
              <button
                onClick={() => setIsPanelOpen(false)}
                className="flex items-center gap-2 text-cyan-400 hover:text-white text-sm font-bold"
              >
                <ArrowLeft className="w-4 h-4" /> Voltar para a Bíblia
              </button>
              <h3 className="text-base font-extrabold text-white">{panelTitle}</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-6 max-w-3xl w-full mx-auto space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border-l-4 border-l-purple-500 border border-white/5 text-xs text-slate-400 leading-relaxed">
                <strong>{selectedVerseRef}</strong> — "{selectedVerseText}"
              </div>

              {chatMessages.map((msg, index) => {
                if (index === 0 && msg.role === 'user') return null;
                return (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-purple-600 text-white rounded-br-none shadow-lg'
                          : 'bg-slate-900 border border-white/10 text-slate-200 rounded-bl-none'
                      }`}
                    >
                      <div className="font-extrabold text-[10px] uppercase tracking-wider mb-1 text-cyan-400">
                        {msg.role === 'user' ? 'Você' : 'Teólogo IA'}
                      </div>
                      <div
                        className="prose prose-invert max-w-none text-xs sm:text-sm"
                        dangerouslySetInnerHTML={{ __html: marked.parse(msg.content || '') }}
                      />
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-slate-400 text-xs flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin text-purple-400" />
                    <span>Processando sabedoria teológica para jovens...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-slate-900/90 max-w-3xl w-full mx-auto">
              <form onSubmit={handleSendChatRefine} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Peça mais detalhes, mude a vibe ou altere a resposta..."
                  className="flex-1 bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  disabled={isLoading || !chatInput.trim()}
                  className="px-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-sm flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
