import React from 'react';
import AuthCard from './AuthCard';

export default function AuthScreen({ onLogin, onRegister, onGuestBypass }) {
  return (
    <div className="fixed inset-0 z-[200] w-full h-dvh min-h-dvh bg-[#0B0E14] flex flex-col items-center justify-start sm:justify-center px-3 py-4 sm:p-6 border-none overflow-y-auto selection:bg-purple-500 selection:text-white pt-safe pb-safe">
      {/* Glowing Ambient Light Orbs */}
      <div className="fixed top-0 left-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-purple-600/25 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none animate-pulse-glow" />
      <div className="fixed bottom-0 right-1/4 w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] bg-cyan-500/25 rounded-full blur-[110px] sm:blur-[140px] pointer-events-none animate-pulse-fast" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-indigo-600/15 rounded-full blur-[130px] sm:blur-[180px] pointer-events-none" />

      {/* Cyber Grid Background Pattern Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] pointer-events-none" />

      <AuthCard
        onSubmitLogin={onLogin}
        onSubmitRegister={onRegister}
        onGuestBypass={onGuestBypass}
      />
    </div>
  );
}
