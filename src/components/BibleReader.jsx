import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Copy, Share2, Sparkles, MessageSquare, ArrowLeft, Send, Check, X, RefreshCw } from 'lucide-react';
import { marked } from 'marked';

export default function BibleReader({ userCredits, onDeductCredit }) {
  const [bibleDatabase, setBibleDatabase] = useState(null);
  const [selectedBook, setSelectedBook] = useState('João');
  const [selectedChapter, setSelectedChapter] = useState('1');
  const [versesList, setVersesList] = useState([]);

  // Verse Selection / Highlight State
  const [selectedVerseRef, setSelectedVerseRef] = useState(null);
  const [selectedVerseText, setSelectedVerseText] = useState('');
  const [menuPosition, setMenuPosition] = useState(null); // { top, left }
  const [highlights, setHighlights] = useState(() => {
    try {
      const saved = localStorage.getItem('app_pregador_bible_highlights');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Fullscreen Refinement Chat State
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelTitle, setPanelTitle] = useState('');
  const [actionType, setActionType] = useState(''); // 'quebra-gelo' | 'traducao'
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

  // Chapter options for selected book
  const currentBookData = bibleDatabase?.find(b => b.name === selectedBook);
  const chapterOptionsCount = currentBookData?.chapters?.length || 1;

  // Handle Verse Click
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

  // Apply Highlight Color
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

  // Copy Verse
  const handleCopyVerse = () => {
    if (!selectedVerseRef || !selectedVerseText) return;
    navigator.clipboard.writeText(`"${selectedVerseText}" (${selectedVerseRef})`);
    alert("Versículo copiado! 📋");
    setMenuPosition(null);
  };

  // Share Verse
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

  // Trigger AI Action (Quebra-Gelo / Tradução)
  const handleTriggerAction = async (type) => {
    if (!selectedVerseRef) return;
    setMenuPosition(null);

    const title = type === 'quebra-gelo' ? '🎲 Quebra-Gelo Célula' : '💡 Tradução Gen Z / Alpha';
    setPanelTitle(title);
    setActionType(type);
    setIsPanelOpen(true);

    const promptUser = `Versículo: ${selectedVerseRef} -> "${selectedVerseText}"`;

    setChatMessages([
      { role: 'user', content: promptUser }
    ]);
    setIsLoading(true);

    try {
      await onDeductCredit();

      setTimeout(() => {
        let initialReply = '';
        if (type === 'quebra-gelo') {
          initialReply = `### 🎲 Dinâmica de Célula: "Reset de Cache"\n**Conexão Temática com ${selectedVerseRef}**\n\n* **Objetivo:** Mostrar como acumulamos sentimentos desnecessários na mente e como precisamos esvaziar a mente para receber o novo de Deus.\n* **Como Executar:**\n  1. Peça para cada jovem listar frustrações da semana em um papel.\n  2. Leiam ${selectedVerseRef} em voz alta.\n  3. Virar o copo ou rasgar o papel declarando o reset de firmware espiritual.\n* **Pergunta Gancho:** "Qual o maior arquivo temporário de ansiedade que você precisa desinstalar hoje?"`;
        } else {
          initialReply = `### 💡 Tradução Simplificada (Lente Gen Z / Alpha)\n**Descodificando ${selectedVerseRef}**\n\n* **Texto Original:** *"${selectedVerseText}"*\n* **Tradução para o Feed:** "Não deixe a cultura do algoritmo mundial empacotar a sua mente nos layouts prontos deles. Faça uma atualização de firmware completa com o Espírito Santo para testar o código original que é bom e perfeito."\n* **Gancho Analógico:** É como usar um template pronto do PowerPoint que todo mundo já viu. Paulo convida a criar o seu próprio design baseado no Criador.`;
        }

        setChatMessages([
          { role: 'user', content: promptUser },
          { role: 'assistant', content: initialReply }
        ]);
        setIsLoading(false);
      }, 1500);

    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  // Send Follow-up Chat Refinement
  const handleSendChatRefine = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const userText = chatInput;
    setChatInput('');

    const newHistory = [...chatMessages, { role: 'user', content: userText }];
    setChatMessages(newHistory);
    setIsLoading(true);

    try {
      await onDeductCredit();

      setTimeout(() => {
        const refineReply = `[Refinamento IA] Entendi perfeitamente sua solicitação sobre *"${userText}"*!\n\nAqui está o ajuste com linguagem mais autêntica para adolescentes:\n\n> "No dia a dia da escola e das redes, a consistência do seu testemunho digital fala mais alto do que qualquer discurso. Sem lag espiritual!"`;
        setChatMessages([...newHistory, { role: 'assistant', content: refineReply }]);
        setIsLoading(false);
      }, 1200);

    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-safe-dock relative" onClick={() => setMenuPosition(null)}>
      {/* Header Selector Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center font-bold text-white shadow-md border border-emerald-400/30">
            <BookOpen className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">Bíblia Sagrada NVI</h2>
            <p className="text-xs text-slate-400">Leitor completo com realces de cores e inteligência de pregação.</p>
          </div>
        </div>

        {/* Dropdowns de Livro e Capítulo */}
        <div className="flex items-center gap-3">
          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            className="bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-purple-500"
          >
            {bibleDatabase?.map((b) => (
              <option key={b.name} value={b.name}>{b.name}</option>
            ))}
          </select>

          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-purple-500"
          >
            {Array.from({ length: chapterOptionsCount }, (_, i) => i + 1).map((ch) => (
              <option key={ch} value={ch.toString()}>Capítulo {ch}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Verses Container Card */}
      <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
        <h3 className="text-lg font-black text-white border-b border-white/10 pb-3">
          {selectedBook} {selectedChapter}
        </h3>

        <div className="space-y-2">
          {versesList.map((verse) => {
            const ref = `${selectedBook} ${selectedChapter}:${verse.num}`;
            const highlightColor = highlights[ref];
            const isSelected = selectedVerseRef === ref;

            let highlightBg = '';
            if (highlightColor === 'green') highlightBg = 'bg-emerald-500/20 border-l-4 border-l-emerald-400 text-white';
            else if (highlightColor === 'blue') highlightBg = 'bg-cyan-500/20 border-l-4 border-l-cyan-400 text-white';
            else if (highlightColor === 'yellow') highlightBg = 'bg-amber-500/20 border-l-4 border-l-amber-400 text-white';
            else if (highlightColor === 'pink') highlightBg = 'bg-rose-500/20 border-l-4 border-l-rose-400 text-white';

            return (
              <div
                key={verse.num}
                onClick={(e) => handleVerseClick(e, verse)}
                className={`p-3 rounded-xl cursor-pointer transition-all duration-150 leading-relaxed text-sm ${
                  isSelected ? 'bg-purple-600/20 border-l-4 border-l-purple-500 text-white font-semibold' : ''
                } ${highlightBg || 'hover:bg-slate-800/60 text-slate-300'}`}
              >
                <span className="text-xs font-black text-purple-400 mr-2 select-none">
                  {verse.num}
                </span>
                <span>{verse.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Context Action Menu */}
      {menuPosition && selectedVerseRef && (
        <div
          className="fixed z-50 transform -translate-x-1/2 -translate-y-full bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl shadow-purple-950/80 flex items-center gap-2 animate-fadeIn"
          style={{ left: menuPosition.left, top: menuPosition.top }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Color Dots */}
          <div className="flex items-center gap-1.5 px-2 border-r border-white/10">
            <button onClick={() => handleApplyHighlight('green')} className="w-5 h-5 rounded-full bg-emerald-400 hover:scale-110 transition-transform" />
            <button onClick={() => handleApplyHighlight('blue')} className="w-5 h-5 rounded-full bg-cyan-400 hover:scale-110 transition-transform" />
            <button onClick={() => handleApplyHighlight('yellow')} className="w-5 h-5 rounded-full bg-amber-400 hover:scale-110 transition-transform" />
            <button onClick={() => handleApplyHighlight('pink')} className="w-5 h-5 rounded-full bg-rose-400 hover:scale-110 transition-transform" />
            <button onClick={() => handleApplyHighlight('clear')} className="w-5 h-5 rounded-full border border-white/30 text-[9px] flex items-center justify-center text-slate-400 hover:text-white">✕</button>
          </div>

          {/* Action Buttons */}
          <button onClick={handleCopyVerse} className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1">
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button onClick={handleShareVerse} className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1">
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => handleTriggerAction('quebra-gelo')} className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 text-xs font-extrabold flex items-center gap-1 border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Quebra-Gelo
          </button>
          <button onClick={() => handleTriggerAction('traducao')} className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500 hover:text-white text-xs font-extrabold flex items-center gap-1 border border-purple-500/30">
            💡 Traduzir Gen Z
          </button>
        </div>
      )}

      {/* Fullscreen Refinement Chat Panel (Borda Infinita) */}
      <AnimatePresence>
        {isPanelOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/40">
              <button
                onClick={() => setIsPanelOpen(false)}
                className="flex items-center gap-2 text-cyan-400 hover:text-white text-sm font-bold"
              >
                <ArrowLeft className="w-4 h-4" /> Voltar para a Bíblia
              </button>
              <h3 className="text-base font-extrabold text-white">{panelTitle}</h3>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-6 max-w-3xl w-full mx-auto space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border-l-4 border-l-purple-500 border border-white/5 text-xs text-slate-400 leading-relaxed">
                <strong>{selectedVerseRef}</strong> — "{selectedVerseText}"
              </div>

              {chatMessages.map((msg, index) => {
                if (index === 0 && msg.role === 'user') return null; // Skip initial context msg display
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
                    <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                    <span>Processando sabedoria teológica para jovens...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Refine Chat Input Bar Sticking at Bottom */}
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
