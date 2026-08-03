import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Zap, Trophy, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';
import { ACADEMY_TRAILS } from '../data/academyData';
import RPGTransitionLoader from './rpg/RPGTransitionLoader';
import TrailAccordion from './rpg/TrailAccordion';
import ModuleReaderModal from './rpg/ModuleReaderModal';
import QuizModal from './rpg/QuizModal';

export default function RPGLeaderAcademy({ userLevel, userXp, onAddXp, onAddCredits }) {
  // 3-Second Transition State
  const [showTransition, setShowTransition] = useState(true);

  // Active Modals
  const [activeModuleReader, setActiveModuleReader] = useState(null); // module object
  const [activeQuiz, setActiveQuiz] = useState(null); // { title, questions, xpReward, isBossFight, targetId }

  // Progress States (Persisted in localStorage)
  const [completedModules, setCompletedModules] = useState(() => {
    try {
      const saved = localStorage.getItem('app_pregador_completed_modules');
      return saved ? JSON.parse(saved) : ['ga-mod-1']; // First module completed by default for demo
    } catch {
      return ['ga-mod-1'];
    }
  });

  const [completedBossFights, setCompletedBossFights] = useState(() => {
    try {
      const saved = localStorage.getItem('app_pregador_completed_boss_fights');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save progress to LocalStorage
  useEffect(() => {
    localStorage.setItem('app_pregador_completed_modules', JSON.stringify(completedModules));
  }, [completedModules]);

  useEffect(() => {
    localStorage.setItem('app_pregador_completed_boss_fights', JSON.stringify(completedBossFights));
  }, [completedBossFights]);

  const maxXp = 500;
  const xpPercent = Math.min(100, Math.max(0, (userXp / maxXp) * 100));

  // Handler to open quiz from Module Reader Modal
  const handleStartModuleQuiz = (mod) => {
    setActiveModuleReader(null);
    setActiveQuiz({
      title: mod.title,
      questions: mod.quiz,
      xpReward: mod.xp,
      isBossFight: false,
      targetId: mod.id
    });
  };

  // Handler to open quiz directly from Module Card
  const handleOpenModuleQuiz = (mod) => {
    setActiveQuiz({
      title: mod.title,
      questions: mod.quiz,
      xpReward: mod.xp,
      isBossFight: false,
      targetId: mod.id
    });
  };

  // Handler to open Boss Fight Quiz
  const handleOpenBossFight = (trail) => {
    setActiveQuiz({
      title: `Boss Fight: ${trail.title}`,
      questions: trail.bossFight,
      xpReward: 100,
      isBossFight: true,
      targetId: trail.id
    });
  };

  // Callback when a Quiz or Boss Fight is completed
  const handleQuizCompleted = ({ scorePercent, xpEarned, isBossFight }) => {
    if (activeQuiz) {
      if (!isBossFight) {
        if (!completedModules.includes(activeQuiz.targetId)) {
          setCompletedModules(prev => [...prev, activeQuiz.targetId]);
          onAddXp(xpEarned);
          onAddCredits(5);
        }
      } else {
        if (!completedBossFights.includes(activeQuiz.targetId)) {
          setCompletedBossFights(prev => [...prev, activeQuiz.targetId]);
          onAddXp(xpEarned);
          onAddCredits(10);
        }
      }
    }
  };

  // Calculate overall statistics
  const totalModulesCount = ACADEMY_TRAILS.reduce((acc, t) => acc + t.modules.length, 0);
  const totalCompletedModules = completedModules.length;
  const totalBadgesEarned = completedBossFights.length;

  return (
    <div className="space-y-6 pb-safe-dock selection:bg-purple-500">
      {/* 3-Second Transition Screen Overlay */}
      <AnimatePresence>
        {showTransition && (
          <RPGTransitionLoader
            key="rpg-loader"
            onComplete={() => setShowTransition(false)}
          />
        )}
      </AnimatePresence>

      {/* Gamified Hero Card */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0F172A] to-slate-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/50 relative overflow-hidden">
        {/* Background Cyber Glow Orbs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 fill-current" />
                LÍDER NÍVEL {userLevel}
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-extrabold text-xs flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                +5 Raios bônus por Módulo
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-extrabold text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {totalBadgesEarned} Insígnias Conquistadas
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Academia RPG de <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">Comunicadores</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Complete as trilhas de micro-capacitação gamificada, consolide o aprendizado com Quizzes de 10 perguntas e enfrente os Boss Fights para acumular XP e Raios de IA!
            </p>
          </div>

          {/* XP Progress Box */}
          <div className="w-full lg:w-72 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-inner">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-purple-400 flex items-center gap-1">
                <Award className="w-4 h-4" /> PROGRESSO XP
              </span>
              <span className="text-amber-400">{userXp} / {maxXp} XP</span>
            </div>
            <div className="h-3.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-amber-400 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-bold text-slate-400">
              <span>Módulos: {totalCompletedModules}/{totalModulesCount}</span>
              <span className="text-cyan-400">{Math.round((totalCompletedModules / totalModulesCount) * 100)}% Geral</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion Trails Registry */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span>Trilhas de Aprendizado Disponíveis</span>
          </h2>
          <span className="text-xs font-bold text-slate-400">8 Trilhas Principais</span>
        </div>

        <div className="space-y-4">
          {ACADEMY_TRAILS.map((trail, index) => {
            // First trail unlocked by default; subsequent trails unlock when previous trail's modules or boss fight progress
            const isUnlocked = index === 0 || completedModules.some(mId => mId.startsWith(ACADEMY_TRAILS[index - 1].id.slice(0, 2)));

            return (
              <TrailAccordion
                key={trail.id}
                trail={trail}
                completedModules={completedModules}
                completedBossFights={completedBossFights}
                isUnlocked={isUnlocked}
                onOpenModule={(mod) => setActiveModuleReader(mod)}
                onOpenQuiz={(mod) => handleOpenModuleQuiz(mod)}
                onOpenBossFight={(trailObj) => handleOpenBossFight(trailObj)}
              />
            );
          })}
        </div>
      </div>

      {/* Module Content Reader Modal */}
      <AnimatePresence>
        {activeModuleReader && (
          <ModuleReaderModal
            key="module-reader"
            module={activeModuleReader}
            onClose={() => setActiveModuleReader(null)}
            onStartQuiz={() => handleStartModuleQuiz(activeModuleReader)}
          />
        )}
      </AnimatePresence>

      {/* Interactive Quiz / Boss Fight Modal */}
      <AnimatePresence>
        {activeQuiz && (
          <QuizModal
            key="quiz-modal"
            title={activeQuiz.title}
            isBossFight={activeQuiz.isBossFight}
            questions={activeQuiz.questions}
            xpReward={activeQuiz.xpReward}
            onClose={() => setActiveQuiz(null)}
            onComplete={handleQuizCompleted}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
