import React from 'react';
import AuthCard from './AuthCard';

export default function AuthScreen({ onLogin, onRegister, onGuestBypass }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0B0F19] relative overflow-hidden selection:bg-purple-500 selection:text-white">
      {/* Glowing Ambient Light Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse-fast" />

      {/* Grid Pattern Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <AuthCard
        onSubmitLogin={onLogin}
        onSubmitRegister={onRegister}
        onGuestBypass={onGuestBypass}
      />
    </div>
  );
}

