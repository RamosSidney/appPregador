import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mic, BookOpen, Hash } from 'lucide-react';
import Badge from '../common/Badge';

/**
 * MentorCard Component
 * Displays a historical mentor card with clear scannability, layered dark surface,
 * badge chips, micro-interactions, and accessible 48px touch targets.
 */
export default function MentorCard({ mentor, onSelectText, onSelectVoice }) {
  const getVariant = (id) => {
    if (id === 'lewis') return 'cyan';
    if (id === 'spurgeon') return 'purple';
    if (id === 'bonhoeffer') return 'amber';
    return 'default';
  };

  const variant = getVariant(mentor.id);

  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group relative bg-[#0F172A] hover:bg-[#1E293B] border border-slate-800/80 hover:border-slate-700/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-purple-950/30 transition-all duration-300"
    >
      {/* Top Ambient Glow Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

      <div className="space-y-5">
        {/* Mentor Identity Header */}
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mentor.avatarBg} flex items-center justify-center font-black text-white text-xl shadow-lg border-2 ${mentor.color} shrink-0`}
            aria-hidden="true"
          >
            {mentor.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-black text-slate-100 tracking-tight truncate group-hover:text-white transition-colors">
              {mentor.name}
            </h3>
            <p className="text-xs font-medium text-slate-400 truncate">
              {mentor.title}
            </p>
          </div>
        </div>

        {/* Base Works Section */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            Obras Base
          </span>
          <div className="flex flex-wrap gap-1.5">
            {mentor.works.map((work, idx) => (
              <Badge key={idx} variant="ghost" className="text-[11px]">
                {work}
              </Badge>
            ))}
          </div>
        </div>

        {/* Topics & Hashtags Section */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
            <Hash className="w-3.5 h-3.5 text-slate-400" />
            Foco de Conselho
          </span>
          <div className="flex flex-wrap gap-1.5">
            {mentor.topics.map((topic, idx) => (
              <Badge key={idx} variant={variant} className="text-[11px]">
                #{topic}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons Row with 48px Touch Targets */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3">
        {/* TEXTO Action Button (Ghost / Secondary) */}
        <button
          type="button"
          onClick={() => onSelectText(mentor)}
          aria-label={`Conversar em texto com ${mentor.name}`}
          className="min-h-[48px] px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white font-extrabold text-xs tracking-wider uppercase border border-slate-700/80 hover:border-slate-600 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
        >
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Texto</span>
        </button>

        {/* VOZ AI Action Button (Primary Gradient) */}
        <button
          type="button"
          onClick={() => onSelectVoice(mentor)}
          aria-label={`Iniciar conversa por voz com ${mentor.name}`}
          className="min-h-[48px] px-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-black text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-950/50 hover:shadow-purple-900/70 active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
        >
          <Mic className="w-4 h-4 shrink-0 text-cyan-200" />
          <span>Voz AI</span>
        </button>
      </div>
    </motion.article>
  );
}
