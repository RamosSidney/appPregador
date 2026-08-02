import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, Eye, EyeOff, User, AtSign, Smartphone, ArrowRight } from 'lucide-react';

export default function AuthScreen({ onLogin, onRegister, onGuestBypass }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'login') {
      onLogin({ email, password });
    } else {
      onRegister({ name, username, email, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-dark-space relative overflow-hidden">
      {/* Glowing Ambient Light Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-fast" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse-fast" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/40 relative z-10"
      >
        {/* Auth Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 mx-auto flex items-center justify-center shadow-lg shadow-purple-900/50 border border-white/20 mb-3 animate-float">
            <Zap className="w-9 h-9 text-amber-400 fill-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            appPregador <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">2.0</span>
          </h2>
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mt-1">
            Geração Z & Alpha
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950/80 p-1.5 rounded-xl border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
              activeTab === 'login'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
              activeTab === 'register'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Criar Conta
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {activeTab === 'register' && (
            <>
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nome Completo</label>
                <div className="relative">
                  <User className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Pastor Tiago Santos"
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nome de Usuário (@)</label>
                <div className="relative">
                  <AtSign className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ex: pr_tiago"
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">E-mail de Acesso</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pastor@exemplo.com"
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Sua Senha</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Primary CTA */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-purple-900/40 hover:shadow-purple-700/60 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{activeTab === 'login' ? 'ACESSAR ECOSSISTEMA ⚡' : 'CRIAR MINHA CONTA 🛡️'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-white/10" />
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">ou</span>
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>

        {/* Secondary Guest CTA */}
        <button
          type="button"
          onClick={onGuestBypass}
          className="w-full py-3 rounded-xl border border-white/15 bg-slate-950/40 hover:bg-slate-800/60 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          <Smartphone className="w-4 h-4 text-cyan-400" />
          <span>Navegar no Modo Simulação 📲</span>
        </button>
      </motion.div>
    </div>
  );
}
