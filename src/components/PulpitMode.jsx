import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Play, Pause, RotateCcw, Type, Plus, Minus, Clock } from 'lucide-react';
import { marked } from 'marked';

export default function PulpitMode({ sermon, onClose }) {
  const [fontSize, setFontSize] = useState(32); // Font size in px
  const [speed, setSpeed] = useState(0); // 0 = Off, 1 = Slow, 2 = Normal, 3 = Fast
  const [timerSeconds, setTimerSeconds] = useState(900); // 15 mins default
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll loop
  useEffect(() => {
    if (speed === 0) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        let step = speed === 1 ? 1 : speed === 2 ? 2.5 : 4.5;
        scrollRef.current.scrollTop += step;
      }
    }, 40);

    return () => clearInterval(interval);
  }, [speed]);

  // Timer Countdown loop
  useEffect(() => {
    if (!isTimerRunning) return;

    const timer = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const formatTimer = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConfigureTimer = () => {
    if (isTimerRunning) {
      alert("Pause o cronômetro para configurar o tempo!");
      return;
    }
    const mins = prompt("Configure o tempo do sermão (em minutos):", Math.floor(timerSeconds / 60));
    if (mins) {
      const parsed = parseInt(mins, 10);
      if (!isNaN(parsed) && parsed > 0) {
        setTimerSeconds(parsed * 60);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col overflow-hidden">
      {/* Top Floating Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-950/90 border-b border-white/10 backdrop-blur-xl shrink-0">
        {/* Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-sm font-black text-amber-400 max-w-xs truncate">
            {sermon?.title || 'Modo Púlpito'}
          </h3>
        </div>

        {/* Font Size Controls */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-white/10 rounded-xl px-2 py-1">
          <Type className="w-4 h-4 text-slate-400" />
          <button
            onClick={() => setFontSize(Math.max(18, fontSize - 4))}
            className="p-1 text-slate-300 hover:text-white"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-white w-6 text-center">{fontSize}</span>
          <button
            onClick={() => setFontSize(Math.min(64, fontSize + 4))}
            className="p-1 text-slate-300 hover:text-white"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Scroll Speed Selector */}
        <div className="flex items-center gap-1 bg-slate-900 border border-white/10 rounded-xl p-1">
          {[
            { label: 'Off', val: 0 },
            { label: 'Lento', val: 1 },
            { label: 'Normal', val: 2 },
            { label: 'Rápido', val: 3 },
          ].map((s) => (
            <button
              key={s.val}
              onClick={() => setSpeed(s.val)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                speed === s.val
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Configurable Timer */}
        <div className="flex items-center gap-2 bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5">
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-1 text-amber-400 hover:text-white"
          >
            {isTimerRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          </button>

          <span
            onClick={handleConfigureTimer}
            className="text-xs font-black text-amber-400 cursor-pointer hover:underline flex items-center gap-1"
            title="Clique para configurar o tempo"
          >
            <Clock className="w-3.5 h-3.5" />
            {formatTimer(timerSeconds)}
          </span>

          <button
            onClick={() => {
              setIsTimerRunning(false);
              setTimerSeconds(900);
            }}
            className="p-1 text-slate-400 hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Teleprompter Scroll Container */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 sm:p-12 md:p-20 max-w-5xl mx-auto w-full leading-relaxed space-y-6 select-none"
        style={{ fontSize: `${fontSize}px` }}
      >
        <div
          className="prose prose-invert max-w-none text-slate-100 font-serif leading-relaxed"
          dangerouslySetInnerHTML={{ __html: marked.parse(sermon?.content || '') }}
        />
        {/* Extra spacing at bottom for teleprompter scroll finish */}
        <div className="h-[50vh]" />
      </div>
    </div>
  );
}
