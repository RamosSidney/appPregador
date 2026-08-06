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
    <div className="fixed bottom-3 left-0 right-0 z-50 px-3 sm:px-4 pointer-events-none flex justify-center">
      <nav
        role="tablist"
        aria-label="Navegação Principal do App"
        className="pointer-events-auto flex items-center justify-around gap-1 sm:gap-2 p-1.5 rounded-2xl bg-[#0F172A]/90 backdrop-blur-2xl border border-slate-800/90 shadow-2xl shadow-purple-950/60 max-w-lg w-full"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-label={`Acessar aba ${tab.label}`}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center min-h-[48px] px-2.5 sm:px-4 rounded-xl transition-all duration-200 group flex-1 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none ${
                isActive ? 'text-white font-black' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/40 via-indigo-600/30 to-cyan-500/40 border border-purple-400/40 shadow-lg shadow-purple-950/50"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center gap-1 py-1">
                <Icon
                  className={`w-5 h-5 transition-all duration-200 ${
                    isActive
                      ? 'scale-110 text-amber-300 drop-shadow-[0_0_10px_rgba(252,211,77,0.8)]'
                      : 'group-hover:scale-105 text-slate-400 group-hover:text-slate-200'
                  }`}
                  aria-hidden="true"
                />
                <span className={`text-[10px] sm:text-xs tracking-tight transition-colors ${
                  isActive ? 'font-black text-white' : 'font-semibold text-slate-400'
                }`}>
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
