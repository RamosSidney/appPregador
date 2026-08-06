import React, { useState } from 'react';
import { X, Key, Database, LogOut, Check, Zap } from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onLogout,
  userProfile
}) {
  const [activeTab, setActiveTab] = useState('api');
  const [groqKey, setGroqKey] = useState(config.groqKey || '');
  const [openaiKey, setOpenaiKey] = useState(config.openaiKey || '');
  const [supabaseUrl, setSupabaseUrl] = useState(config.supabaseUrl || '');
  const [supabaseKey, setSupabaseKey] = useState(config.supabaseKey || '');

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConfig({ groqKey, openaiKey, supabaseUrl, supabaseKey });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
      <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400" /> Configurações & Conexões
          </h3>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-950 border border-white/10 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('api')}
            className={`flex-1 py-2 rounded-lg text-xs font-extrabold transition-all ${
              activeTab === 'api' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Chaves de API (Groq, OpenAI & Supabase)
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`flex-1 py-2 rounded-lg text-xs font-extrabold transition-all ${
              activeTab === 'account' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sua Conta
          </button>
        </div>

        {/* Tab 1: API Settings */}
        {activeTab === 'api' ? (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-purple-400" /> Groq API Key (Llama 3.3 70B - Texto)
              </label>
              <input
                type="password"
                value={groqKey}
                onChange={(e) => setGroqKey(e.target.value)}
                placeholder="gsk_..."
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-amber-400" /> OpenAI API Key (Vozes Emocionais IA)
              </label>
              <input
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
              />
              <p className="text-[10px] text-slate-400">Ativa vozes neurais humanizadas com emoções reais (Onyx, Nova, Fable, Alloy).</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-cyan-400" /> Supabase URL
              </label>
              <input
                type="text"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://xyz.supabase.co"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-cyan-400" /> Supabase Anon Key
              </label>
              <input
                type="password"
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                placeholder="eyJhbG..."
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        ) : (
          /* Tab 2: Account */
          <div className="space-y-4 text-center py-4">
            {userProfile ? (
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/40 mx-auto flex items-center justify-center font-black text-xl text-purple-400">
                  {userProfile.nome?.charAt(0) || 'P'}
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white">{userProfile.nome}</h4>
                  <p className="text-xs text-slate-400">@{userProfile.username || 'lider'}</p>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400 font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-rose-500 hover:text-white transition-all"
                >
                  <LogOut className="w-4 h-4" /> Desconectar Minha Conta
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Navegando no <strong>Modo Simulação Local</strong>.</p>
                <button
                  onClick={() => {
                    onLogout(); // Triggers show auth screen
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-extrabold text-xs shadow-lg hover:brightness-110 transition-all"
                >
                  Fazer Login / Criar Conta ⚡
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 hover:brightness-110 transition-all"
          >
            <Check className="w-4 h-4" /> Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  );
}
