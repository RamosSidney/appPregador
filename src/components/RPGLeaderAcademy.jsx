import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { ACADEMY_TRAILS } from '../data/academyData';
import RPGTransitionLoader from './rpg/RPGTransitionLoader';
import AcademyHeader from './rpg/AcademyHeader';
import TrailAccordion from './rpg/TrailAccordion';
import ModuleContentModal from './rpg/ModuleContentModal';
import QuizRunner from './rpg/QuizRunner';

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

  // Handler to open quiz from Module Content Modal
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
  const completedModulesCount = completedModules.length;
  const badgesCount = completedBossFights.length;

  return (
    <div className="space-y-6 pb-28 sm:pb-32 selection:bg-purple-500">
      {/* 3-Second Transition Screen Overlay */}
      <AnimatePresence>
        {showTransition && (
          <RPGTransitionLoader
            key="rpg-loader"
            onComplete={() => setShowTransition(false)}
          />
        )}
      </AnimatePresence>

      {/* Clean Gamified Topbar & Progress Panel Header */}
      <AcademyHeader
        userLevel={userLevel}
        userXp={userXp}
        completedModulesCount={completedModulesCount}
        totalModulesCount={totalModulesCount}
        badgesCount={badgesCount}
      />

      {/* Accordion Trails Registry */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span>Trilhas de Aprendizado Disponíveis</span>
          </h2>
          <span className="text-xs font-bold text-slate-400">8 Trilhas Principais</span>
        </div>

        <div className="space-y-4">
          {ACADEMY_TRAILS.map((trail, index) => {
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
          <ModuleContentModal
            key="module-reader"
            module={activeModuleReader}
            onClose={() => setActiveModuleReader(null)}
            onStartQuiz={() => handleStartModuleQuiz(activeModuleReader)}
          />
        )}
      </AnimatePresence>

      {/* Interactive Quiz / Boss Fight Runner Modal */}
      <AnimatePresence>
        {activeQuiz && (
          <QuizRunner
            key="quiz-runner"
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
