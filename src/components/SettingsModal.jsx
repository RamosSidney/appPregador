import React, { useState } from 'react';
import { X, Key, Database, LogOut, Check, Zap, BarChart3, Download, Upload, ShieldCheck, Activity } from 'lucide-react';
import { validateBackupPayload } from '../services/securityService.js';
import { telemetryService } from '../services/telemetryService.js';

export default function SettingsModal({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onLogout,
  userProfile,
  userCredits = 100,
  userLevel = 1,
  userXp = 0,
  savedSermons = []
}) {
  const [activeTab, setActiveTab] = useState('api'); // 'api' | 'data' | 'account'
  const [groqKey, setGroqKey] = useState(config.groqKey || '');
  const [openaiKey, setOpenaiKey] = useState(config.openaiKey || '');
  const [supabaseUrl, setSupabaseUrl] = useState(config.supabaseUrl || '');
  const [supabaseKey, setSupabaseKey] = useState(config.supabaseKey || '');
  const [clarityId, setClarityId] = useState(() => localStorage.getItem('app_pregador_clarity_id') || '');

  if (!isOpen) return null;

  const handleSave = () => {
    if (clarityId.trim()) {
      localStorage.setItem('app_pregador_clarity_id', clarityId.trim());
      telemetryService.init(clarityId.trim());
    } else {
      localStorage.removeItem('app_pregador_clarity_id');
    }
    onSaveConfig({ groqKey, openaiKey, supabaseUrl, supabaseKey, clarityId: clarityId.trim() });
    onClose();
  };

  // Read local telemetry metrics
  const getTelemetryStats = () => {
    try {
      const highlights = JSON.parse(localStorage.getItem('app_pregador_bible_highlights') || '{}');
      const completedModules = JSON.parse(localStorage.getItem('app_pregador_completed_modules') || '[]');
      const completedBoss = JSON.parse(localStorage.getItem('app_pregador_completed_boss_fights') || '[]');
      const eventCounters = telemetryService.getEventCounters();
      return {
        highlightsCount: Object.keys(highlights).length,
        modulesCount: completedModules.length,
        bossCount: completedBoss.length,
        sermonsCount: savedSermons.length,
        aiCallsCount: (eventCounters.sermon_generated || 0) + (eventCounters.bible_lens_used || 0) + (eventCounters.mentor_chat_used || 0)
      };
    } catch {
      return { highlightsCount: 0, modulesCount: 0, bossCount: 0, sermonsCount: savedSermons.length, aiCallsCount: 0 };
    }
  };

  const stats = getTelemetryStats();

  // Export all user data as a portable JSON file (Zero-DB Backup — NUNCA exporta chaves de API por segurança!)
  const handleExportBackup = () => {
    const backupPayload = {
      app: 'appPregador 2.0',
      exportedAt: new Date().toISOString(),
      userLevel,
      userXp,
      userCredits,
      sermons: savedSermons,
      bibleHighlights: JSON.parse(localStorage.getItem('app_pregador_bible_highlights') || '{}'),
      completedModules: JSON.parse(localStorage.getItem('app_pregador_completed_modules') || '[]'),
      completedBossFights: JSON.parse(localStorage.getItem('app_pregador_completed_boss_fights') || '[]')
    };

    const blob = new Blob([JSON.stringify(backupPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appPregador-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    telemetryService.trackEvent('backup_exported');
  };

  // Import JSON backup validated by securityService
  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const safeData = validateBackupPayload(event.target.result);
        if (safeData.sermons) localStorage.setItem('app_pregador_sermons', JSON.stringify(safeData.sermons));
        if (safeData.bibleHighlights) localStorage.setItem('app_pregador_bible_highlights', JSON.stringify(safeData.bibleHighlights));
        if (safeData.completedModules) localStorage.setItem('app_pregador_completed_modules', JSON.stringify(safeData.completedModules));
        if (safeData.completedBossFights) localStorage.setItem('app_pregador_completed_boss_fights', JSON.stringify(safeData.completedBossFights));
        telemetryService.trackEvent('backup_imported');
        alert("Backup verificado e restaurado com segurança! Recarregando dados...");
        window.location.reload();
      } catch (err) {
        alert(err.message || "Arquivo de backup inválido ou bloqueado por segurança.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-[140] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-xl">
      <div className="w-full max-w-lg bg-[#0F172A] border-t sm:border border-purple-500/30 rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 max-h-[90dvh] flex flex-col pb-safe">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3.5 shrink-0">
          <h3 className="text-base sm:text-xl font-extrabold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400" /> Configurações & Segurança
          </h3>
          <button
            onClick={onClose}
            aria-label="Fechar configurações"
            className="w-9 h-9 rounded-xl bg-slate-950 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs (Mobile-First 3 Tabs) */}
        <div className="grid grid-cols-3 bg-slate-950 p-1 rounded-xl border border-white/10 gap-1 shrink-0">
          <button
            onClick={() => setActiveTab('api')}
            className={`min-h-[38px] py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'api' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🔑 IA & Clarity
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`min-h-[38px] py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'data' ? 'bg-cyan-500 text-slate-950 shadow font-black' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📊 Telemetria
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`min-h-[38px] py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'account' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            👤 Conta
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {activeTab === 'api' && (
            <div className="space-y-4" data-clarity-mask="true">
              {/* Security Status Badge */}
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2.5 text-[11px] text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Campos protegidos com <strong>Clarity Privacy Masking</strong>, Anti-XSS e Guardrails contra Prompt Injection.</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-cyan-400" /> Microsoft Clarity Project ID (Heatmaps & Sessões)
                </label>
                <input
                  type="text"
                  value={clarityId}
                  onChange={(e) => setClarityId(e.target.value)}
                  placeholder="Ex: lq8x9abcde (ID do projeto no clarity.microsoft.com)"
                  className="w-full min-h-[44px] bg-slate-950 border border-cyan-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
                <p className="text-[10px] text-slate-400">Ativa mapas de calor e gravações de tela gratuitas no painel Microsoft Clarity.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-purple-400" /> Groq API Key (Modelos LLM - Texto)
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  value={groqKey}
                  onChange={(e) => setGroqKey(e.target.value)}
                  placeholder="gsk_..."
                  className="w-full min-h-[44px] bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-amber-400" /> OpenAI API Key (Vozes Emocionais IA)
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  placeholder="sk-proj-..."
                  className="w-full min-h-[44px] bg-slate-950 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-cyan-400" /> Supabase URL (Opcional)
                </label>
                <input
                  type="text"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  placeholder="https://xyz.supabase.co"
                  className="w-full min-h-[44px] bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-cyan-400" /> Supabase Anon Key (Opcional)
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                  placeholder="eyJhbG..."
                  className="w-full min-h-[44px] bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-4">
              {/* Telemetry Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5">
                  <span className="text-[10px] font-bold uppercase text-purple-400 block">Sermões Salvos</span>
                  <span className="text-xl font-black text-white">{stats.sermonsCount}</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5">
                  <span className="text-[10px] font-bold uppercase text-cyan-400 block">Versos Grifados</span>
                  <span className="text-xl font-black text-white">{stats.highlightsCount}</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5">
                  <span className="text-[10px] font-bold uppercase text-emerald-400 block">Módulos Concluídos</span>
                  <span className="text-xl font-black text-white">{stats.modulesCount} / 24</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5">
                  <span className="text-[10px] font-bold uppercase text-amber-400 block">Nível & Insígnias</span>
                  <span className="text-xl font-black text-white">Nv.{userLevel} ({stats.bossCount} 🏆)</span>
                </div>
              </div>

              {/* Zero-DB Export / Import Control */}
              <div className="bg-slate-950/90 border border-cyan-500/30 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-black text-xs uppercase tracking-wider">
                  <BarChart3 className="w-4 h-4" />
                  <span>Backup Seguro (Sem Vazamento de Chaves)</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  O arquivo exportado contém apenas seus sermões, grifos e progresso RPG (suas chaves de API são omitidas por segurança). A importação possui filtro anti-XSS e validação de schema.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleExportBackup}
                    className="min-h-[42px] px-3 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/40 text-cyan-300 text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Exportar JSON</span>
                  </button>

                  <label className="min-h-[42px] px-3 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600 hover:text-white border border-purple-500/40 text-purple-300 text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Importar JSON</span>
                    <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-4 text-center py-4" data-clarity-mask="true">
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
                    className="w-full min-h-[44px] py-2.5 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400 font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Desconectar Minha Conta
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Navegando no <strong>Modo Simulação Local</strong>.</p>
                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="w-full min-h-[44px] py-2.5 rounded-xl bg-purple-600 text-white font-extrabold text-xs shadow-lg hover:brightness-110 transition-all cursor-pointer"
                  >
                    Fazer Login / Criar Conta ⚡
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {activeTab === 'api' && (
          <div className="pt-3 border-t border-white/10 flex justify-end gap-3 shrink-0">
            <button
              onClick={handleSave}
              className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 hover:brightness-110 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" /> Salvar Configurações
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
