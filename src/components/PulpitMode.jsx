import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Type, Plus, Minus, Clock } from 'lucide-react';
import { marked } from 'marked';
import { sanitizeHtml } from '../services/securityService.js';

export default function PulpitMode({ sermon, onClose }) {
  const [fontSize, setFontSize] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 640 ? 22 : 30));
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
    <div className="fixed inset-0 z-[150] bg-black text-white flex flex-col overflow-hidden h-dvh pt-safe pb-safe">
      {/* Top Floating Control Bar (Mobile-First 2-Row -> Desktop 1-Row) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 sm:p-4 bg-slate-950/95 border-b border-white/10 backdrop-blur-xl shrink-0">
        {/* Row 1: Close + Title + Timer */}
        <div className="flex items-center justify-between gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={onClose}
              aria-label="Sair do Modo Púlpito"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-white/15 text-slate-300 hover:text-white flex items-center justify-center shrink-0 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xs sm:text-sm font-black text-amber-400 truncate">
              {sermon?.title || 'Modo Púlpito'}
            </h3>
          </div>

          {/* Configurable Timer (Visible in Row 1 on Mobile) */}
          <div className="flex sm:hidden items-center gap-1.5 bg-slate-900 border border-white/10 rounded-xl px-2.5 py-1.5 shrink-0">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1 text-amber-400 hover:text-white cursor-pointer"
              aria-label="Iniciar ou pausar cronômetro"
            >
              {isTimerRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <span
              onClick={handleConfigureTimer}
              className="text-xs font-black text-amber-400 cursor-pointer flex items-center gap-1 font-mono"
            >
              <Clock className="w-3.5 h-3.5" />
              {formatTimer(timerSeconds)}
            </span>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(900);
              }}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
              aria-label="Reiniciar cronômetro"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Row 2: Font Size + Scroll Speed + Desktop Timer */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          {/* Font Size Controls */}
          <div className="flex items-center gap-1 bg-slate-900 border border-white/10 rounded-xl px-2 py-1 shrink-0">
            <Type className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => setFontSize(Math.max(16, fontSize - 2))}
              className="w-7 h-7 flex items-center justify-center text-slate-200 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              aria-label="Diminuir fonte"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-white w-6 text-center font-mono">{fontSize}</span>
            <button
              onClick={() => setFontSize(Math.min(56, fontSize + 2))}
              className="w-7 h-7 flex items-center justify-center text-slate-200 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              aria-label="Aumentar fonte"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Scroll Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-900 border border-white/10 rounded-xl p-1 flex-1 sm:flex-initial justify-around">
            {[
              { label: 'Parado', val: 0 },
              { label: '1x', val: 1 },
              { label: '2x', val: 2 },
              { label: '3x', val: 3 },
            ].map((s) => (
              <button
                key={s.val}
                onClick={() => setSpeed(s.val)}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex-1 sm:flex-initial text-center ${
                  speed === s.val
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Desktop Timer */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1 text-amber-400 hover:text-white cursor-pointer"
            >
              {isTimerRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <span
              onClick={handleConfigureTimer}
              className="text-xs font-black text-amber-400 cursor-pointer hover:underline flex items-center gap-1 font-mono"
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
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Teleprompter Scroll Container */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 sm:p-10 md:p-16 max-w-4xl mx-auto w-full leading-relaxed space-y-6 select-none"
        style={{ fontSize: `${fontSize}px` }}
      >
        <div
          className="prose prose-invert max-w-none text-slate-100 font-serif leading-relaxed break-words"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(marked.parse(sermon?.content || '')) }}
        />
        {/* Extra spacing at bottom for teleprompter scroll finish */}
        <div className="h-[55dvh]" />
      </div>
    </div>
  );
}
