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
  Laptop,
  Tablet,
  Mic,
  ChevronDown,
  X,
  GraduationCap,
  Sun,
  Moon
} from 'lucide-react';
import AuthCard from './AuthCard';

const MULTI_DEVICE_SHOWCASE = [
  {
    device: 'Smartphone (iOS & Android)',
    icon: Smartphone,
    tag: 'Estudo & Mentoria no Bolso',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80',
    title: 'Mentoria por Voz e Bíblia Sempre com Você',
    description:
      'Tire dúvidas teológicas por voz com gigantes da fé, ouça capítulos narrados em áudio e anote insights bíblicos a qualquer hora do dia.'
  },
  {
    device: 'Notebook & Desktop',
    icon: Laptop,
    tag: 'Preparo Profundo de Aulas & Sermões',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80',
    title: 'Laboratório Completo de Exegese e Ensino',
    description:
      'Estruture esboços expositivos, estudos para pequenos grupos, referências cruzadas e trilhas da Academia em uma tela ampla de estudo.'
  },
  {
    device: 'Tablet & iPad no Altar',
    icon: Tablet,
    tag: 'Modo Púlpito & Sala de Aula',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
    title: 'Teleprompter Inteligente para Ministrar',
    description:
      'Suba ao púlpito ou lidere sua classe com rolagem automática, controle de fonte de alto contraste e cronômetro de pregação integrado.'
  }
];

const ECOSYSTEM_FEATURES = [
  {
    icon: Users,
    badge: 'Voz & Chat IA',
    title: 'Mentoria com Gigantes da Fé',
    description:
      'Estude teologia, apologética e liderança conversando por texto ou voz com mentores inspirados em C.S. Lewis, Charles Spurgeon, Bonhoeffer, Agostinho e João Wesley.',
    accent: 'from-amber-500 to-orange-600',
    border: 'border-amber-500/30',
    glow: 'shadow-amber-950/40'
  },
  {
    icon: BookOpen,
    badge: 'Offline + Exegese IA',
    title: 'Bíblia Sagrada com Lente de Estudo',
    description:
      'Navegue pelos 66 livros com busca rápida, marcação por cores e toque em qualquer versículo para destravar contexto histórico, referências cruzadas e aplicação.',
    accent: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-500/30',
    glow: 'shadow-cyan-950/40'
  },
  {
    icon: GraduationCap,
    badge: 'Homilética & Ensino',
    title: 'Estruturador de Estudos e Esboços',
    description:
      'Elabore pregações expositivas, aulas bíblicas, estudos de célula e roteiros de discipulado fundamentados nas Escrituras em poucos segundos.',
    accent: 'from-purple-600 to-indigo-600',
    border: 'border-purple-500/30',
    glow: 'shadow-purple-950/40'
  },
  {
    icon: Award,
    badge: 'Catálogo de Séries',
    title: 'Academia de Ensino (Estilo Streaming)',
    description:
      'Assista e estude séries práticas de hermenêutica, oratória, liderança cristã e discipulado organizadas em temporadas e episódios interativos.',
    accent: 'from-indigo-500 to-purple-600',
    border: 'border-indigo-500/30',
    glow: 'shadow-indigo-950/40'
  },
  {
    icon: Monitor,
    badge: 'Teleprompter Pro',
    title: 'Modo Púlpito de Alto Contraste',
    description:
      'Leve seu estudo ou sermão direto para o altar com rolagem automática ajustável, ajuste de fonte e cronômetro regressivo de ministração.',
    accent: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500/30',
    glow: 'shadow-emerald-950/40'
  },
  {
    icon: Volume2,
    badge: 'Áudio Dinâmico',
    title: 'Narração Bíblica & Estudos em Áudio',
    description:
      'Ouça capítulos da Bíblia e seus próprios esboços de ensino com fundo musical devocional enquanto revisa sua ministração.',
    accent: 'from-pink-500 to-rose-600',
    border: 'border-pink-500/30',
    glow: 'shadow-pink-950/40'
  }
];

