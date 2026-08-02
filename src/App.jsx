import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import FloatingNav from './components/FloatingNav.jsx';
import AuthScreen from './components/AuthScreen.jsx';
import SermonGenerator from './components/SermonGenerator.jsx';
import SavedSermons from './components/SavedSermons.jsx';
import MentorshipRoom from './components/MentorshipRoom.jsx';
import RPGLeaderAcademy from './components/RPGLeaderAcademy.jsx';
import BibleReader from './components/BibleReader.jsx';
import PulpitMode from './components/PulpitMode.jsx';
import SettingsModal from './components/SettingsModal.jsx';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('generator'); // 'generator' | 'saved' | 'mentorship' | 'bible' | 'rpg'
  const [pulpitSermon, setPulpitSermon] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // User States
  const [userCredits, setUserCredits] = useState(100);
  const [userLevel, setUserLevel] = useState(1);
  const [userXp, setUserXp] = useState(0);
  const [userProfile, setUserProfile] = useState(null);

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
      return saved ? JSON.parse(saved) : {
        supabaseUrl: 'https://ugdwufgqynflywqmfmus.supabase.co',
        supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        groqKey: ''
      };
    } catch {
      return { supabaseUrl: '', supabaseKey: '', groqKey: '' };
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
    setIsAuthenticated(true);
  };

  const handleRegister = (data) => {
    setUserProfile({ nome: data.name, username: data.username });
    setIsAuthenticated(true);
  };

  const handleGuestBypass = () => {
    setUserProfile(null);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
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

  // Sermon Generation Engine
  const handleGenerateSermon = async ({ painVibes, popVibes, customRef, customTheme }) => {
    if (userCredits <= 0) {
      alert("Créditos de Raios zerados!");
      return;
    }

    setIsGenerating(true);
    await handleDeductCredit();

    // Call API or Fallback simulation
    setTimeout(() => {
      const pain = painVibes[0] || 'Ansiedade';
      const pop = customRef || popVibes[0] || 'TikTok Algorithm';
      const theme = customTheme || 'Superação';

      const content = `
# ⚡ ${theme}: O Reset do Algoritmo da Sua Mente

## 🎬 O Gancho Cultural
Imagine seu feed do TikTok entulhado de vídeos repetitivos sobre **${pain}**. Paulo nos avisa que a cultura tenta empacotar nossa mente no mesmo padrão. Mas o Evangelho de Cristo é o verdadeiro reset de firmware!

## 📖 O Download Bíblico
> *"E não vos conformeis com este mundo, mas transformai-vos pela renovação da vossa mente..."* (Romanos 12:2)

Para vencer **${pain}**, usando a analogia de **${pop}**, você não pode aceitar a skin padronizada que o mundo te vende. Você foi criado com especificações originais por Deus.

## 🏆 O Desafio Prático da Semana
Desinstale 1 aplicativo que gera ansiedade durante 3 dias e dedique esse tempo à oração e comunidade.
      `;

      const reelsScript = `
🎥 ROTEIRO DE REELS (30 SEGUNDOS)
[00:00-00:05] CENA: Olhando para a tela do celular.
VOZ: "Sua mente tá travando com ${pain}?"
[00:05-00:15] CENA: Corta para texto em tela com Romanos 12:2.
VOZ: "Assim como ${pop}, o mundo quer empacotar sua mente. Mas Deus te deu o reset!"
[00:15-00:30] CENA: Apontando para a câmera com sorriso.
VOZ: "Desconecte do feed do medo e conecte no Criador hoje!"
      `;

      const newSermon = {
        id: Date.now().toString(),
        title: `${theme}: ${pain}`,
        vibe: pain.split(' ')[0],
        content,
        reelsScript,
        createdAt: new Date().toLocaleDateString('pt-BR'),
        isFavorite: false
      };

      setGeneratedSermon(newSermon);
      setIsGenerating(false);
      handleAddXp(20);
    }, 1500);
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

  // If not authenticated, render AuthScreen
  if (!isAuthenticated) {
    return (
      <AuthScreen
        onLogin={handleLogin}
        onRegister={handleRegister}
        onGuestBypass={handleGuestBypass}
      />
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
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentView === 'generator' && (
          <SermonGenerator
            onGenerate={handleGenerateSermon}
            onSaveSermon={handleSaveSermon}
            onOpenPulpit={(s) => setPulpitSermon(s)}
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
            onNavigateToGenerator={() => setCurrentView('generator')}
          />
        )}

        {currentView === 'mentorship' && (
          <MentorshipRoom
            userCredits={userCredits}
            onDeductCredit={handleDeductCredit}
          />
        )}

        {currentView === 'bible' && (
          <BibleReader
            userCredits={userCredits}
            onDeductCredit={handleDeductCredit}
          />
        )}

        {currentView === 'rpg' && (
          <RPGLeaderAcademy
            userLevel={userLevel}
            userXp={userXp}
            onAddXp={handleAddXp}
            onAddCredits={handleAddCredits}
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

      {/* Floating Bottom Nav Dock */}
      <FloatingNav
        activeTab={currentView}
        setActiveTab={setCurrentView}
      />
    </div>
  );
}
