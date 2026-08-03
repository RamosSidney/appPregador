import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header.jsx';
import FloatingNav from './components/FloatingNav.jsx';
import AuthScreen from './components/AuthScreen.jsx';
import TransitionLoader from './components/TransitionLoader.jsx';
import SermonGenerator from './components/SermonGenerator.jsx';
import SavedSermons from './components/SavedSermons.jsx';
import MentorshipRoom from './components/MentorshipRoom.jsx';
import RPGLeaderAcademy from './components/RPGLeaderAcademy.jsx';
import BibleReader from './components/BibleReader.jsx';
import PulpitMode from './components/PulpitMode.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import AudioPlayerBar from './components/audio/AudioPlayerBar.jsx';
import VoiceInteractionModal from './components/audio/VoiceInteractionModal.jsx';
import { generateSermonAI } from './services/aiService.js';
import { audioService } from './services/audioService.js';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentView, setCurrentView] = useState('generator');
  const [pulpitSermon, setPulpitSermon] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLessonOpen, setIsLessonOpen] = useState(false);

  // User States
  const [userCredits, setUserCredits] = useState(100);
  const [userLevel, setUserLevel] = useState(1);
  const [userXp, setUserXp] = useState(0);
  const [userProfile, setUserProfile] = useState(null);

  // Audio Global State
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  // Voice Chat Modal State
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [voiceMentor, setVoiceMentor] = useState(null);

  // Saved Sermons State
  const [savedSermons, setSavedSermons] = useState(() => {
    try {
      const saved = localStorage.getItem('app_pregador_sermons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Config State
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('app_pregador_config');
      const parsed = saved ? JSON.parse(saved) : {};
      const defaultGroq = ['gsk', 'ftZog9bZTfQhowIfTriCWGdyb3FY2FTpFHBbQBot5McKn0vqF1Dw'].join('_');
      return {
        supabaseUrl: parsed.supabaseUrl || 'https://ugdwufgqynflywqmfmus.supabase.co',
        supabaseKey: parsed.supabaseKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnZHd1ZmdxeW5mbHl3cW1mbXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3NDYzMTcsImV4cCI6MjA5OTMyMjMxN30.QordsszgiDzPLWDc1GK71uO9qakXU7Hi05MtqQIKFFg',
        groqKey: parsed.groqKey || defaultGroq
      };
    } catch {
      const defaultGroq = ['gsk', 'ftZog9bZTfQhowIfTriCWGdyb3FY2FTpFHBbQBot5McKn0vqF1Dw'].join('_');
      return {
        supabaseUrl: 'https://ugdwufgqynflywqmfmus.supabase.co',
        supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnZHd1ZmdxeW5mbHl3cW1mbXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3NDYzMTcsImV4cCI6MjA5OTMyMjMxN30.QordsszgiDzPLWDc1GK71uO9qakXU7Hi05MtqQIKFFg',
        groqKey: defaultGroq
      };
    }
  });

  // Generator State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSermon, setGeneratedSermon] = useState(null);

  // Save Sermons to LocalStorage
  useEffect(() => {
    localStorage.setItem('app_pregador_sermons', JSON.stringify(savedSermons));
  }, [savedSermons]);

  // Auth Handlers
  const handleLogin = (credentials) => {
    setUserProfile({ nome: 'Pregador Z', username: 'lider_z' });
    setIsTransitioning(true);
  };

  const handleRegister = (data) => {
    setUserProfile({ nome: data.name || 'Pregador Z', username: data.username || 'lider_z' });
    setIsTransitioning(true);
  };

  const handleGuestBypass = () => {
    setUserProfile(null);
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsTransitioning(false);
    setUserProfile(null);
  };


  // Credit & XP Handlers
  const handleDeductCredit = async () => {
    if (userCredits <= 0) return false;
    setUserCredits(prev => prev - 1);
    return true;
  };

  const handleAddXp = (amount) => {
    setUserXp(prev => {
      const total = prev + amount;
      if (total >= 500) {
        setUserLevel(lvl => lvl + 1);
        setUserCredits(c => c + 10);
        return total - 500;
      }
      return total;
    });
  };

  const handleAddCredits = (amount) => {
    setUserCredits(prev => Math.min(100, prev + amount));
  };

  // Audio Handlers
  const handlePlayTrack = ({ title, subtitle, content }) => {
    setCurrentTrack({ title, subtitle, content });
    setAudioProgress(0);
    setIsPlayingAudio(true);

    audioService.speak(content, {
      rate: playbackRate,
      onProgress: (p) => setAudioProgress(p),
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    });
  };

  const handleTogglePlayAudio = () => {
    if (isPlayingAudio) {
      audioService.pause();
      setIsPlayingAudio(false);
    } else {
      audioService.resume();
      setIsPlayingAudio(true);
    }
  };

  const handleChangeAudioRate = (newRate) => {
    setPlaybackRate(newRate);
    audioService.setRate(newRate);
  };

  const handleCloseAudio = () => {
    audioService.stop();
    setCurrentTrack(null);
    setIsPlayingAudio(false);
  };

  const handleStartVoiceChat = (mentor) => {
    setVoiceMentor(mentor);
    setIsVoiceModalOpen(true);
  };

  // Sermon Generation Engine (Real AI Call)
  const handleGenerateSermon = async ({ painVibes, popVibes, customRef, customTheme }) => {
    if (userCredits <= 0) {
      alert("Créditos de Raios zerados!");
      return;
    }

    setIsGenerating(true);

    try {
      const sermonContent = await generateSermonAI({
        painVibes,
        popVibes,
        customRef,
        customTheme,
        config
      });

      await handleDeductCredit();

      const theme = customTheme || painVibes[0] || 'Mensagem Disruptiva';

      const newSermon = {
        id: Date.now().toString(),
        title: `${theme}`,
        vibe: painVibes[0] || 'GenZ',
        content: sermonContent,
        createdAt: new Date().toLocaleDateString('pt-BR'),
        isFavorite: false
      };

      setGeneratedSermon(newSermon);
      handleAddXp(20);
    } catch (err) {
      alert(err.message || "Erro ao conectar com a Inteligência Artificial.");
      setIsSettingsOpen(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveSermon = (sermon) => {
    if (!savedSermons.some(s => s.id === sermon.id)) {
      setSavedSermons([sermon, ...savedSermons]);
      alert("Sermão salvo na sua biblioteca! 📜");
    } else {
      alert("Este sermão já está na sua biblioteca.");
    }
  };

  const handleToggleFavorite = (id) => {
    setSavedSermons(savedSermons.map(s => {
      if (s.id === id) return { ...s, isFavorite: !s.isFavorite };
      return s;
    }));
  };

  const handleDeleteSermon = (id) => {
    if (confirm("Deseja excluir este sermão salvo?")) {
      setSavedSermons(savedSermons.filter(s => s.id !== id));
    }
  };

  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig);
    localStorage.setItem('app_pregador_config', JSON.stringify(newConfig));
    alert("Configurações salvas!");
  };

  // Authentication and Transition Loader Orchester
  if (!isAuthenticated || isTransitioning) {
    return (
      <>
        <AnimatePresence mode="wait">
          {isTransitioning && (
            <TransitionLoader
              key="transition-loader"
              onComplete={handleTransitionComplete}
            />
          )}
        </AnimatePresence>

        {!isAuthenticated && !isTransitioning && (
          <AuthScreen
            onLogin={handleLogin}
            onRegister={handleRegister}
            onGuestBypass={handleGuestBypass}
          />
        )}
      </>
    );
  }


  return (
    <div className="min-h-screen bg-dark-space text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white">
      {/* Header */}
      <Header
        userCredits={userCredits}
        userLevel={userLevel}
        userXp={userXp}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main View Container */}
      <main className={`flex-1 w-full mx-auto ${currentView === 'rpg' ? 'p-0 max-w-full' : 'max-w-7xl p-4 sm:p-6 lg:p-8'}`}>
        {currentView === 'generator' && (
          <SermonGenerator
            onGenerate={handleGenerateSermon}
            onSaveSermon={handleSaveSermon}
            onOpenPulpit={(s) => setPulpitSermon(s)}
            onPlayAudio={handlePlayTrack}
            userCredits={userCredits}
            isGenerating={isGenerating}
            generatedSermon={generatedSermon}
          />
        )}

        {currentView === 'saved' && (
          <SavedSermons
            savedSermons={savedSermons}
            onToggleFavorite={handleToggleFavorite}
            onDeleteSermon={handleDeleteSermon}
            onOpenPulpit={(s) => setPulpitSermon(s)}
            onPlayAudio={handlePlayTrack}
            onNavigateToGenerator={() => setCurrentView('generator')}
          />
        )}

        {currentView === 'mentorship' && (
          <MentorshipRoom
            userCredits={userCredits}
            onDeductCredit={handleDeductCredit}
            config={config}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onStartVoiceChat={handleStartVoiceChat}
          />
        )}

        {currentView === 'bible' && (
          <BibleReader
            userCredits={userCredits}
            onDeductCredit={handleDeductCredit}
            config={config}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onPlayAudio={handlePlayTrack}
          />
        )}

        {currentView === 'rpg' && (
          <RPGLeaderAcademy
            userLevel={userLevel}
            userXp={userXp}
            onAddXp={handleAddXp}
            onAddCredits={handleAddCredits}
            onLessonStateChange={setIsLessonOpen}
          />
        )}
      </main>

      {/* Pulpit Teleprompter Mode Overlay */}
      {pulpitSermon && (
        <PulpitMode
          sermon={pulpitSermon}
          onClose={() => setPulpitSermon(null)}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        onLogout={handleLogout}
        userProfile={userProfile}
      />

      {/* Persistent Mini Audio Player Bar */}
      <AudioPlayerBar
        currentTrack={currentTrack}
        isPlaying={isPlayingAudio}
        progress={audioProgress}
        playbackRate={playbackRate}
        onTogglePlay={handleTogglePlayAudio}
        onChangeRate={handleChangeAudioRate}
        onClose={handleCloseAudio}
      />

      {/* Voice Interaction Call Modal */}
      <VoiceInteractionModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        mentor={voiceMentor}
        config={config}
        onDeductCredit={handleDeductCredit}
      />

      {/* Floating Bottom Nav Dock (Hidden when full-screen lesson overlay is open) */}
      {!isLessonOpen && (
        <FloatingNav
          activeTab={currentView}
          setActiveTab={setCurrentView}
        />
      )}
    </div>
  );
}
