import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Play,
  CheckCircle2,
  Award,
  Search,
  Sparkles,
  BookOpen,
  Clock,
  Zap,
  Trophy,
  ChevronRight,
  Film
} from 'lucide-react';
import { ACADEMY_TRAILS } from '../data/academyData';
import ModuleContentModal from './rpg/ModuleContentModal';
import QuizRunner from './rpg/QuizRunner';

const SERIES_COVERS = [
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80'
];

export default function RPGLeaderAcademy({
  userLevel,
  userXp,
  onAddXp,
  onAddCredits,
  onLessonStateChange
}) {
  const [activeModuleReader, setActiveModuleReader] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [featuredTrailIndex, setFeaturedTrailIndex] = useState(0);

  useEffect(() => {
    if (onLessonStateChange) {
      onLessonStateChange(!!activeModuleReader || !!activeQuiz);
    }
  }, [activeModuleReader, activeQuiz, onLessonStateChange]);

  const [completedModules, setCompletedModules] = useState(() => {
    try {
      const saved = localStorage.getItem('app_pregador_completed_modules');
      return saved ? JSON.parse(saved) : ['ga-mod-1'];
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

  useEffect(() => {
    localStorage.setItem('app_pregador_completed_modules', JSON.stringify(completedModules));
  }, [completedModules]);

  useEffect(() => {
    localStorage.setItem('app_pregador_completed_boss_fights', JSON.stringify(completedBossFights));
  }, [completedBossFights]);

  const categories = ['Todas', ...new Set(ACADEMY_TRAILS.map(t => t.category))];

  const handleOpenModule = (mod, trailObj) => {
    const isCompleted = completedModules.includes(mod.id);
    setActiveModuleReader({
      module: mod,
      trail: trailObj,
      isUnlocked: true,
      isCompleted
    });
  };

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

  const handleOpenModuleQuiz = (mod) => {
    setActiveQuiz({
      title: mod.title,
      questions: mod.quiz,
      xpReward: mod.xp || 50,
      isBossFight: false,
      targetId: mod.id
    });
  };

  const handleOpenBossFight = (trail) => {
    setActiveQuiz({
      title: `Certificação da Série: ${trail.title}`,
      questions: trail.bossFight,
      xpReward: 100,
      isBossFight: true,
      targetId: trail.id
    });
  };

  const handleQuizCompleted = ({ xpEarned, isBossFight }) => {
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

  const totalModulesCount = ACADEMY_TRAILS.reduce((acc, t) => acc + t.modules.length, 0);
  const completedModulesCount = completedModules.length;

  const filteredTrails = ACADEMY_TRAILS.filter(trail => {
    const matchesCategory = selectedCategory === 'Todas' || trail.category === selectedCategory;
    const matchesSearch =
      trail.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trail.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trail.modules.some(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredTrail = ACADEMY_TRAILS[featuredTrailIndex] || ACADEMY_TRAILS[0];
  const nextEpisode =
    featuredTrail.modules.find(m => !completedModules.includes(m.id)) || featuredTrail.modules[0];

  return (
    <div className="w-full min-h-screen bg-[#0B0E14] text-slate-100 border-none p-0 flex flex-col selection:bg-purple-500 pb-40">
      {/* NETFLIX-STYLE HERO FEATURED BANNER */}
      <div className="relative w-full overflow-hidden border-b border-white/10">
        {/* Background Cover Image + Gradient Vignette */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 scale-105 transition-all duration-700"
          style={{
            backgroundImage: `url(${SERIES_COVERS[featuredTrailIndex % SERIES_COVERS.length]})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E14] via-[#0B0E14]/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-8 sm:pt-12 sm:pb-12 flex flex-col justify-end">
          {/* Top Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow">
              <Film className="w-3 h-3" /> SÉRIE ORIGINAL
            </span>
            <span className="text-xs font-extrabold text-emerald-400">
              99% Relevante para Líderes
            </span>
            <span className="text-xs font-bold text-slate-300 px-2 py-0.5 rounded bg-slate-900/80 border border-white/10">
              {featuredTrail.modules.length} Episódios
            </span>
            <span className="text-xs font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-400/30">
              🏆 {completedModulesCount}/{totalModulesCount} Aulas Concluídas
            </span>
          </div>

          {/* Featured Series Title & Synopsis */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight max-w-2xl leading-tight">
            {featuredTrail.title}
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-xl mt-2 leading-relaxed">
            {featuredTrail.subtitle}. Assista e estude o próximo episódio:{' '}
            <strong className="text-cyan-300">{nextEpisode.title}</strong>.
          </p>

          {/* Netflix Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              type="button"
              onClick={() => handleOpenModule(nextEpisode, featuredTrail)}
              className="min-h-[46px] px-6 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>Assistir / Estudar Agora</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenBossFight(featuredTrail)}
              className="min-h-[46px] px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/20 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Certificação da Série (+100 XP)</span>
            </button>
          </div>

          {/* Series Switcher Dots */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto scrollbar-none no-scrollbar">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0">
              Temporadas:
            </span>
            {ACADEMY_TRAILS.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setFeaturedTrailIndex(idx)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all shrink-0 cursor-pointer ${
                  featuredTrailIndex === idx
                    ? 'bg-purple-600 text-white shadow'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                T{idx + 1}: {t.title.replace(/^Trilha \d+:\s*/i, '')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR (NETFLIX CATALOG HEADER) */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 pt-5 space-y-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/80 border border-slate-800/80 p-3 rounded-2xl">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-950/80 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar série, aula ou tema..."
              className="w-full min-h-[40px] bg-slate-950/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* NETFLIX HORIZONTAL ROWS FOR EACH TRAIL */}
        <div className="space-y-8">
          {filteredTrails.map((trail, trailIdx) => {
            const completedInTrail = trail.modules.filter(m => completedModules.includes(m.id)).length;
            const coverImg = SERIES_COVERS[trailIdx % SERIES_COVERS.length];

            return (
              <section key={trail.id} className="space-y-3">
                {/* Row Header */}
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-xl font-black text-white tracking-tight">
                        {trail.title}
                      </h2>
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
                        {completedInTrail}/{trail.modules.length} concluídos
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{trail.subtitle}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenBossFight(trail)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-300 text-xs font-extrabold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Certificação</span>
                    <span>+100 XP</span>
                  </button>
                </div>

                {/* Horizontal Episode Cards Carousel (Netflix Row) */}
                <div className="flex gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar snap-x snap-mandatory">
                  {trail.modules.map((mod, modIdx) => {
                    const isDone = completedModules.includes(mod.id);
                    return (
                      <motion.div
                        key={mod.id}
                        whileHover={{ y: -4 }}
                        onClick={() => handleOpenModule(mod, trail)}
                        className="snap-start shrink-0 w-[265px] sm:w-[300px] rounded-2xl bg-[#0F172A] border border-slate-800/90 hover:border-purple-500/50 overflow-hidden shadow-lg flex flex-col justify-between cursor-pointer group transition-all"
                      >
                        {/* 16:9 Thumbnail Header */}
                        <div className="relative h-36 w-full overflow-hidden bg-slate-950">
                          <img
                            src={coverImg}
                            alt={mod.title}
                            loading="lazy"
                            className="w-full h-full object-cover opacity-55 group-hover:scale-105 group-hover:opacity-75 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/50" />

                          {/* Top Left Episode Badge */}
                          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-black text-cyan-300 uppercase tracking-wider">
                            EP 0{modIdx + 1}
                          </span>

                          {/* Top Right Status / XP */}
                          {isDone ? (
                            <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-500/90 text-slate-950 text-[10px] font-black flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Concluído
                            </span>
                          ) : (
                            <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/75 border border-amber-400/40 text-amber-300 text-[10px] font-black">
                              +{mod.xp || 50} XP
                            </span>
                          )}

                          {/* Center Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-11 h-11 rounded-full bg-purple-600/90 group-hover:bg-purple-500 text-white flex items-center justify-center shadow-lg border border-white/30 group-hover:scale-110 transition-transform">
                              <Play className="w-5 h-5 fill-white ml-0.5" />
                            </div>
                          </div>

                          {/* Bottom Netflix Red/Purple Progress Bar */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                            <div
                              className={`h-full ${isDone ? 'w-full bg-emerald-400' : 'w-1/4 bg-purple-500'}`}
                            />
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <h3 className="text-xs sm:text-sm font-black text-white line-clamp-1 group-hover:text-purple-300 transition-colors">
                              {mod.title.replace(/^Módulo \d+:\s*/i, '')}
                            </h3>
                            <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                              {mod.subtitle}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-cyan-400" /> 8 min de estudo
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenModuleQuiz(mod);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-purple-600/30 border border-white/10 text-[10px] font-extrabold text-purple-300 hover:text-white transition-all cursor-pointer"
                            >
                              Praticar Quiz →
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Module Content Reader Modal */}
      <AnimatePresence>
        {activeModuleReader && (
          <ModuleContentModal
            module={activeModuleReader.module}
            trail={activeModuleReader.trail}
            isUnlocked={true}
            isCompleted={activeModuleReader.isCompleted}
            onClose={() => setActiveModuleReader(null)}
            onStartQuiz={handleStartModuleQuiz}
          />
        )}
      </AnimatePresence>

      {/* Interactive Quiz / Certification Runner Modal */}
      <AnimatePresence>
        {activeQuiz && (
          <QuizRunner
            title={activeQuiz.title}
            questions={activeQuiz.questions}
            xpReward={activeQuiz.xpReward}
            isBossFight={activeQuiz.isBossFight}
            onClose={() => setActiveQuiz(null)}
            onComplete={handleQuizCompleted}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
