import React, { useState } from 'react';
import { Search, Send, ArrowLeft, MessageSquare, RefreshCw, Mic, Sparkles, BookOpen } from 'lucide-react';
import { marked } from 'marked';
import { mentorChatAI } from '../services/aiService.js';
import { sanitizeHtml } from '../services/securityService.js';
import MentorCard from './mentorship/MentorCard.jsx';

export default function MentorshipRoom({ onDeductCredit, userCredits, config, onOpenSettings, onStartVoiceChat }) {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mentors = [
    {
      id: 'lewis',
      initials: 'CS',
      name: 'C.S. Lewis',
      era: 'Século XX',
      category: 'Apologética',
      title: 'Apologética & Razão Cristã',
      bio: 'Professor em Oxford e autor clássico. Especialista em responder dúvidas intelectuais com analogias profundas e clareza lógica.',
      works: ['Cristianismo Puro e Simples', 'O Peso da Glória'],
      color: 'border-cyan-400/40 text-cyan-300 bg-cyan-950/40',
      avatarBg: 'from-cyan-600 to-blue-800',
      topics: ['Ceticismo', 'Razão & Fé', 'Identidade'],
      starterQuestion: 'Como explicar a fé cristã com lógica para quem tem dúvidas intelectuais?',
      quickPrompts: [
        'Como responder ao problema do sofrimento?',
        'Qual a diferença entre orgulho e humildade cristã?',
        'Me dê uma analogia para explicar a Graça.'
      ],
      promptPersona: "Avatar teológico de C.S. Lewis. Pensamento moldado por 'Cristianismo Puro e Simples'. Use apologética afiada, lógica brilhante, humildade acadêmica e analogias claras."
    },
    {
      id: 'spurgeon',
      initials: 'CS',
      name: 'Charles Spurgeon',
      era: 'Século XIX',
      category: 'Pregação',
      title: 'O Príncipe dos Pregadores',
      bio: 'Mestre da exposição bíblica cristocêntrica e do cuidado pastoral. Ideal para estruturar sermões que tocam o coração.',
      works: ['Lições aos meus Alunos', 'Sermões do Tabernáculo'],
      color: 'border-purple-400/40 text-purple-300 bg-purple-950/40',
      avatarBg: 'from-purple-600 to-indigo-800',
      topics: ['Homilética', 'Oração', 'Graça Abundante'],
      starterQuestion: 'Como pregar um sermão expositivo que mantenha Cristo no centro?',
      quickPrompts: [
        'Como vencer o desânimo no ministério?',
        'Como usar ilustrações eficazes na pregação?',
        'Como preparar o coração antes de subir ao púlpito?'
      ],
      promptPersona: "Avatar teológico de Charles Spurgeon. Paixão pastoral intensa, foco na graça de Deus, linguagem eloquente e encorajamento prático para pregadores e professores."
    },
    {
      id: 'bonhoeffer',
      initials: 'DB',
      name: 'Dietrich Bonhoeffer',
      era: 'Século XX',
      category: 'Discipulado',
      title: 'Discipulado & Comunidade',
      bio: 'Pastor e teólogo alemão. Focado na graça preciosa, na formação de discípulos autênticos e na vida cristã em comunidade.',
      works: ['Discipulado', 'Vida em Comunidade'],
      color: 'border-amber-400/40 text-amber-300 bg-amber-950/40',
      avatarBg: 'from-amber-600 to-orange-800',
      topics: ['Graça Preciosa', 'Comunidade', 'Ética Cristã'],
      starterQuestion: 'Qual a diferença prática entre a graça barata e a graça preciosa no discipulado?',
      quickPrompts: [
        'Como cultivar comunhão verdadeira em pequenos grupos?',
        'O que significa carregar a cruz no cotidiano?',
        'Como desenvolver disciplina de oração e estudo bíblico?'
      ],
      promptPersona: "Avatar teológico de Dietrich Bonhoeffer. Ética cristã profunda, centralidade de Cristo, distinção entre graça barata e graça preciosa, e vida em comunidade."
    },
    {
      id: 'augustine',
      initials: 'AH',
      name: 'Agostinho de Hipona',
      era: 'Século IV',
      category: 'Teologia',
      title: 'Teologia da Graça & Interioridade',
      bio: 'Um dos maiores doutores da Igreja. Ajuda a compreender os desejos do coração humano e a soberania da graça divina.',
      works: ['Confissões', 'A Doutrina Cristã'],
      color: 'border-emerald-400/40 text-emerald-300 bg-emerald-950/40',
      avatarBg: 'from-emerald-600 to-teal-800',
      topics: ['Desejos do Coração', 'Doutrina Bíblica', 'Graça'],
      starterQuestion: 'Por que o coração humano vive inquieto até descansar em Deus?',
      quickPrompts: [
        'Como interpretar passagens difíceis das Escrituras?',
        'Como ordenar nossos amores e prioridades segundo Deus?',
        'Qual o papel da humildade no ensino bíblico?'
      ],
      promptPersona: "Avatar teológico de Agostinho de Hipona, autor de Confissões e A Doutrina Cristã. Sabedoria patrística, profundidade espiritual e foco no amor de Deus."
    },
    {
      id: 'wesley',
      initials: 'JW',
      name: 'João Wesley',
      era: 'Século XVIII',
      category: 'Liderança',
      title: 'Santidade, Ensino & Pequenos Grupos',
      bio: 'Organizador de classes de discipulado e pregador incansável. Mestre em estruturar o crescimento espiritual prático.',
      works: ['Sermões de Wesley', 'Diário Espiritual'],
      color: 'border-rose-400/40 text-rose-300 bg-rose-950/40',
      avatarBg: 'from-rose-600 to-pink-800',
      topics: ['Santificação', 'Células & Classes', 'Disciplina'],
      starterQuestion: 'Como organizar pequenos grupos que geram transformação real de vida?',
      quickPrompts: [
        'Quais são os meios de graça essenciais para o cristão?',
        'Como unir fervor espiritual e estudo metódico da Bíblia?',
        'Como acompanhar novos convertidos no discipulado?'
      ],
      promptPersona: "Avatar teológico de João Wesley. Foco em santidade prática, amor a Deus e ao próximo, método de estudo bíblico e liderança de pequenos grupos."
    },
    {
      id: 'graham',
      initials: 'BG',
      name: 'Billy Graham',
      era: 'Século XX',
      category: 'Pregação',
      title: 'Comunicação Clara & Evangelismo',
      bio: 'Comunicador global do Evangelho. Ensina como transmitir a mensagem bíblica com simplicidade, autoridade ("A Bíblia diz") e apelo claro.',
      works: ['Paz com Deus', 'O Poder da Cruz'],
      color: 'border-indigo-400/40 text-indigo-300 bg-indigo-950/40',
      avatarBg: 'from-indigo-600 to-violet-800',
      topics: ['Evangelismo', 'Clareza no Púlpito', 'A Bíblia Diz'],
      starterQuestion: 'Como comunicar a mensagem da Cruz de forma simples, direta e transformadora?',
      quickPrompts: [
        'Como fazer um apelo claro e respeitoso ao final da mensagem?',
        'Como manter o foco na autoridade das Escrituras?',
        'Como pregar para pessoas que nunca leram a Bíblia?'
      ],
      promptPersona: "Avatar teológico de Billy Graham. Comunicação cristocêntrica, direta, acolhedora e fundamentada na autoridade de 'A Bíblia diz'."
    }
  ];

  const categories = ['Todos', 'Pregação', 'Apologética', 'Discipulado', 'Teologia', 'Liderança'];

  const filteredMentors = mentors.filter((m) => {
    const matchesCategory = selectedCategory === 'Todos' || m.category === selectedCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSelectMentor = (mentor) => {
    setSelectedMentor(mentor);
    setChatMessages([
      {
        role: 'assistant',
        content: `Graça e paz! Sou o mentor teológico inspirado em **${mentor.name}** (*${mentor.title}*). Em que tema bíblico, esboço de ensino ou desafio ministerial posso cooperar com você hoje?`
      }
    ]);
  };

  const sendQuestionToMentor = async (mentorObj, questionText, existingHistory) => {
    if (!questionText.trim() || isLoading) return;

    if (userCredits <= 0) {
      alert("Raios insuficientes para consultar os mentores!");
      return;
    }

    const newHistory = [...existingHistory, { role: 'user', content: questionText }];
    setChatMessages(newHistory);
    setIsLoading(true);

    try {
      const aiReply = await mentorChatAI({
        mentor: mentorObj,
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

  const handleSelectQuickQuestion = (mentor, question) => {
    const initialGreeting = [
      {
        role: 'assistant',
        content: `Graça e paz! Sou o mentor teológico inspirado em **${mentor.name}** (*${mentor.title}*). Vamos aprofundar esse estudo juntos.`
      }
    ];
    setSelectedMentor(mentor);
    sendQuestionToMentor(mentor, question, initialGreeting);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;
    const q = userInput;
    setUserInput('');
    await sendQuestionToMentor(selectedMentor, q, chatMessages);
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-40">
      {selectedMentor ? (
        <div className="fixed inset-0 z-[100] sm:static sm:z-auto h-dvh sm:h-[680px] bg-[#0B0E14] sm:bg-[#0F172A] sm:border sm:border-slate-800/80 sm:rounded-2xl flex flex-col justify-between shadow-2xl overflow-hidden pt-safe pb-safe">
          {/* Header Chat */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 px-4 py-3 sm:p-4 bg-slate-950/90 sm:bg-transparent shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setSelectedMentor(null)}
                aria-label="Voltar para lista de mentores"
                className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all flex items-center justify-center border border-slate-700/60 shrink-0 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedMentor.avatarBg} flex items-center justify-center font-black text-white text-sm shadow-md border ${selectedMentor.color} shrink-0`}>
                {selectedMentor.initials || selectedMentor.name.charAt(0)}
              </div>

              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-black text-white tracking-tight truncate">{selectedMentor.name}</h3>
                <p className="text-[11px] text-purple-300 font-semibold truncate">{selectedMentor.title}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onStartVoiceChat && onStartVoiceChat(selectedMentor)}
              className="min-h-[38px] px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <Mic className="w-3.5 h-3.5 text-cyan-200" />
              <span>Mentoria Voz</span>
            </button>
          </div>

          {/* Quick Study Prompts Bar */}
          {selectedMentor.quickPrompts && (
            <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto scrollbar-none no-scrollbar shrink-0">
              <span className="text-[10px] font-extrabold uppercase text-cyan-400 shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Sugestões:
              </span>
              {selectedMentor.quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={isLoading}
                  onClick={() => sendQuestionToMentor(selectedMentor, prompt, chatMessages)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white whitespace-nowrap transition-all cursor-pointer shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Messages Scroll Container */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 sm:gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${selectedMentor.avatarBg} flex items-center justify-center font-bold text-white text-xs shrink-0 mt-1 shadow`}>
                    {selectedMentor.initials || selectedMentor.name.charAt(0)}
                  </div>
                )}

                <div
                  className={`max-w-[86%] sm:max-w-[75%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none shadow-lg shadow-purple-950/40'
                      : 'bg-slate-900/95 border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <div className="font-extrabold text-[10px] uppercase tracking-wider mb-1 opacity-75">
                    {msg.role === 'user' ? 'Você' : selectedMentor.name}
                  </div>
                  <div
                    className="prose prose-invert max-w-none text-xs sm:text-sm break-words"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(marked.parse(msg.content || '')) }}
                  />
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/95 border border-slate-800 text-slate-300 text-xs flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-400 shrink-0" />
                  <span>{selectedMentor.name} está elaborando a orientação teológica...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Chat Bar */}
          <form onSubmit={handleSendMessage} className="flex gap-2 p-3 sm:p-4 border-t border-slate-800/80 bg-slate-950/90 sm:bg-transparent shrink-0">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={`Peça um estudo ou conselho a ${selectedMentor.name}...`}
              className="flex-1 min-h-[48px] bg-slate-900/90 sm:bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              aria-label="Enviar mensagem"
              className="min-h-[48px] min-w-[48px] px-4 sm:px-5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm transition-all disabled:opacity-50 flex items-center justify-center shadow-lg shadow-purple-950/50 cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Header & Search & Category Filter */}
          <div className="bg-[#0F172A] border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-cyan-400 font-extrabold text-[11px] tracking-widest uppercase mb-0.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Mentoria Teológica & Ministerial</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Conselho dos Gigantes da Fé
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Estude teologia, homilética e liderança conversando por texto ou voz com grandes mestres da história cristã.
                </p>
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar mentor ou tema..."
                  className="w-full min-h-[42px] bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none no-scrollbar pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-950/80 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Responsive Mentor Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onSelectText={handleSelectMentor}
                onSelectVoice={(m) => onStartVoiceChat && onStartVoiceChat(m)}
                onSelectQuickQuestion={handleSelectQuickQuestion}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
