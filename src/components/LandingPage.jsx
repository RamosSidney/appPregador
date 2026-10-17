import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  BookOpen,
  Flame,
  Users,
  Award,
  Monitor,
  Volume2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Mic,
  ChevronDown,
  Play,
  Star,
  X,
  MessageSquare,
  Share2,
  Compass
} from 'lucide-react';
import AuthCard from './AuthCard';

const ECOSYSTEM_FEATURES = [
  {
    icon: BookOpen,
    badge: '100% Offline + IA',
    title: 'Bíblia NVI + Lente Cultural Gen Z',
    description:
      'Navegue pelos 66 livros com busca instantânea, marcação por cores e acione a IA em qualquer versículo para gerar Exegese Profunda, Tradução Gen Z/Alpha e Quebra-Gelo de Célula.',
    accent: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-500/30',
    glow: 'shadow-cyan-950/40'
  },
  {
    icon: Flame,
    badge: 'Em 3 Segundos',
    title: 'Gerador de Sermões Disruptivos',
    description:
      'Cruze as dores reais da juventude (ansiedade, identidade, propósito, vício digital) com referências bíblicas e receba esboços completos + roteiros prontos para Reels e TikTok.',
    accent: 'from-purple-600 to-indigo-600',
    border: 'border-purple-500/30',
    glow: 'shadow-purple-950/40'
  },
  {
    icon: Users,
    badge: 'Voz & Chat IA',
    title: 'Mentoria com Gigantes da Fé',
    description:
      'Converse por texto ou chamada de voz em tempo real com mentores inspirados em C.S. Lewis, Charles Spurgeon, Paulo de Tarso e Agostinho para destravar seus estudos.',
    accent: 'from-amber-500 to-orange-600',
    border: 'border-amber-500/30',
    glow: 'shadow-amber-950/40'
  },
  {
    icon: Monitor,
    badge: 'Teleprompter Pro',
    title: 'Modo Púlpito de Alto Contraste',
    description:
      'Leve seu esboço direto para o altar com rolagem automática ajustável, controle de tamanho de fonte, cronômetro regressivo de pregação e gravação de voz ao vivo.',
    accent: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500/30',
    glow: 'shadow-emerald-950/40'
  },
  {
    icon: Volume2,
    badge: 'Text-to-Speech',
    title: 'Narração & Áudio Dinâmico',
    description:
      'Ouça capítulos inteiros da Bíblia ou seus esboços de pregação narrados com timbres pastorais enquanto estuda, caminha ou se prepara para ministrar.',
    accent: 'from-pink-500 to-rose-600',
    border: 'border-pink-500/30',
    glow: 'shadow-pink-950/40'
  },
  {
    icon: Award,
    badge: 'Gamificação Cristã',
    title: 'Academia RPG do Pregador',
    description:
      'Evolua seu nível de liderança completando missões práticas de homilética, exegese, oratória e discipulado digital, desbloqueando bônus de Raios IA.',
    accent: 'from-indigo-500 to-purple-600',
    border: 'border-indigo-500/30',
    glow: 'shadow-indigo-950/40'
  }
];

const STEPS = [
  {
    step: '01',
    title: 'Escolha o Texto ou a Dor da Juventude',
    description:
      'Selecione um versículo na Bíblia NVI integrada ou escolha até 2 dores reais que sua igreja, célula ou juventude está enfrentando hoje.'
  },
  {
    step: '02',
    title: 'Ative o Cérebro Conectado 2.0',
    description:
      'Em 3 segundos, nossa IA teológica estrutura o Gancho Cultural, o Download Bíblico com referências cruzadas, o Desafio Prático e o Roteiro de Reels.'
  },
  {
    step: '03',
    title: 'Suba ao Púlpito ou Compartilhe na Rede',
    description:
      'Abra no Modo Púlpito (Teleprompter) para pregar com segurança no altar ou envie o estudo formatado direto para o WhatsApp da sua liderança.'
  }
];

const FAQS = [
  {
    q: 'A teologia gerada pelo appPregador 2.0 é fiel às Escrituras?',
    a: 'Sim! O motor de IA foi instruído com guardrails teológicos cristãos ortodoxos e cristocêntricos. Ele moderniza a linguagem, as metáforas e a comunicação para conectar com a Geração Z e Alpha, mantendo 100% de fidelidade ao texto bíblico original.'
  },
  {
    q: 'Funciona no celular sem precisar baixar na loja de aplicativos?',
    a: 'Sim! O appPregador 2.0 é um Web App Progressivo (PWA) 100% Mobile-First. Você pode usar direto no navegador ou clicar em "Adicionar à Tela de Início" no iPhone ou Android para usá-lo em tela cheia como aplicativo nativo, inclusive com a Bíblia NVI offline.'
  },
  {
    q: 'Para quem o ecossistema foi desenhado?',
    a: 'Para pastores, líderes de jovens e adolescentes, líderes de célula/pequenos grupos, professores de EBD e criadores de conteúdo cristão que desejam comunicar o Evangelho com relevância e profundidade.'
  },
  {
    q: 'Meus sermões e anotações ficam salvos com segurança?',
    a: 'Totalmente. Seus esboços, favoritos e marcações bíblicas ficam salvos no seu dispositivo com proteção contra vazamento de dados e opção de Exportação/Backup em arquivo JSON a qualquer momento.'
  }
];

