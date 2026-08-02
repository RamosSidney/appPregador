import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, ArrowLeft, MessageSquare, BookOpen, Sparkles, User, RefreshCw } from 'lucide-react';
import { marked } from 'marked';
import { mentorChatAI } from '../services/aiService.js';

export default function MentorshipRoom({ onDeductCredit, userCredits, config, onOpenSettings }) {
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
      color: 'border-cyan-400 text-cyan-400 bg-cyan-500/10',
      avatarBg: 'from-cyan-600 to-blue-800',
      topics: ['Ceticismo', 'Orgulho & Comparação', 'Alegria Profunda'],
      promptPersona: "Avatar teológico de C.S. Lewis. Pensamento moldado por 'Cristianismo Puro e Simples'. Use apologética afiada, lógica brilhante e analogias."
    },
    {
      id: 'spurgeon',
      name: 'Charles Spurgeon',
      title: 'O Príncipe dos Pregadores',
      works: ['Lições aos meus Alunos', 'Sermões do Tabernáculo'],
      color: 'border-purple-400 text-purple-400 bg-purple-500/10',
      avatarBg: 'from-purple-600 to-indigo-800',
      topics: ['Desânimo Pastoral', 'Graça Abundante', 'Paixão pelas Almas'],
      promptPersona: "Avatar teológico de Charles Spurgeon. Paixão pastoral intensa, foco na graça de Deus e encorajamento prático para pregadores."
    },
    {
      id: 'bonhoeffer',
      name: 'Dietrich Bonhoeffer',
      title: 'Ética & Discipulado Radical',
      works: ['Discipulado', 'Vida em Comunidade'],
      color: 'border-amber-400 text-amber-400 bg-amber-500/10',
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
    <div className="space-y-6 pb-safe-dock">
      {/* If Mentor is Selected: Chat Interface */}
      {selectedMentor ? (
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4">
          {/* Header Chat */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedMentor(null)}
                className="p-2 rounded-xl bg-slate-950/60 border border-white/10 text-slate-400 hover:text-white transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedMentor.avatarBg} flex items-center justify-center font-black text-white text-base shadow-md border ${selectedMentor.color}`}>
                {selectedMentor.name.charAt(0)}
              </div>

              <div>
                <h3 className="text-base font-extrabold text-white">{selectedMentor.name}</h3>
                <p className="text-xs text-slate-400">{selectedMentor.title}</p>
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border ${selectedMentor.color}`}>
              Mentor Conectado
            </span>
          </div>

          {/* Messages Scroll Container */}
          <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 py-2">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${selectedMentor.avatarBg} flex items-center justify-center font-bold text-white text-xs shrink-0 mt-1`}>
                    {selectedMentor.name.charAt(0)}
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none shadow-lg shadow-purple-950/40'
                      : 'bg-slate-950/80 border border-white/10 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <div className="font-extrabold text-[10px] uppercase tracking-wider mb-1 opacity-70">
                    {msg.role === 'user' ? 'Você' : selectedMentor.name}
                  </div>
                  <div
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: marked.parse(msg.content || '') }}
                  />
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-slate-400 text-xs flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                  <span>{selectedMentor.name} está consultando seu acervo bibliográfico...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Chat */}
          <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-white/10">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={`Pergunte algo para ${selectedMentor.name}...`}
              className="flex-1 bg-slate-950/70 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="px-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-sm transition-all disabled:opacity-50 flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        /* Mentor List Grid */
        <div className="space-y-6">
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs tracking-widest uppercase mb-1">
                <MessageSquare className="w-4 h-4" />
                <span>Sala de Mentoria Histórica</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Conselhos dos Gigantes da Fé
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar mentor ou tema..."
                className="w-full bg-slate-950/70 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>
          </div>

          {/* 3-Column Desktop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <motion.div
                key={mentor.id}
                whileHover={{ y: -4 }}
                className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 flex flex-col justify-between glass-panel-hover"
              >
                <div className="space-y-4">
                  {/* Avatar & Title */}
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mentor.avatarBg} flex items-center justify-center font-black text-white text-xl shadow-lg border-2 ${mentor.color}`}>
                      {mentor.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-white">{mentor.name}</h3>
                      <p className="text-xs text-slate-400 font-medium">{mentor.title}</p>
                    </div>
                  </div>

                  {/* Works */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Obras Base</span>
                    <div className="flex flex-wrap gap-1">
                      {mentor.works.map((w, idx) => (
                        <span key={idx} className="text-[10px] font-bold text-slate-300 bg-slate-950/60 px-2 py-0.5 rounded border border-white/5">
                          📖 {w}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Topic Chips */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Foco de Conselho</span>
                    <div className="flex flex-wrap gap-1.5">
                      {mentor.topics.map((t, idx) => (
                        <span key={idx} className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border ${mentor.color}`}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectMentor(mentor)}
                  className="w-full mt-6 py-3 rounded-xl bg-slate-950/80 hover:bg-purple-600 text-white font-extrabold text-xs uppercase tracking-wider border border-white/10 hover:border-purple-400 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Consultar {mentor.name.split(' ')[0]}</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
