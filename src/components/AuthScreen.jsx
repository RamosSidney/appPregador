import React from 'react';
import AuthCard from './AuthCard';

export default function AuthScreen({ onLogin, onRegister, onGuestBypass }) {
  return (
    <div className="fixed inset-0 z-[200] w-screen h-screen min-h-screen bg-[#0B0E14] flex flex-col items-center justify-center p-0 sm:p-4 m-0 border-none overflow-y-auto selection:bg-purple-500 selection:text-white">
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
