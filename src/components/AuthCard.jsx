import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Mail, Lock, Eye, EyeOff, User, AtSign, Smartphone, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AuthCard({ onSubmitLogin, onSubmitRegister, onGuestBypass }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);

  // Form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  // Input touch states for validation UX
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  // Validations
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'login') {
      if (!isValidEmail || !isPasswordValid) return;
      onSubmitLogin({ email, password });
    } else {
      if (!name.trim() || !username.trim() || !isValidEmail || !isPasswordValid) return;
      onSubmitRegister({ name, username, email, password });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg md:max-w-xl lg:max-w-2xl bg-[#0F172A]/95 backdrop-blur-3xl border border-purple-500/25 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl shadow-purple-950/80 relative z-10 overflow-hidden flex flex-col justify-center my-auto"
    >
      {/* Top Cyber Accents */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400" />

      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 mx-auto flex items-center justify-center shadow-lg shadow-purple-900/50 border border-white/20 mb-3"
        >
          <Zap className="w-9 h-9 text-amber-300 fill-amber-300 drop-shadow-[0_0_12px_rgba(252,211,77,0.8)]" />
        </motion.div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          appPregador <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">2.0</span>
        </h1>
        <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mt-1">
          Geração Z & Alpha
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800/80 mb-6 relative">
        <button
          type="button"
          tabIndex={0}
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-colors relative z-10 flex items-center justify-center gap-1.5 ${
            activeTab === 'login' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Entrar</span>
          {activeTab === 'login' && (
            <motion.div
              layoutId="auth-tab-pill"
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl -z-10 shadow-lg shadow-purple-900/50 border border-purple-400/30"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>

        <button
          type="button"
          tabIndex={0}
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-colors relative z-10 flex items-center justify-center gap-1.5 ${
            activeTab === 'register' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Criar Conta</span>
          {activeTab === 'register' && (
            <motion.div
              layoutId="auth-tab-pill"
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl -z-10 shadow-lg shadow-purple-900/50 border border-purple-400/30"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <AnimatePresence mode="wait">
          {activeTab === 'register' && (
            <motion.div
              key="register-fields"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 overflow-hidden"
            >
              {/* Full Name Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Nome Completo</span>
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    tabIndex={0}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Pastor Tiago Santos"
                    className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nome de Usuário (@)</label>
                <div className="relative">
                  <AtSign className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    tabIndex={0}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ex: pr_tiago"
                    className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Email Input with Real-time Validation */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
            <label htmlFor="auth-email">E-mail de Acesso</label>
            {touchedEmail && (
              isValidEmail ? (
                <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Válido
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-1 text-[11px]">
                  <AlertCircle className="w-3.5 h-3.5" /> E-mail inválido
                </span>
              )
            )}
          </div>
          <div className="relative">
            <Mail className={`w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
              touchedEmail && isValidEmail ? 'text-emerald-400' : 'text-slate-500'
            }`} />
            <input
              id="auth-email"
              type="email"
              required
              tabIndex={0}
              value={email}
              onBlur={() => setTouchedEmail(true)}
              onChange={(e) => {
                setEmail(e.target.value);
                if (!touchedEmail) setTouchedEmail(true);
              }}
              placeholder="pastor@exemplo.com"
              className={`w-full bg-slate-950/70 border rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                touchedEmail && !isValidEmail && email.length > 0
                  ? 'border-rose-500/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
              }`}
            />
          </div>
        </div>

        {/* Password Input with Real-time Validation */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
            <label htmlFor="auth-password">Sua Senha</label>
            {touchedPassword && (
              isPasswordValid ? (
                <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Forte
                </span>
              ) : (
                <span className="text-amber-400 flex items-center gap-1 text-[11px]">
                  Mín. 6 caracteres
                </span>
              )
            )}
          </div>
          <div className="relative">
            <Lock className={`w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
              touchedPassword && isPasswordValid ? 'text-emerald-400' : 'text-slate-500'
            }`} />
            <input
              id="auth-password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              tabIndex={0}
              value={password}
              onBlur={() => setTouchedPassword(true)}
              onChange={(e) => {
                setPassword(e.target.value);
                if (!touchedPassword) setTouchedPassword(true);
              }}
              placeholder="••••••••"
              className={`w-full bg-slate-950/70 border rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                touchedPassword && !isPasswordValid && password.length > 0
                  ? 'border-amber-500/60 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                  : 'border-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
              }`}
            />
            <button
              type="button"
              tabIndex={0}
              aria-label="Alternar visibilidade da senha"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 p-1 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Primary CTA Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-purple-900/50 hover:shadow-purple-700/60 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
        >
          <span>{activeTab === 'login' ? 'ACESSAR ECOSSISTEMA ⚡' : 'CRIAR MINHA CONTA 🛡️'}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-[1px] bg-slate-800" />
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">ou</span>
        <div className="flex-1 h-[1px] bg-slate-800" />
      </div>

      {/* Secondary CTA Button (Modo Simulação) */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onGuestBypass}
        tabIndex={0}
        className="w-full py-3 rounded-xl border border-slate-700/70 bg-slate-950/60 hover:bg-slate-800/60 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
      >
        <Smartphone className="w-4 h-4 text-cyan-400" />
        <span>Navegar no Modo Simulação 📲</span>
      </motion.button>
    </motion.div>
  );
}
