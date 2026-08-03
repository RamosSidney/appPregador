import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, ArrowRight, Trophy, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuizModal({ title, isBossFight = false, questions = [], xpReward = 50, onClose, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (index) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });

      if (onComplete) {
        const finalScorePercent = Math.round(((score + (selectedOption === currentQuestion.correctIndex ? 1 : 0)) / totalQuestions) * 100);
        onComplete({
          scorePercent: finalScorePercent,
          xpEarned: xpReward,
          isBossFight
        });
      }
    }
  };

  const currentCorrect = isAnswered && selectedOption === currentQuestion?.correctIndex;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl selection:bg-purple-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-2xl bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/60 relative overflow-hidden max-h-[90vh] flex flex-col justify-between"
      >
        {/* Top Glow Accent */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
          isBossFight ? 'from-amber-500 via-rose-500 to-amber-400' : 'from-purple-500 via-indigo-500 to-cyan-400'
        }`} />

        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${
              isBossFight
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
            }`}>
              {isBossFight ? <Trophy className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400">
                {isBossFight ? '⚔️ BOSS FIGHT DA TRILHA' : '🎯 QUIZ DE AVALIAÇÃO'}
              </span>
              <h3 className="text-lg font-black text-white leading-tight">{title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Finished Screen */}
        {isFinished ? (
          <div className="py-8 text-center space-y-6 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-purple-900/60 border border-white/20"
            >
              <Trophy className="w-10 h-10 text-amber-300 fill-amber-300 drop-shadow-[0_0_15px_rgba(252,211,77,0.9)]" />
            </motion.div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider">
                {isBossFight ? 'Insígnia de Trilha Conquistada! 🏆' : 'Módulo Concluído com Sucesso! 🎉'}
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-white">
                {score} de {totalQuestions} Respostas Corretas!
              </h4>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                {isBossFight
                  ? 'Você demonstrou domínio total do conteúdo da Trilha. O conhecimento foi retido!'
                  : 'Excelente desempenho! Seu aprendizado foi consolidado e seu progresso registrado.'}
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-purple-300 font-extrabold text-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>+{xpReward} XP Conquistados</span>
              </div>
              <div className="h-4 w-[1px] bg-slate-800" />
              <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-sm">
                <span>+5 Raios Bônus ⚡</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Continuar Aprendizado
            </button>
          </div>
        ) : (
          /* Active Question Step */
          <div className="space-y-6 my-auto overflow-y-auto pr-1">
            {/* Question Counter & Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                <span className="text-purple-400">PERGUNTA {currentIndex + 1} DE {totalQuestions}</span>
                <span className="text-slate-300">Acertos: {score}</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currentQuestion?.question}
            </h4>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQuestion?.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectIndex = idx === currentQuestion.correctIndex;

                let buttonStyle = "bg-slate-950/60 border-slate-800/90 text-slate-300 hover:border-purple-500/40 hover:text-white";

                if (isAnswered) {
                  if (isCorrectIndex) {
                    buttonStyle = "bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                  } else if (isSelected) {
                    buttonStyle = "bg-rose-950/60 border-rose-500/80 text-rose-200 font-bold";
                  } else {
                    buttonStyle = "bg-slate-950/40 border-slate-800/40 text-slate-500 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all duration-200 flex items-center justify-between gap-3 ${buttonStyle} ${
                      !isAnswered ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center shrink-0 border ${
                        isAnswered && isCorrectIndex
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : isAnswered && isSelected
                          ? 'bg-rose-500 text-white border-rose-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </span>

                    {isAnswered && isCorrectIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrectIndex && (
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Box */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 10, height: 0 }}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1.5 ${
                    currentCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-900/90 border-slate-700/60 text-slate-300'
                  }`}
                >
                  <div className="font-extrabold flex items-center gap-1.5 text-xs tracking-wider uppercase">
                    {currentCorrect ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Resposta Correta!
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> Justificativa Pedagógica:
                      </span>
                    )}
                  </div>
                  <p className="leading-relaxed">{currentQuestion?.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            {isAnswered && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{currentIndex + 1 < totalQuestions ? 'Próxima Pergunta' : 'Finalizar Avaliação'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
