import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, ArrowLeft, MessageSquare, RefreshCw } from 'lucide-react';
import { marked } from 'marked';
import { mentorChatAI } from '../services/aiService.js';
import MentorCard from './mentorship/MentorCard.jsx';

export default function MentorshipRoom({ onDeductCredit, userCredits, config, onOpenSettings, onStartVoiceChat }) {
  const [selectedMentor, setSelectedMentor] = useState(null); // null or mentor object
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mentors = [
    {
      id: 'lewis',
      name: 'C.S. Lewis',
      title: 'Apologética Imaginativa',
      works: ['Cristianismo Puro e Simples', 'O Peso da Glória'],
      color: 'border-cyan-400/40 text-cyan-300 bg-cyan-950/40',
      avatarBg: 'from-cyan-600 to-blue-800',
      topics: ['Ceticismo', 'Orgulho & Comparação', 'Alegria Profunda'],
      promptPersona: "Avatar teológico de C.S. Lewis. Pensamento moldado por 'Cristianismo Puro e Simples'. Use apologética afiada, lógica brilhante e analogias."
    },
    {
      id: 'spurgeon',
      name: 'Charles Spurgeon',
      title: 'O Príncipe dos Pregadores',
      works: ['Lições aos meus Alunos', 'Sermões do Tabernáculo'],
      color: 'border-purple-400/40 text-purple-300 bg-purple-950/40',
      avatarBg: 'from-purple-600 to-indigo-800',
      topics: ['Desânimo Pastoral', 'Graça Abundante', 'Paixão pelas Almas'],
      promptPersona: "Avatar teológico de Charles Spurgeon. Paixão pastoral intensa, foco na graça de Deus e encorajamento prático para pregadores."
    },
    {
      id: 'bonhoeffer',
      name: 'Dietrich Bonhoeffer',
      title: 'Ética & Discipulado Radical',
      works: ['Discipulado', 'Vida em Comunidade'],
      color: 'border-amber-400/40 text-amber-300 bg-amber-950/40',
      avatarBg: 'from-amber-600 to-orange-800',
      topics: ['Custo do Discipulado', 'Comunidade Autêntica', 'Coragem Moral'],
      promptPersona: "Avatar teológico de Dietrich Bonhoeffer. Ética cristã radical, centralidade de Cristo e vida em comunidade."
    }
  ];

  const filteredMentors = mentors.filter((m) => {
    const matchesName = m.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = m.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesName || matchesTopic;
  });

  const handleSelectMentor = (mentor) => {
    setSelectedMentor(mentor);
    setChatMessages([
      {
        role: 'assistant',
        content: `Saudações na graça! Sou o avatar teológico de **${mentor.name}**. Como posso auxiliar o seu ministério com conselhos e teologia prática hoje?`
      }
    ]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    if (userCredits <= 0) {
      alert("Raios insuficientes para consultar os mentores!");
      return;
    }

    const question = userInput;
    setUserInput('');
    const newHistory = [...chatMessages, { role: 'user', content: question }];
    setChatMessages(newHistory);
    setIsLoading(true);

    try {
      const aiReply = await mentorChatAI({
        mentor: selectedMentor,
        history: newHistory,
        config
      });

      await onDeductCredit();

      setChatMessages([...newHistory, { role: 'assistant', content: aiReply }]);
    } catch (err) {
      alert(err.message || "Erro ao consultar o mentor.");
      if (onOpenSettings) onOpenSettings();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* If Mentor is Selected: Chat Interface */}
      {selectedMentor ? (
        <div className="bg-[#0F172A] border border-slate-800/80 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4">
          {/* Header Chat */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedMentor(null)}
                aria-label="Voltar para lista de mentores"
                className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all flex items-center justify-center border border-slate-700/60 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${selectedMentor.avatarBg} flex items-center justify-center font-black text-white text-lg shadow-md border ${selectedMentor.color}`}>
                {selectedMentor.name.charAt(0)}
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">{selectedMentor.name}</h3>
                <p className="text-xs text-slate-400 font-medium">{selectedMentor.title}</p>
              </div>
            </div>

            <span className={`hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-bold border ${selectedMentor.color}`}>
              Mentor Conectado
            </span>
          </div>

          {/* Messages Scroll Container */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 py-2">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${selectedMentor.avatarBg} flex items-center justify-center font-bold text-white text-xs shrink-0 mt-1 shadow`}>
                    {selectedMentor.name.charAt(0)}
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none shadow-lg shadow-purple-950/40'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <div className="font-extrabold text-[10px] uppercase tracking-wider mb-1 opacity-75">
                    {msg.role === 'user' ? 'Você' : selectedMentor.name}
                  </div>
                  <div
                    className="prose prose-invert max-w-none text-xs sm:text-sm"
                    dangerouslySetInnerHTML={{ __html: marked.parse(msg.content || '') }}
                  />
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-400 text-xs flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                  <span>{selectedMentor.name} está consultando seu acervo bibliográfico...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Chat */}
          <form onSubmit={handleSendMessage} className="flex gap-2 pt-3 border-t border-slate-800/80">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={`Pergunte algo para ${selectedMentor.name}...`}
              className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all min-h-[48px]"
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              aria-label="Enviar mensagem"
              className="min-h-[48px] px-5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm transition-all disabled:opacity-50 flex items-center justify-center shadow-lg shadow-purple-950/50 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        /* Mentor List Grid: Responsive (Mobile: 1, Tablet: 2, Desktop: 3) */
        <div className="space-y-6">
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#0F172A] border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs tracking-widest uppercase mb-1">
                <MessageSquare className="w-4 h-4" />
                <span>Sala de Mentoria Histórica</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Conselhos dos Gigantes da Fé
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar mentor ou tema..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all min-h-[44px]"
              />
            </div>
          </div>

          {/* Responsive Grid: 1 col (<640px), 2 cols (640px-1024px), 3 cols (>1024px) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onSelectText={handleSelectMentor}
                onSelectVoice={(m) => onStartVoiceChat && onStartVoiceChat(m)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