export default function LandingPage({ onLogin, onRegister, onGuestBypass }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [activeDemoTab, setActiveDemoTab] = useState('genz'); // 'genz' | 'quebragelo' | 'reels'

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-dvh w-full bg-[#07090E] text-slate-100 overflow-x-hidden selection:bg-purple-500 selection:text-white relative">
      {/* Ambient Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[360px] sm:w-[620px] h-[360px] sm:h-[620px] bg-purple-600/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[340px] sm:w-[580px] h-[340px] sm:h-[580px] bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b14_1px,transparent_1px),linear-gradient(to_bottom,#1e293b14_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      {/* Top Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-[#07090E]/85 backdrop-blur-2xl border-b border-white/10 pt-safe">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-900/50 border border-white/20 shrink-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base sm:text-xl tracking-tight text-white">
                  appPregador
                </span>
                <span className="text-[10px] sm:text-xs font-black px-1.5 py-0.5 rounded-md bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border border-cyan-400/40 text-cyan-300">
                  2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold hidden sm:block">
                Ecossistema de Pregação & Liderança Gen Z
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-300">
            <button onClick={() => scrollToSection('recursos')} className="hover:text-cyan-400 transition-colors cursor-pointer">
              Recursos
            </button>
            <button onClick={() => scrollToSection('demonstracao')} className="hover:text-cyan-400 transition-colors cursor-pointer">
              Lente IA ao Vivo
            </button>
            <button onClick={() => scrollToSection('como-funciona')} className="hover:text-cyan-400 transition-colors cursor-pointer">
              Como Funciona
            </button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-cyan-400 transition-colors cursor-pointer">
              Dúvidas
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="min-h-[40px] sm:min-h-[44px] px-3.5 sm:px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/15 text-xs sm:text-sm font-bold text-slate-200 hover:text-white transition-all cursor-pointer"
            >
              Entrar
            </button>
            <button
              onClick={onGuestBypass}
              className="min-h-[40px] sm:min-h-[44px] px-3.5 sm:px-5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-purple-900/40 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Testar Grátis</span>
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-8 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: High-Converting Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-200 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Novo Motor IA Teológico + Voz em Tempo Real</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]"
            >
              Transforme Versículos em{' '}
              <span className="bg-gradient-to-r from-purple-400 via-cyan-300 to-amber-300 bg-clip-text text-transparent">
                Mensagens Inesquecíveis
              </span>{' '}
              para a Nova Geração.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              O primeiro ecossistema cristão que une <strong className="text-white">Bíblia NVI Offline</strong>,{' '}
              <strong className="text-cyan-300">Exegese & Tradução Cultural Gen Z/Alpha</strong>,{' '}
              <strong className="text-purple-300">Mentoria por Voz com Gigantes da Fé</strong> e{' '}
              <strong className="text-amber-300">Teleprompter de Púlpito</strong> em uma única plataforma.
            </motion.p>

            {/* Primary CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <button
                onClick={onGuestBypass}
                className="min-h-[54px] px-7 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-xl shadow-purple-900/50 flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
              >
                <Smartphone className="w-5 h-5 text-amber-300" />
                <span>Acessar App Agora (Sem Cadastro)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="min-h-[54px] px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-purple-500/30 text-slate-100 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Criar Conta / Login</span>
              </button>
            </motion.div>

            {/* Quick Trust Pills */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-slate-400 font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Bíblia NVI Completa Inclusa</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>100% Mobile-First (iOS & Android)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>Teologia Cristocêntrica</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive App Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md rounded-3xl bg-gradient-to-b from-slate-900/95 to-[#0B0E14] border border-purple-500/30 p-4 sm:p-6 shadow-2xl shadow-purple-950/70 overflow-hidden">
              {/* Top Status Bar Mockup */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  <span className="text-[11px] font-bold text-slate-400 ml-1">Cérebro Conectado 2.0</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[10px] font-black">
                  ⚡ 20 RAIOS IA ATIVOS
                </span>
              </div>

              {/* Verse Preview Card */}
              <div className="rounded-2xl bg-slate-950/90 border border-white/10 p-4 mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-400">
                    📖 Romanos 12:2 (NVI)
                  </span>
                  <span className="text-[10px] font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded-md border border-purple-500/30">
                    Lente Gen Z Ativa
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                  "Não se amoldem ao padrão deste mundo, mas transformem-se pela renovação da sua mente..."
                </p>
              </div>

              {/* Generated AI Preview Output */}
              <div className="rounded-2xl bg-gradient-to-br from-purple-950/50 via-slate-900/90 to-cyan-950/40 border border-purple-500/30 p-4 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase tracking-wider">
                  <Flame className="w-4 h-4 fill-amber-400" />
                  <span>Tradução Cultural & Gancho Viral</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <strong className="text-cyan-300">⚡ Metáfora Digital:</strong> "Não deixe o algoritmo do mundo rodar o código-fonte da sua identidade. Faça um <span className="text-amber-300 font-bold">update de firmware</span> na sua mente pelo Espírito Santo para destravar o propósito real de Deus."
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={onGuestBypass}
                    className="py-2.5 px-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-[11px] font-extrabold text-purple-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Gerar Esboço</span>
                  </button>
                  <button
                    onClick={onGuestBypass}
                    className="py-2.5 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-[11px] font-extrabold text-cyan-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Mic className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Ouvir Narração</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="relative z-10 border-y border-white/10 bg-slate-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl sm:text-4xl font-black text-white">66 Livros</p>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">Bíblia NVI 100% Integrada</p>
          </div>
          <div>
            <p className="text-2xl sm:text-4xl font-black text-cyan-400">3 Seg</p>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">Para Gerar Esboços & Quebra-Gelos</p>
          </div>
          <div>
            <p className="text-2xl sm:text-4xl font-black text-purple-400">4 Mentores</p>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">Históricos com Voz em Tempo Real</p>
          </div>
          <div>
            <p className="text-2xl sm:text-4xl font-black text-amber-400">100% Mobile</p>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">Pronto para o Altar e Célula</p>
          </div>
        </div>
      </section>

      {/* BENTO GRID: OS 6 MÓDULOS DO ECOSSISTEMA */}
      <section id="recursos" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
            Ecossistema Completo 6 em 1
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Tudo o que um Pregador da Nova Geração Precisa no Bolso
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Deixe para trás blocos de notas espalhados. Prepare, aprofunde, treine por voz e suba ao púlpito usando uma única ferramenta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {ECOSYSTEM_FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className={`rounded-3xl bg-slate-900/75 backdrop-blur-xl border ${feat.border} p-6 sm:p-7 shadow-xl ${feat.glow} flex flex-col justify-between transition-all`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.accent} flex items-center justify-center shadow-lg border border-white/20`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-950/90 border border-white/10 text-slate-300">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <button
                  onClick={onGuestBypass}
                  className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-extrabold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span>Experimentar módulo agora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE LIVE DEMO SECTION */}
      <section id="demonstracao" className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 bg-slate-950/70 border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              Veja na Prática
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              O Que Acontece Quando Você Toca em um Versículo?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              alterne entre as abas abaixo para ver exemplos reais do que o motor do appPregador 2.0 entrega instantaneamente:
            </p>
          </div>

          {/* Demo Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
            <button
              onClick={() => setActiveDemoTab('genz')}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeDemoTab === 'genz'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              💡 Tradução & Exegese Gen Z
            </button>
            <button
              onClick={() => setActiveDemoTab('quebragelo')}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeDemoTab === 'quebragelo'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              🎲 Quebra-Gelo de Célula
            </button>
            <button
              onClick={() => setActiveDemoTab('reels')}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeDemoTab === 'reels'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              🎬 Roteiro Viral (Reels / TikTok)
            </button>
          </div>

          {/* Demo Content Card */}
          <div className="rounded-3xl bg-[#0B0E14] border border-purple-500/30 p-5 sm:p-8 shadow-2xl">
            {activeDemoTab === 'genz' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs sm:text-sm font-black text-cyan-400">
                    📖 Salmos 119:105 — "Lâmpada para os meus pés é a tua palavra..."
                  </span>
                  <span className="text-[11px] font-bold text-amber-300">Exegese + Cultura</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-900/90 border border-white/10 p-4 space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-300">
                      🏛️ Contexto Histórico Original
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      No antigo Oriente Médio, as lâmpadas a óleo de barro não iluminavam a estrada inteira a quilômetros — elas clareavam apenas o <strong>próximo passo imediato</strong> para evitar abismos e serpentes.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-purple-950/30 border border-purple-500/30 p-4 space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-300">
                      ⚡ Tradução na Linguagem Gen Z
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      "A Palavra de Deus não te dá o spoiler do mapa inteiro da temporada, mas renderiza em alta definição o próximo pixel que você precisa pisar hoje sem cair em cilada."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeDemoTab === 'quebragelo' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs sm:text-sm font-black text-amber-400">
                    🎲 Dinâmica Prática para Célula de Jovens (15 min)
                  </span>
                  <span className="text-[11px] font-bold text-cyan-300">Pronto para Usar</span>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <p>
                    <strong className="text-white">1. Desafio do Modo Avião:</strong> Peça para todos olharem a porcentagem atual de bateria do celular e perguntarem: <em>"Se sua fé hoje fosse a bateria do seu celular, em quantos % ela estaria?"</em>
                  </p>
                  <p>
                    <strong className="text-white">2. Conexão Bíblica (Isaías 40:29-31):</strong> Mostre a diferença entre carregadores piratas (distrações rápidas do feed) e estar conectado na fonte original que renova as forças.
                  </p>
                </div>
              </div>
            )}

            {activeDemoTab === 'reels' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs sm:text-sm font-black text-pink-400">
                    🎬 Roteiro de 30 Segundos para Reels / Shorts
                  </span>
                  <span className="text-[11px] font-bold text-emerald-300">Alta Retenção</span>
                </div>
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <p>
                    <strong className="text-amber-300">[00s - 03s | GANCHO VISUAL]:</strong> "Você já sentiu que está vivendo a vida no 2x, mas sem sair do lugar?"
                  </p>
                  <p>
                    <strong className="text-cyan-300">[04s - 18s | VIRADA DE CHAVE]:</strong> "Em Mateus 11:28, Jesus não oferece mais uma lista de tarefas religiosas. Ele oferece descanso para a alma sobrecarregada de notificações."
                  </p>
                  <p>
                    <strong className="text-purple-300">[19s - 30s | CHAMADA PRÁTICA]:</strong> "Hoje, tire 10 minutos no modo avião e fale com Aquele que conhece seu coração. Salve esse vídeo para lembrar."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA EM 3 PASSOS */}
      <section id="como-funciona" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-purple-400">
            Fluxo Simples & Rápido
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Do Estudo Bíblico ao Púlpito em 3 Passos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((item, i) => (
            <div
              key={i}
              className="rounded-3xl bg-slate-900/60 border border-white/10 p-6 sm:p-8 relative overflow-hidden"
            >
              <span className="text-5xl font-black text-purple-500/20 absolute top-4 right-6 select-none">
                {item.step}
              </span>
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 font-black text-sm flex items-center justify-center mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-black text-white mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="relative z-10 py-14 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
            Perguntas Frequentes
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Tire Suas Dúvidas Sobre o appPregador 2.0
          </h2>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  className="w-full min-h-[54px] px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-extrabold text-white">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL HIGH-IMPACT CTA BANNER */}
      <section className="relative z-10 py-14 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-purple-950/90 via-slate-900 to-cyan-950/90 border border-purple-500/40 p-7 sm:p-12 text-center shadow-2xl shadow-purple-950/80 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-amber-300" />
            <span>Comece com 20 Raios IA Gratuitos</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white max-w-2xl mx-auto leading-tight">
            Pronto para Preparar Sua Próxima Mensagem em Nível Extraordinário?
          </h2>

          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto">
            Entre agora mesmo no modo simulação gratuito com um clique ou crie sua conta para salvar sua biblioteca de sermões.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onGuestBypass}
              className="w-full sm:w-auto min-h-[54px] px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white font-black text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Smartphone className="w-5 h-5 text-amber-300" />
              <span>Entrar Direto no App ⚡</span>
            </button>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full sm:w-auto min-h-[54px] px-7 py-4 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-white/20 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Fazer Login / Criar Conta</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 py-8 px-4 sm:px-6 text-center text-xs text-slate-500 pb-safe">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="font-bold text-slate-300">appPregador 2.0</span>
            <span>— Ecossistema Cristão para Geração Z & Alpha</span>
          </div>
          <p>© {new Date().getFullYear()} appPregador 2.0 • Protegido por Guardrails de IA & Segurança Local-First</p>
        </div>
      </footer>

      {/* AUTH MODAL (LOGIN / REGISTER) */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          >
            <div className="relative w-full max-w-lg my-auto">
              <button
                onClick={() => setIsAuthModalOpen(false)}
                aria-label="Fechar modal de login"
                className="absolute -top-3 -right-2 sm:top-3 sm:right-3 z-50 w-10 h-10 rounded-full bg-slate-900 border border-white/20 text-slate-300 hover:text-white flex items-center justify-center shadow-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <AuthCard
                onSubmitLogin={onLogin}
                onSubmitRegister={onRegister}
                onGuestBypass={onGuestBypass}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
