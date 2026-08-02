import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookMarked, MessageSquare, BookOpen, GraduationCap } from 'lucide-react';

export default function FloatingNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'generator', label: 'Gerador', icon: Sparkles, color: 'from-amber-400 to-purple-500' },
    { id: 'saved', label: 'Salvos', icon: BookMarked, color: 'from-purple-500 to-pink-500' },
    { id: 'mentorship', label: 'Mentoria', icon: MessageSquare, color: 'from-cyan-400 to-blue-500' },
    { id: 'bible', label: 'Bíblia', icon: BookOpen, color: 'from-emerald-400 to-teal-500' },
    { id: 'rpg', label: 'Academia', icon: GraduationCap, color: 'from-amber-400 to-orange-500' },
  ];

  return (
    <div className="fixed bottom-3 left-0 right-0 z-50 px-4 pointer-events-none flex justify-center">
      <nav className="pointer-events-auto flex items-center gap-1 sm:gap-2 p-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-950/40 max-w-lg w-full justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-2 px-3 sm:px-4 rounded-xl transition-all duration-200 group ${
                isActive ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/30 to-cyan-500/30 border border-purple-500/40"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center gap-1">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'group-hover:scale-105'
                  }`}
                />
                <span className="text-[10px] sm:text-xs font-medium tracking-tight">
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
