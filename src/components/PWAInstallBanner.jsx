import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Download, X, CheckCircle2, Sparkles } from 'lucide-react';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already running as standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setInstalled(true);
      return;
    }

    // Detect iOS
    const isIosDevice = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    setIsIOS(isIosDevice);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show prompt for iOS if not installed
    if (isIosDevice && !localStorage.getItem('app_pregador_pwa_dismissed')) {
      setShowBanner(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (isIOS) {
        alert("Para instalar no iPhone / iPad:\n\n1. Toque no botão Compartilhar 📤 no Safari.\n2. Role para baixo e selecione 'Adicionar à Tela de Início' ➕.");
      }
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('[PWA] Usuário aceitou a instalação');
      setInstalled(true);
    }
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('app_pregador_pwa_dismissed', 'true');
  };

  if (installed || !showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 z-50 sm:w-96 bg-slate-900/95 backdrop-blur-2xl border border-purple-500/40 rounded-2xl p-4 shadow-2xl shadow-purple-950/80 text-white"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-amber-500 flex items-center justify-center font-bold text-white shrink-0 shadow-lg shadow-purple-900/50 border border-white/20">
              <Smartphone className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white flex items-center gap-1">
                <span>Instalar appPregador 2.0</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </h4>
              <p className="text-[10px] text-slate-300 mt-0.5 leading-snug">
                Acesse em 1 toque na Tela de Início, mesmo offline e em tela cheia!
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all"
            aria-label="Fechar aviso de PWA"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isIOS ? 'Como Instalar no iOS' : 'Baixar App Agora'}</span>
          </button>

          <button
            onClick={handleDismiss}
            className="px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-slate-400 hover:text-white text-xs font-bold transition-all"
          >
            Agora não
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