const STEPS = [
  {
    step: '01',
    title: 'Escolha o Texto Bíblico ou Tema de Ensino',
    description:
      'Abra a Bíblia Sagrada integrada ou selecione a modalidade de estudo (Pregação Expositiva, Aula Bíblica, Célula ou Discipulado).'
  },
  {
    step: '02',
    title: 'Aprofunde com Exegese e Mentoria Histórica',
    description:
      'Receba o contexto histórico, referências cruzadas e consulte mentores como Spurgeon ou C.S. Lewis por texto ou voz para enriquecer sua aula.'
  },
  {
    step: '03',
    title: 'Ensine em Qualquer Lugar e Dispositivo',
    description:
      'Exporte seu estudo, compartilhe com seus alunos ou abra no Modo Púlpito no celular, tablet ou computador.'
  }
];

const FAQS = [
  {
    q: 'O appPregador 2.0 funciona em celular, tablet e computador?',
    a: 'Sim! A plataforma é 100% responsiva e multi-dispositivo. Você pode preparar seu estudo no notebook, revisar no celular pelo caminho e usar o tablet no púlpito ou sala de aula.'
  },
  {
    q: 'A teologia dos estudos e mentores é fiel às Escrituras?',
    a: 'Totalmente. Todo o motor de ensino e mentoria opera sob diretrizes cristocêntricas, priorizando a exegese bíblica fiel, o contexto histórico e a edificação da Igreja.'
  },
  {
    q: 'Como funciona a Sala de Mentoria e a Academia?',
    a: 'Na Sala de Mentoria você dialoga por texto ou voz com perfis teológicos baseados nas obras de grandes mestres cristãos. Já na Academia, você estuda séries estruturadas no formato de episódios com certificação prática.'
  },
  {
    q: 'Meus estudos e esboços ficam salvos com segurança?',
    a: 'Sim. Sua biblioteca de estudos, destaques bíblicos e progresso na Academia ficam salvos com segurança e podem ser exportados em backup a qualquer momento.'
  }
];

