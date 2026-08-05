import React from 'react';
import AuthCard from './AuthCard';

export default function AuthScreen({ onLogin, onRegister, onGuestBypass }) {
  return (
    <div className="fixed inset-0 z-[200] w-full h-full min-h-screen bg-[#0B0E14] flex flex-col items-center justify-center p-0 m-0 border-none overflow-y-auto selection:bg-purple-500 selection:text-white">
      {/* Glowing Ambient Light Orbs - Full Browser Coverage */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/25 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />
      <div className="fixed bottom-0 right-1/4 w-[550px] h-[550px] bg-cyan-500/25 rounded-full blur-[140px] pointer-events-none animate-pulse-fast" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[180px] pointer-events-none" />

      {/* Cyber Grid Background Pattern Overlay - 100% Edge-to-Edge */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <AuthCard
        onSubmitLogin={onLogin}
        onSubmitRegister={onRegister}
        onGuestBypass={onGuestBypass}
      />
    </div>
  );
}
