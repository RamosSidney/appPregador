import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, X, Volume2, FastForward } from 'lucide-react';
import VisualizerWave from './VisualizerWave.jsx';

export default function AudioPlayerBar({
  currentTrack,
  isPlaying,
  progress,
  playbackRate,
  onTogglePlay,
  onChangeRate,
  onClose
}) {
  if (!currentTrack) return null;

  const rates = [1.0, 1.25, 1.5, 2.0];

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      className="fixed bottom-[84px] left-4 right-4 sm:left-auto sm:right-6 z-40 sm:w-96 bg-slate-900/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-3.5 shadow-2xl shadow-purple-950/60"
    >
      {/* Progress Bar Scrubber Header */}
      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mb-2.5">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        {/* Track Metadata */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
            <Volume2 className="w-4 h-4 text-amber-300" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-black text-white truncate">
              {currentTrack.title}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-bold text-purple-400 uppercase">
                {currentTrack.subtitle || 'Áudio AI'}
              </span>
              <VisualizerWave isPlaying={isPlaying} barCount={4} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Rate Selector */}
          <button
            onClick={() => {
              const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
              onChangeRate(rates[nextIdx]);
            }}
            className="px-2 py-1 rounded-lg bg-slate-950/80 border border-white/10 text-[10px] font-black text-amber-400 hover:text-white transition-all flex items-center gap-0.5"
            title="Velocidade de Reprodução"
          >
            <FastForward className="w-3 h-3" />
            <span>{playbackRate}x</span>
          </button>

          {/* Play / Pause Toggle */}
          <button
            onClick={onTogglePlay}
            className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
