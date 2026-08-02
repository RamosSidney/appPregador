import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Zap, Lock, CheckCircle2, BookOpen, X, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RPGLeaderAcademy({ userLevel, userXp, onAddXp, onAddCredits }) {
  const [activeLessonModal, setActiveLessonModal] = useState(null); // null or lesson object
  const [completedLessons, setCompletedLessons] = useState([1]); // Lesson 1 is completed by default

  const maxXp = 500;
  const xpPercent = Math.min(100, Math.max(0, (userXp / maxXp) * 100));

  const lessons = [
    {
      id: 1,
      title: 'Lição 1.1: Ansiedade & Dopamina nas Redes',
      category: 'Módulo 1: Conexão Cultural',
      xp: 50,
      unlocked: true,
      content: `
        <h3>📱 O Sistema de Dopamina Gen Z</h3>
        <p>A Geração Z e Alpha são bombardeadas por micro-vídeos (TikTok, Reels, Shorts) que induzem disparos rápidos de dopamina no cérebro. Esse fluxo de recompensas instantâneas treinou a mente jovem a perder o foco em discursos lineares longos.</p>
        <blockquote>"Não vos conformeis com este mundo, mas transformai-vos pela renovação da vossa mente..." (Romanos 12:2)</blockquote>
        <p><strong>A Regra de Palco:</strong> Ao pregar para adolescentes, você não pode começar com um sermão teológico complexo de 40 minutos sem ganchos. Você precisa reter a atenção deles nos primeiros 3 segundos (Gancho Cultural) e então aprofundar na mensagem de Cristo de forma prática e objetiva.</p>
      `
    },
    {
      id: 2,
      title: 'Lição 1.2: Glitches de Identidade Digital',
      category: 'Módulo 1: Conexão Cultural',
      xp: 50,
      unlocked: true,
      content: `
        <h3>🧬 As Skins do Avatar Digital</h3>
        <p>Adolescentes costumam usar avatares e 'skins' virtuais para fingirem ser perfeitos, escondendo inseguranças e vulnerabilidades. Isso gera crises de autoimagem e solidão offline.</p>
        <blockquote>"Antes que te formasse no ventre te conheci..." (Jeremias 1:5)</blockquote>
        <p><strong>A Aplicação Prática:</strong> Ensine a seus liderados que o valor deles não depende de curtidas ou comentários. Use dinâmicas de conexão offline na sua célula para quebrar as barreiras e permitir conversas vulneráveis onde eles possam tirar a máscara digital e serem aceitos de verdade.</p>
      `
    },
    {
      id: 3,
      title: 'Lição 2.1: Postura Sem Ruídos Físicos',
      category: 'Módulo 2: Oratória & Palco',
      xp: 50,
      unlocked: true,
      content: `
        <h3>🗣️ Linguagem Corporal no Púlpito</h3>
        <p>A oratória não se resume às palavras faladas. Mais de 50% da retenção visual vem da postura corporal do comunicador. Ruídos de palco, como andar em zigue-zague ou gesticular sem controle, desviam o foco da mensagem.</p>
        <p><strong>Dicas de Ouro:</strong><br/>
        1. Fixe seus pés firme no solo em posição aberta e confortável.<br/>
        2. Mantenha os braços acima da linha da cintura e use gestos amplos e abertos para convites.<br/>
        3. Olhe nos olhos das pessoas nas diferentes seções da igreja.</p>
      `
    },
    {
      id: 4,
      title: 'Lição 2.2: O Tom da Graça no Púlpito',
      category: 'Módulo 2: Oratória & Palco',
      xp: 50,
      unlocked: false,
      content: `
        <h3>🎵 Vulnerabilidade e Ritmo Vocal</h3>
        <p>O tom de voz dita a atmosfera. Pregações que soam como palestras rígidas não geram conversão na juventude hyper-conectada, que valoriza a autenticidade acima de tudo.</p>
        <p>Use o silêncio estratégico após perguntas difíceis. Fale de seus próprios erros. Compartilhar suas próprias fraquezas no palco cria um elo de conexão inestimável.</p>
      `
    },
    {
      id: 5,
      title: 'Lição 3.1: Liderança Teológica Proativa',
      category: 'Módulo 3: Liderança Avançada',
      xp: 100,
      unlocked: false,
      content: `
        <h3>🛡️ Formação de Novos Líderes</h3>
        <p>Como multiplicar a célula formando assistentes e discipuladores proativos.</p>
      `
    }
  ];

  const handleCompleteLesson = (lesson) => {
    if (!completedLessons.includes(lesson.id)) {
      setCompletedLessons([...completedLessons, lesson.id]);
      onAddXp(lesson.xp);
      onAddCredits(5);

      // Trigger Confetti effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    setActiveLessonModal(null);
  };

  return (
    <div className="space-y-6 pb-safe-dock">
      {/* Hero Card de XP & Nível */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/60 to-slate-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 fill-current" />
                LÍDER NÍVEL {userLevel}
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-extrabold text-xs flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                +5 Raios bônus por Lição
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Academia RPG de Comunicadores
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Complete as missões de micro-capacitação, acumule XP e desbloqueie créditos de IA.
            </p>
          </div>

          {/* XP Thick Relucent Progress Bar */}
          <div className="w-full sm:w-64 bg-slate-950/80 border border-white/10 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-purple-400 flex items-center gap-1">
                <Award className="w-4 h-4" /> PROGRESSO XP
              </span>
              <span className="text-amber-400">{userXp} / {maxXp} XP</span>
            </div>
            <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-amber-400 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Active Track Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-purple-400 tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          <span>Trilha Ativa: Comunicação Disruptiva & Oratória</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isUnlocked = lesson.unlocked || isCompleted;

            return (
              <motion.div
                key={lesson.id}
                whileHover={isUnlocked ? { scale: 1.01 } : {}}
                onClick={() => isUnlocked && setActiveLessonModal(lesson)}
                className={`p-5 rounded-2xl border transition-all duration-200 ${
                  isUnlocked
                    ? 'bg-slate-900/70 border-white/10 hover:border-purple-500/40 cursor-pointer shadow-lg glass-panel-hover'
                    : 'bg-slate-950/40 border-white/5 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400">
                      {lesson.category}
                    </span>
                    <h4 className="text-sm font-extrabold text-white">{lesson.title}</h4>
                  </div>

                  {isCompleted ? (
                    <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 text-xs font-bold shrink-0">
                      <CheckCircle2 className="w-4 h-4" /> Concluído
                    </span>
                  ) : isUnlocked ? (
                    <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-md shrink-0 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 fill-current" /> +{lesson.xp} XP
                    </span>
                  ) : (
                    <span className="p-2 rounded-xl bg-slate-800 text-slate-500 border border-white/5 shrink-0">
                      <Lock className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lesson Reader Modal */}
      <AnimatePresence>
        {activeLessonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-extrabold text-purple-400 uppercase tracking-widest">
                    {activeLessonModal.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-1">{activeLessonModal.title}</h3>
                </div>
                <button
                  onClick={() => setActiveLessonModal(null)}
                  className="p-2 rounded-xl bg-slate-950 border border-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div
                className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: activeLessonModal.content }}
              />

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  onClick={() => handleCompleteLesson(activeLessonModal)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Concluir Lição (+{activeLessonModal.xp} XP & +5 Raios)</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
