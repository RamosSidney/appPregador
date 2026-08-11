import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, RotateCcw, CheckCircle2, X, Brain, Zap } from 'lucide-react';

/**
 * VerseMemorizeModal
 * Interactive Gamified Memorization Game reflecting the EXACT Bible verse currently being read.
 */
export default function VerseMemorizeModal({ isOpen, onClose, verseRef, verseText, onAddXp, onAddCredits }) {
  if (!isOpen || !verseText) return null;

  // Process text into words and identify blanked words
  const [tokens, setTokens] = useState([]);
  const [blankIndices, setBlankIndices] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [optionsPool, setOptionsPool] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [scoreEarned, setScoreEarned] = useState(false);
  const [errorIndex, setErrorIndex] = useState(null);

  useEffect(() => {
    initGame();
  }, [verseText, verseRef]);

  const initGame = () => {
    setIsCompleted(false);
    setScoreEarned(false);
    setErrorIndex(null);

    // Split text into words while keeping punctuation attached
    const wordList = verseText.trim().split(/\s+/);
    
    // Choose ~35% of words to blank out (minimum 2 words, length >= 3)
    const eligibleIndices = [];
    wordList.forEach((word, idx) => {
      const cleanWord = word.replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/g, '');
      if (cleanWord.length >= 3) {
        eligibleIndices.push(idx);
      }
    });

    // Select every 2nd or 3rd eligible word for blanks
    const blanks = eligibleIndices.filter((_, i) => i % 2 === 0);
    if (blanks.length === 0 && wordList.length > 0) {
      blanks.push(0);
    }

    // Build options pool (correct words + 3 distractor words)
    const correctWords = blanks.map(idx => wordList[idx].replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/g, ''));
    const distractors = ['Senhor', 'Glória', 'Graça', 'Fé', 'Amor', 'Vida', 'Luz', 'Verdade', 'Pai', 'Santo']
      .filter(d => !correctWords.includes(d))
      .slice(0, 3);

    const pool = [...correctWords, ...distractors].sort(() => Math.random() - 0.5);

    setTokens(wordList);
    setBlankIndices(blanks);
    setUserAnswers({});
    setOptionsPool(pool);
  };

  const handleSelectWord = (word) => {
    // Find first empty blank slot
    const firstEmptyIndex = blankIndices.find(idx => !userAnswers[idx]);
    if (firstEmptyIndex === undefined) return;

    const nextAnswers = { ...userAnswers, [firstEmptyIndex]: word };
    setUserAnswers(nextAnswers);

    // Remove word from pool
    const poolIdx = optionsPool.indexOf(word);
    if (poolIdx !== -1) {
      const nextPool = [...optionsPool];
      nextPool.splice(poolIdx, 1);
      setOptionsPool(nextPool);
    }

    // Check if all blanks are filled
    if (Object.keys(nextAnswers).length === blankIndices.length) {
      // Verify correctness
      let allCorrect = true;
      blankIndices.forEach(idx => {
        const targetClean = tokens[idx].replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/g, '').toLowerCase();
        const userClean = (nextAnswers[idx] || '').toLowerCase();
        if (targetClean !== userClean) {
          allCorrect = false;
        }
      });

      if (allCorrect) {
        setIsCompleted(true);
        if (!scoreEarned) {
          setScoreEarned(true);
          if (onAddXp) onAddXp(25);
          if (onAddCredits) onAddCredits(2);
        }
      } else {
        // Flash error
        setErrorIndex(true);
        setTimeout(() => setErrorIndex(null), 800);
      }
    }
  };

  const handleRemoveAnswer = (blankIdx) => {
    if (!userAnswers[blankIdx]) return;
    const removedWord = userAnswers[blankIdx];
    const nextAnswers = { ...userAnswers };
    delete nextAnswers[blankIdx];

    setUserAnswers(nextAnswers);
    setOptionsPool(prev => [...prev, removedWord].sort(() => Math.random() - 0.5));
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl selection:bg-purple-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-xl bg-[#0F172A] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/60 relative overflow-hidden flex flex-col space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-900/50">
              <Brain className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                Desafio de Memorização
              </h3>
              <p className="text-xs font-bold text-amber-400">
                {verseRef || 'Bíblia Gameficada'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Verse Text with Interactive Blank Slots */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 min-h-[140px] flex items-center flex-wrap gap-2 text-sm sm:text-base leading-relaxed font-medium text-slate-200">
          {tokens.map((word, idx) => {
            const isBlank = blankIndices.includes(idx);
            if (!isBlank) {
              return <span key={idx}>{word}</span>;
            }

            const answer = userAnswers[idx];
            const cleanTarget = word.replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/g, '');
            const punctuation = word.replace(/[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/g, '');

            return (
              <span key={idx} className="inline-flex items-center gap-0.5">
                <button
                  onClick={() => handleRemoveAnswer(idx)}
                  className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-black border transition-all ${
                    answer
                      ? isCompleted
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-950/50'
                        : errorIndex
                        ? 'bg-rose-500/20 border-rose-400 text-rose-300 animate-shake'
                        : 'bg-purple-600/30 border-purple-400 text-purple-200'
                      : 'bg-slate-900 border-purple-500/40 text-purple-400 border-dashed min-w-[60px] text-center'
                  }`}
                >
                  {answer || '___'}
                </button>
                {punctuation && <span>{punctuation}</span>}
              </span>
            );
          })}
        </div>

        {/* Word Options Bank */}
        {!isCompleted && (
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Toque nas palavras para preencher os lacunas:
            </span>
            <div className="flex flex-wrap gap-2">
              {optionsPool.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectWord(word)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white font-extrabold text-xs sm:text-sm border border-slate-700 hover:border-purple-400 transition-all active:scale-95 shadow-sm"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Victory Celebration State */}
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-emerald-950/80 to-purple-950/80 border border-emerald-500/40 rounded-2xl p-5 text-center space-y-3"
          >
            <div className="flex justify-center">
              <Trophy className="w-12 h-12 text-amber-300 fill-amber-300 animate-bounce" />
            </div>
            <h4 className="text-lg font-black text-white">
              Versículo Memorizado com Sucesso! 🎉
            </h4>
            <div className="flex items-center justify-center gap-4 text-xs font-extrabold">
              <span className="text-amber-400 flex items-center gap-1 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-amber-500/30">
                <Sparkles className="w-4 h-4" /> +25 XP Conquistado
              </span>
              <span className="text-amber-300 flex items-center gap-1 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-amber-500/30">
                <Zap className="w-4 h-4 fill-amber-300" /> +2 Raios Conquistado
              </span>
            </div>
          </motion.div>
        )}

        {/* Footer Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={initGame}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-2 border border-slate-700 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reiniciar</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-purple-950/50"
          >
            {isCompleted ? 'Concluído' : 'Fechar'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
