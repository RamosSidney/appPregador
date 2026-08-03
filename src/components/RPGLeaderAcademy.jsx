import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, LayoutGrid, List, Search, Sparkles, Filter, Award, CheckCircle2 } from 'lucide-react';
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
  const [activeModuleReader, setActiveModuleReader] = useState(null); // { module, trail, isUnlocked, isCompleted }
  const [activeQuiz, setActiveQuiz] = useState(null); // { title, questions, xpReward, isBossFight, targetId }

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  // Progress States (Persisted in localStorage)
  const [completedModules, setCompletedModules] = useState(() => {
    try {
      const saved = localStorage.getItem('app_pregador_completed_modules');
      return saved ? JSON.parse(saved) : ['ga-mod-1']; // First module completed by default
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

  // Categories list
  const categories = ['Todas', ...new Set(ACADEMY_TRAILS.map(t => t.category))];

  // Handler to open reading modal
  const handleOpenModule = (mod, trailObj, isUnlocked) => {
    const isCompleted = completedModules.includes(mod.id);
    setActiveModuleReader({
      module: mod,
      trail: trailObj,
      isUnlocked,
      isCompleted
    });
  };

  // Handler to start quiz from inside Module Content Modal
  const handleStartModuleQuiz = () => {
    if (!activeModuleReader) return;
    const { module } = activeModuleReader;

    setActiveModuleReader(null);
    setActiveQuiz({
      title: module.title,
      questions: module.quiz,
      xpReward: module.xp || 50,
      isBossFight: false,
      targetId: module.id
    });
  };

  // Handler to open quiz directly from Module Card
  const handleOpenModuleQuiz = (mod) => {
    setActiveQuiz({
      title: mod.title,
      questions: mod.quiz,
      xpReward: mod.xp || 50,
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

  // Filter trails by search query and category
  const filteredTrails = ACADEMY_TRAILS.filter(trail => {
    const matchesCategory = selectedCategory === 'Todas' || trail.category === selectedCategory;
    const matchesSearch =
      trail.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trail.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trail.modules.some(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-28 sm:pb-32 selection:bg-purple-500">
      {/* 3-Second Gamified Transition Loader */}
      <AnimatePresence>
        {showTransition && (
          <RPGTransitionLoader
            key="rpg-loader"
            onComplete={() => setShowTransition(false)}
          />
        )}
      </AnimatePresence>

      {/* Gamified Topbar & Stats Dashboard Header */}
      <AcademyHeader
        userLevel={userLevel}
        userXp={userXp}
        completedModulesCount={completedModulesCount}
        totalModulesCount={totalModulesCount}
        badgesCount={badgesCount}
      />

      {/* Search, Filter & Layout View Switcher Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-3 sm:p-4 rounded-2xl shadow-lg backdrop-blur-xl">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por trilha, lição ou tema (ex: Gen Z, Oratória, Storytelling)..."
            className="w-full bg-slate-950/80 border border-slate-800/90 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Categories Pills & View Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {categories.slice(0, 4).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid vs List View Mode Switcher Buttons */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Visão em Lista Accordion"
            >
              <List className="w-4 h-4" />
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Visão em Grid de Cards"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Trails Container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span>Trilhas de Aprendizado Disponíveis</span>
          </h2>
          <span className="text-xs font-bold text-slate-400">
            {filteredTrails.length} de {ACADEMY_TRAILS.length} Trilhas Exibidas
          </span>
        </div>

        {filteredTrails.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-3xl space-y-3">
            <Search className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-slate-300 text-sm font-bold">Nenhuma trilha encontrada para a sua busca.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('Todas'); }}
              className="text-xs font-extrabold text-cyan-400 underline cursor-pointer"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5' : 'space-y-4'}>
            {filteredTrails.map((trail, index) => {
              const trailIndex = ACADEMY_TRAILS.findIndex(t => t.id === trail.id);
              const isUnlocked = trailIndex === 0 || completedModules.some(mId => mId.startsWith(ACADEMY_TRAILS[trailIndex - 1].id.slice(0, 2)));

              return (
                <TrailAccordion
                  key={trail.id}
                  trail={trail}
                  completedModules={completedModules}
                  completedBossFights={completedBossFights}
                  isUnlocked={isUnlocked}
                  onOpenModule={(mod, trailObj, unlockedState) => handleOpenModule(mod, trailObj, unlockedState)}
                  onOpenQuiz={(mod) => handleOpenModuleQuiz(mod)}
                  onOpenBossFight={(trailObj) => handleOpenBossFight(trailObj)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Module Content Reader & Enriched Practical Examples Modal */}
      <AnimatePresence>
        {activeModuleReader && (
          <ModuleContentModal
            key="module-reader"
            module={activeModuleReader.module}
            trail={activeModuleReader.trail}
            isUnlocked={activeModuleReader.isUnlocked}
            isCompleted={activeModuleReader.isCompleted}
            onClose={() => setActiveModuleReader(null)}
            onStartQuiz={handleStartModuleQuiz}
          />
        )}
      </AnimatePresence>

      {/* Interactive Quiz & Boss Fight Runner Modal */}
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
