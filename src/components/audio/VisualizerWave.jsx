import React from 'react';
import { motion } from 'framer-motion';

export default function VisualizerWave({ isPlaying = false, isListening = false, barCount = 5 }) {
  const bars = Array.from({ length: barCount });
  const activeColor = isListening ? 'bg-cyan-400 shadow-glow-cyan' : 'bg-purple-400 shadow-glow-purple';

  return (
    <div className="flex items-center gap-1 h-5 px-1">
      {bars.map((_, index) => (
        <motion.div
          key={index}
          className={`w-1 rounded-full ${isPlaying || isListening ? activeColor : 'bg-slate-700'}`}
          animate={
            isPlaying || isListening
              ? {
                  height: [
                    '20%',
                    `${Math.min(100, Math.max(30, (index + 1) * 20))}%`,
                    '100%',
                    '30%',
                    '20%'
                  ]
                }
              : { height: '20%' }
          }
          transition={
            isPlaying || isListening
              ? {
                  duration: 0.6 + (index % 3) * 0.15,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: index * 0.1
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}