export default function LandingPage({
  onLogin,
  onRegister,
  onGuestBypass,
  themeMode = 'dark',
  onToggleTheme
}) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [activeDemoTab, setActiveDemoTab] = useState('exegese');
  const isLight = themeMode === 'light';

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

      {/* Top Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-[#07090E]/85 backdrop-blur-2xl border-b border-white/10 pt-safe">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg border border-white/20 shrink-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base sm:text-xl tracking-tight text-white">
                  appPregador
                </span>
                <span className="text-[10px] sm:text-xs font-black px-1.5 py-0.5 rounded-md bg-purple-500/20 border border-purple-400/40 text-purple-300">
                  2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold hidden sm:block">
                Mentoria, Ensino & Estudos Bíblicos
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-300">
            <button onClick={() => scrollToSection('dispositivos')} className="hover:text-cyan-400 transition-colors cursor-pointer">
              Multi-Dispositivo
            </button>
            <button onClick={() => scrollToSection('recursos')} className="hover:text-cyan-400 transition-colors cursor-pointer">
              Mentoria & Ensino
            </button>
            <button onClick={() => scrollToSection('demonstracao')} className="hover:text-cyan-400 transition-colors cursor-pointer">
              Estudo ao Vivo
            </button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-cyan-400 transition-colors cursor-pointer">
              Dúvidas
            </button>
          </nav>

          {/* Right Actions + Theme Switcher */}
          <div className="flex items-center gap-2">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label="Alternar Modo Claro ou Escuro"
                title={isLight ? 'Mudar para Modo Escuro' : 'Mudar para Modo Claro'}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/15 flex items-center justify-center transition-all cursor-pointer"
              >
                {isLight ? (
                  <Moon className="w-4 h-4 text-indigo-600" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400" />
                )}
              </button>
            )}

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="min-h-[40px] sm:min-h-[44px] px-3 sm:px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/15 text-xs sm:text-sm font-bold text-slate-200 hover:text-white transition-all cursor-pointer"
            >
              Entrar
            </button>
            <button
              onClick={onGuestBypass}
              className="min-h-[40px] sm:min-h-[44px] px-3.5 sm:px-5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white text-xs sm:text-sm font-extrabold shadow-lg flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Começar Agora</span>
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION: FOCO EM MENTORIA, ENSINO & ESTUDOS */}
      <section className="relative z-10 pt-8 pb-14 sm:pt-14 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-200 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest shadow-lg"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Plataforma de Mentoria, Ensino & Estudos Bíblicos</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]"
            >
              Profundidade Bíblica,{' '}
              <span className="bg-gradient-to-r from-purple-400 via-cyan-300 to-amber-300 bg-clip-text text-transparent">
                Mentoria Teológica
              </span>{' '}
              e Ensino em Qualquer Tela.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Prepare estudos bíblicos profundos, dialogue por voz com grandes mestres da fé cristã, domine a exposição das Escrituras na Academia e ministre com segurança no celular, tablet ou computador.
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
                className="min-h-[54px] px-7 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
              >
                <span>Acessar Plataforma Agora</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="min-h-[54px] px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-purple-500/30 text-slate-100 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Entrar na Minha Conta</span>
              </button>
            </motion.div>

            {/* Quick Trust Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-slate-400 font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Bíblia Sagrada Completa Offline</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Celular, Tablet & Computador</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>Mentoria & Exegese Cristocêntrica</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Hero Showcase with Study Image + Floating UI Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md rounded-3xl bg-slate-900/95 border border-purple-500/30 overflow-hidden shadow-2xl">
              {/* Top Study Hero Photo */}
              <div className="relative h-52 sm:h-60 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1000&q=80"
                  alt="Estudo Bíblico e Preparação de Ensino"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-extrabold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Mentoria & Exegese ao Vivo
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                    Bíblia Sagrada + Mentores Históricos
                  </p>
                  <h3 className="text-lg font-black text-white leading-tight">
                    Estude cada versículo com contexto histórico e aplicação pastoral
                  </h3>
                </div>
              </div>

              {/* Interactive Card Body */}
              <div className="p-4 sm:p-5 space-y-3.5">
                <div className="rounded-2xl bg-slate-950/90 border border-white/10 p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-purple-300">
                      🎓 Mentoria com C.S. Lewis & Spurgeon
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400">Voz & Texto</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    "Um bom ensino bíblico ilumina a mente com a verdade das Escrituras e aquece o coração com a graça de Cristo."
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={onGuestBypass}
                    className="py-3 px-3 rounded-xl bg-purple-600 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md hover:brightness-110 transition-all cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Iniciar Estudo</span>
                  </button>
                  <button
                    onClick={onGuestBypass}
                    className="py-3 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-white/15 text-cyan-300 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Ouvir Mentores</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MULTI-DEVICE VISUAL SHOWCASE SECTION */}
      <section id="dispositivos" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 bg-slate-950/70 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
              Experiência Multi-Dispositivo Sem Limites
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Funciona Perfeitamente no Celular, Tablet e Computador
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Comece a pesquisar um texto bíblico no smartphone, estruture sua aula no notebook e suba ao púlpito com o tablet. Tudo sincronizado e adaptado para cada tela.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {MULTI_DEVICE_SHOWCASE.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="rounded-3xl bg-[#0F172A] border border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    {/* Visual Image Header */}
                    <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                      <img
                        src={item.image}
                        alt={item.device}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/30 to-transparent" />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-extrabold text-cyan-300 flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-amber-400" />
                        <span>{item.device}</span>
                      </div>
                    </div>

                    {/* Text Description */}
                    <div className="p-6 space-y-2.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-400">
                        {item.tag}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <button
                      onClick={onGuestBypass}
                      className="w-full py-3 rounded-xl bg-slate-950/90 hover:bg-purple-600 border border-white/10 text-xs font-extrabold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Abrir neste dispositivo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENTO GRID: OS 6 PILARES DE MENTORIA, ENSINO E ESTUDO */}
      <section id="recursos" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-purple-400">
            Formação, Exegese & Ensino
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Um Ecossistema Completo para Quem Ama Ensinar a Palavra
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Reunimos as melhores ferramentas de estudo bíblico, mentoria histórica, academia em vídeo/séries e teleprompter de púlpito em um só lugar.
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
                  <span>Explorar ferramenta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE LIVE STUDY DEMO */}
      <section id="demonstracao" className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 bg-slate-950/70 border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              Demonstração Prática de Estudo
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Veja Como o App Aprofunda Seus Estudos Bíblicos
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
            <button
              onClick={() => setActiveDemoTab('exegese')}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeDemoTab === 'exegese'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              📖 Exegese & Contexto Histórico
            </button>
            <button
              onClick={() => setActiveDemoTab('mentoria')}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeDemoTab === 'mentoria'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              🎓 Conselho de Mentoria
            </button>
            <button
              onClick={() => setActiveDemoTab('celula')}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeDemoTab === 'celula'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              👥 Roteiro de Ensino & Grupo
            </button>
          </div>

          <div className="rounded-3xl bg-[#0B0E14] border border-purple-500/30 p-5 sm:p-8 shadow-2xl">
            {activeDemoTab === 'exegese' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs sm:text-sm font-black text-cyan-400">
                    📖 Salmos 119:105 — "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho."
                  </span>
                  <span className="text-[11px] font-bold text-amber-300">Estudo Profundo</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-900/90 border border-white/10 p-4 space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-300">
                      🏛️ Contexto Histórico & Cultural
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      No antigo Oriente Médio, o viajante noturno carregava uma pequena lamparina de barro a azeite. Ela não projetava um facho a quilômetros, mas iluminava com segurança o próximo passo diante de terrenos rochosos.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-purple-950/30 border border-purple-500/30 p-4 space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-300">
                      🎯 Aplicação para o Ensino Hoje
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      Deus raramente revela todo o roteiro dos próximos dez anos de uma só vez, mas Sua Palavra garante clareza suficiente para a obediência de hoje, desenvolvendo dependência diária e confiança.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeDemoTab === 'mentoria' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs sm:text-sm font-black text-amber-400">
                    🎓 Diálogo com Charles Spurgeon & C.S. Lewis
                  </span>
                  <span className="text-[11px] font-bold text-cyan-300">Mentoria Histórica</span>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <p>
                    <strong className="text-white">Pergunta do Aluno:</strong> <em>"Como ensinar doutrinas profundas de forma que jovens e adultos compreendam com clareza?"</em>
                  </p>
                  <p>
                    <strong className="text-purple-300">Resposta da Mentoria:</strong> "Traduza conceitos abstratos em imagens concretas do cotidiano, assim como Jesus ensinava as multidões por meio de sementes, redes e pérolas. A profundidade não está em palavras difíceis, mas na nitidez com que Cristo é visto no texto."
                  </p>
                </div>
              </div>
            )}

            {activeDemoTab === 'celula' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs sm:text-sm font-black text-emerald-400">
                    👥 Estrutura de Aula e Pequeno Grupo
                  </span>
                  <span className="text-[11px] font-bold text-purple-300">Pronto para Ministrar</span>
                </div>
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <p>
                    <strong className="text-amber-300">1. Quebra-Gelo Reflexivo:</strong> Pergunta inicial para despertar a participação de todos os presentes.
                  </p>
                  <p>
                    <strong className="text-cyan-300">2. Exposição do Texto & Referências Cruzadas:</strong> Três pontos claros conectando o Antigo e o Novo Testamento.
                  </p>
                  <p>
                    <strong className="text-purple-300">3. Desafio Prático de Discipulado:</strong> Como aplicar o princípio estudado durante a semana na família, no trabalho e na igreja.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA EM 3 PASSOS */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-purple-400">
            Fluxo de Estudo & Preparo
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Da Leitura Bíblica ao Ensino em 3 Passos
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
            Dúvidas Sobre a Plataforma de Estudos
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
        <div className="rounded-3xl bg-gradient-to-br from-purple-950/90 via-slate-900 to-cyan-950/90 border border-purple-500/40 p-7 sm:p-12 text-center shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-amber-300" />
            <span>Acesso Imediato em Qualquer Dispositivo</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white max-w-2xl mx-auto leading-tight">
            Comece Agora Seus Estudos, Mentorias e Preparo de Mensagens
          </h2>

          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto">
            Experimente gratuitamente sem precisar de cadastro ou acesse sua conta para sincronizar sua biblioteca de estudos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onGuestBypass}
              className="w-full sm:w-auto min-h-[54px] px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white font-black text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Smartphone className="w-5 h-5 text-amber-300" />
              <span>Entrar Direto na Plataforma ⚡</span>
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
            <span>— Mentoria, Ensino & Estudos Bíblicos</span>
          </div>
          <p>© {new Date().getFullYear()} appPregador 2.0 • Disponível para Celular, Tablet e Computador</p>
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
