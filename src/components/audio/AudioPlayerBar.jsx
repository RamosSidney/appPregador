import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, Volume2, FastForward, UserCheck, Settings, Mic } from 'lucide-react';
import VisualizerWave from './VisualizerWave.jsx';
import { audioService } from '../../services/audioService.js';

export default function AudioPlayerBar({
  currentTrack,
  isPlaying,
  progress,
  playbackRate,
  onTogglePlay,
  onChangeRate,
  onClose,
  currentVoiceStyle = 'pastor',
  currentVoiceName = null,
  onChangeVoiceStyle,
  onChangeVoiceName
}) {
  const [showVoiceMenu, setShowVoiceMenu] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);

  useEffect(() => {
    const voices = audioService.getAvailableVoices();
    setAvailableVoices(voices);
  }, []);

  if (!currentTrack) return null;

  const rates = [1.0, 1.25, 1.5, 2.0];

  const voiceStyles = [
    { id: 'pastor', label: '🎙️ Voz Pastor', desc: 'Masculina Encorajadora' },
    { id: 'mentora', label: '✨ Voz Mentora', desc: 'Feminina Acolhedora' },
    { id: 'genz', label: '⚡ Voz Gen Z', desc: 'Dinâmica & Ágil' },
    { id: 'devocional', label: '📖 Voz Devocional', desc: 'Calma & Solene' }
  ];

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      className="fixed bottom-[84px] left-4 right-4 sm:left-auto sm:right-6 z-40 sm:w-96 bg-slate-900/95 backdrop-blur-2xl border border-purple-500/40 rounded-2xl p-3.5 shadow-2xl shadow-purple-950/80"
    >
      {/* Progress Scrubber Header */}
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-2.5">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-amber-400 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        {/* Track Metadata */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md border border-white/20">
            <Volume2 className="w-5 h-5 text-amber-300" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-black text-white truncate">
              {currentTrack.title}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider">
                {currentTrack.subtitle || 'Áudio AI'}
              </span>
              <VisualizerWave isPlaying={isPlaying} barCount={4} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Voice Picker Toggle Button */}
          <button
            onClick={() => setShowVoiceMenu(!showVoiceMenu)}
            className={`px-2 py-1.5 rounded-lg border text-[10px] font-black transition-all flex items-center gap-1 ${
              showVoiceMenu
                ? 'bg-purple-600 text-white border-purple-400'
                : 'bg-slate-950/80 border-white/15 text-purple-300 hover:text-white'
            }`}
            title="Selecionar Voz e Estilo"
          >
            <Mic className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Vozes</span>
          </button>

          {/* Rate Selector Button */}
          <button
            onClick={() => {
              const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
              onChangeRate(rates[nextIdx]);
            }}
            className="px-2 py-1.5 rounded-lg bg-slate-950/80 border border-white/15 text-[10px] font-black text-amber-400 hover:text-white transition-all flex items-center gap-0.5"
            title="Velocidade de Reprodução"
          >
            <FastForward className="w-3 h-3" />
            <span>{playbackRate}x</span>
          </button>

          {/* Play / Pause Toggle Button */}
          <button
            onClick={onTogglePlay}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold flex items-center justify-center shadow-lg shadow-purple-950/60 hover:scale-105 active:scale-95 transition-all border border-white/20"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Popover Menu for Voice Selection */}
      <AnimatePresence>
        {showVoiceMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-3 pt-3 border-t border-white/10 space-y-3"
          >
            {/* Style Presets */}
            <div>
              <label className="text-[10px] font-black uppercase text-purple-400 tracking-wider block mb-1.5">
                Estilos Temáticos de Narração
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {voiceStyles.map((vs) => (
                  <button
                    key={vs.id}
                    onClick={() => {
                      if (onChangeVoiceStyle) onChangeVoiceStyle(vs.id);
                    }}
                    className={`p-2 rounded-xl text-left border transition-all ${
                      currentVoiceStyle === vs.id
                        ? 'bg-purple-600/30 border-purple-400 text-white shadow-md'
                        : 'bg-slate-950/60 border-white/10 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold">{vs.label}</div>
                    <div className="text-[9px] text-slate-400">{vs.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* System TTS Voices Selection */}
            {availableVoices.length > 0 && (
              <div>
                <label className="text-[10px] font-black uppercase text-cyan-400 tracking-wider block mb-1">
                  Vozes do Sistema (TTS)
                </label>
                <select
                  value={currentVoiceName || ''}
                  onChange={(e) => {
                    if (onChangeVoiceName) onChangeVoiceName(e.target.value || null);
                  }}
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white appearance-none cursor-pointer focus:outline-none focus:border-purple-500"
                >
                  <option value="">Voz Automática Recomendada</option>
                  {availableVoices.map((v, i) => (
                    <option key={i} value={v.name}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
