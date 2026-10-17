import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mic, BookOpen, MessageSquare, HelpCircle } from 'lucide-react';

export default function MentorCard({ mentor, onSelectText, onSelectVoice, onSelectQuickQuestion }) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group relative bg-[#0F172A] border border-slate-800/90 hover:border-purple-500/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="space-y-3.5">
        {/* Top Row: Avatar + Name + Era Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${mentor.avatarBg} flex flex-col items-center justify-center font-black text-white shadow-md border ${mentor.color} shrink-0`}
            >
              <span className="text-base sm:text-lg leading-none">{mentor.initials || mentor.name.charAt(0)}</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight truncate">
                  {mentor.name}
                </h3>
                {mentor.era && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/90 border border-white/10 text-cyan-400">
                    {mentor.era}
                  </span>
                )}
              </div>
              <p className="text-xs font-bold text-purple-300 truncate">
                {mentor.title}
              </p>
            </div>
          </div>
        </div>

        {/* Bio / Focus Description */}
        {mentor.bio && (
          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
            {mentor.bio}
          </p>
        )}

        {/* Base Works & Topics Compact Row */}
        <div className="space-y-2 pt-0.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 flex items-center gap-1 mr-1">
              <BookOpen className="w-3 h-3 text-amber-400" /> Obras:
            </span>
            {mentor.works.map((work, idx) => (
              <span
                key={idx}
                className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-950/80 border border-white/10 text-slate-300"
              >
                {work}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {mentor.topics.map((topic, idx) => (
              <span
                key={idx}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300"
              >
                #{topic}
              </span>
            ))}
          </div>
        </div>

        {/* 1-Click Starter Question */}
        {mentor.starterQuestion && (
          <button
            type="button"
            onClick={() => onSelectQuickQuestion ? onSelectQuickQuestion(mentor, mentor.starterQuestion) : onSelectText(mentor)}
            className="w-full text-left p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-white/10 hover:border-cyan-500/40 transition-all flex items-start gap-2 group/q cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <span className="text-[11px] text-slate-300 group-hover/q:text-white font-medium leading-snug">
              "{mentor.starterQuestion}"
            </span>
          </button>
        )}
      </div>

      {/* Action Buttons Row */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => onSelectText(mentor)}
          className="min-h-[44px] px-3 rounded-xl bg-slate-950/90 hover:bg-slate-800 text-slate-200 hover:text-white font-extrabold text-xs tracking-wide border border-white/15 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Estudar (Chat)</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectVoice(mentor)}
          className="min-h-[44px] px-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:brightness-110 text-white font-black text-xs tracking-wide transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
        >
          <Mic className="w-3.5 h-3.5 shrink-0 text-cyan-200" />
          <span>Mentoria Voz</span>
        </button>
      </div>
    </motion.article>
  );
}
