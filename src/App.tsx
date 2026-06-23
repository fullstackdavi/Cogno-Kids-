/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Eye, 
  Flame, 
  Heart, 
  CheckSquare, 
  Trophy, 
  BookOpen, 
  Sparkles, 
  Award,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';

// Import our layouts, widgets, and dynamic modules
import Header from './components/Header';
import Footer from './components/Footer';
import CognitiveDailyPlan from './components/CognitiveDailyPlan';

import LogicModule from './modules/LogicModule';
import AttentionModule from './modules/AttentionModule';
import CoordinationModule from './modules/CoordinationModule';
import ValuesModule from './modules/ValuesModule';
import ChecklistsModule from './modules/ChecklistsModule';
import MiniGamesModule from './modules/MiniGamesModule';
import PrintablesModule from './modules/PrintablesModule';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cogno_kids_dark_mode');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      if (isDarkMode) {
        root.classList.add('dark');
        localStorage.setItem('cogno_kids_dark_mode', 'true');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('cogno_kids_dark_mode', 'false');
      }
    }
  }, [isDarkMode]);

  // Smooth scroll helper to push readers up when switching screens
  const handleSetTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Map category tabs to actual functional modules
  const renderModule = () => {
    switch (activeTab) {
      case 'logic':
        return <LogicModule />;
      case 'attention':
        return <AttentionModule />;
      case 'coordination':
        return <CoordinationModule />;
      case 'values':
         return <ValuesModule />;
      case 'checklists':
        return <ChecklistsModule />;
      case 'games':
        return <MiniGamesModule />;
      case 'printables':
        return <PrintablesModule />;
      default:
        return renderHomeScreen();
    }
  };

  const renderHomeScreen = () => {
    return (
      <div id="home-dashboard" className="space-y-16">
        
        {/* Playful and Premium Hero Banner */}
        <section id="hero-section" className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-purple-900 p-8 sm:p-12 text-white shadow-2xl">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3.5 py-1 text-xs font-bold text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" /> APRENDIZADO DIGITAL REFEITO
            </span>
            
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Acelerando as Conexões <br/>
              Cognitivas na <span className="bg-gradient-to-r from-amber-400 via-rose-300 to-indigo-300 bg-clip-text text-transparent">Infância Saudável.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Bem-vindo ao <b>Cogno Kids®</b>—a plataforma digital de maior renome para psicopedagogia e educação pré-escolar doméstica. Oferecemos ferramentas totalmente livres de travas cognitivas, prontas para navegar em casa ou em sala de aula de forma imersiva.
            </p>

            <div className="flex flex-wrap gap-3.5 pt-4">
              <button
                onClick={() => handleSetTab('games')}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-purple-700 transition"
              >
                Explorar Jogos Coletivos <ArrowRight className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => handleSetTab('printables')}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-bold text-slate-200 hover:bg-slate-900 transition"
              >
                Imprimir Fichas em Papel 📝
              </button>
            </div>
          </div>
        </section>

        {/* Dynamic Special Generator: "Plano Cognitivo do Dia" */}
        <section id="daily-cognitive-plan-section" className="space-y-4">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-250 uppercase tracking-wider font-mono">Ficha de Rotina Diária</h2>
          </div>
          <CognitiveDailyPlan />
        </section>

        {/* Dashboard Categories Grid Layout */}
        <section id="categories-grid-section" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-rose-55 dark:border-slate-850 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-850 dark:text-white">Nossos Módulos de Estímulo 🛠️</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Navegue pelas 7 vertentes de desenvolvimento cognitivo infantil, projetados com carinho.</p>
            </div>
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/45 px-3 py-1 rounded-full shrink-0">
              100% Livre • Sem Cobranças
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Logic card */}
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => handleSetTab('logic')}
              className="group cursor-pointer rounded-2xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition">
                  <Brain className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-white">Raciocínio Lógico</h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Associe formas, complete grades geométricas e deduza caminhos.</p>
              </div>
              <span className="mt-4 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                Iniciar Módulo <ArrowRight className="h-3 w-3" />
              </span>
            </motion.div>

            {/* Attention card */}
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => handleSetTab('attention')}
              className="group cursor-pointer rounded-2xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition">
                  <Eye className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-white">Atenção e Reflexo</h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Exercite foco mental sustentado com mosaicos submarinos de caça.</p>
              </div>
              <span className="mt-4 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
                Iniciar Módulo <ArrowRight className="h-3 w-3" />
              </span>
            </motion.div>

            {/* Coordination card */}
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => handleSetTab('coordination')}
              className="group cursor-pointer rounded-2xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition">
                  <Flame className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-white">Coordenação Motora</h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Prancheta fina de tracejados e ondas com o caracol e abelha.</p>
              </div>
              <span className="mt-4 text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1">
                Iniciar Módulo <ArrowRight className="h-3 w-3" />
              </span>
            </motion.div>

            {/* Values card */}
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => handleSetTab('values')}
              className="group cursor-pointer rounded-2xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-955 text-rose-600 dark:text-rose-400 group-hover:bg-rose-600 group-hover:text-white transition">
                  <Heart className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-white">Valores e Empatia</h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Histórias morais emocionantes cobrindo partilhas e honestidade.</p>
              </div>
              <span className="mt-4 text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1">
                Iniciar Módulo <ArrowRight className="h-3 w-3" />
              </span>
            </motion.div>

            {/* Checklists card */}
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => handleSetTab('checklists')}
              className="group cursor-pointer rounded-2xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-955 text-indigo-700 dark:text-indigo-400 group-hover:bg-indigo-700 group-hover:text-white transition">
                  <CheckSquare className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-white">Checklists Cognitivos</h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Marcos de avaliação lúdicos baseados por frentes de 3 a 10 anos.</p>
              </div>
              <span className="mt-4 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                Iniciar Módulo <ArrowRight className="h-3 w-3" />
              </span>
            </motion.div>

            {/* Mini Games card */}
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => handleSetTab('games')}
              className="group cursor-pointer rounded-2xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-955 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition">
                  <Trophy className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-white">Mini Jogos Cognitivos</h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Memory tiles, 7 erros integrados e conexões de filhotes bovinos.</p>
              </div>
              <span className="mt-4 text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
                Iniciar Módulo <ArrowRight className="h-3 w-3" />
              </span>
            </motion.div>

            {/* Printable Exercises card */}
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => handleSetTab('printables')}
              className="group cursor-pointer rounded-2xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-955 text-teal-700 dark:text-teal-400 group-hover:bg-teal-700 group-hover:text-white transition">
                  <BookOpen className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-white">Atividades de Impressão</h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Estudos infantis offline para preencher com giz de cera e tesoura fina.</p>
              </div>
              <span className="mt-4 text-[11px] font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1">
                Iniciar Módulo <ArrowRight className="h-3 w-3" />
              </span>
            </motion.div>

          </div>
        </section>

        {/* Informative scientific Section on child educational milestones */}
        <section id="cognitive-info-section" className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-8 sm:p-10 border border-slate-105 dark:border-slate-850">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-black tracking-widest text-[#a1a1aa] font-mono block">CUIDADO CLÍNICO INTEGRATIVO</span>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">Como Desenvolver o Potencial Cognitivo com Segurança? 🧠🌱</h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                O córtex pré-frontal e outras regiões cerebrais de crianças entre 3 e 10 anos passam por intenso desenvolvimento neural, incluindo processos de mielinização e fortalecimento das conexões sinápticas. A oferta de estímulos graduais e organizados, combinando jogos digitais educativos com atividades motoras em papel, pode favorecer a consolidação da aprendizagem, o desenvolvimento cognitivo e a formação de habilidades adaptativas.
              </p>
              
              <div className="space-y-2 pt-2 text-xs text-slate-700 dark:text-slate-300 font-semibold">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">✔</span>
                  <span>Associe atividades numéricas com estímulos táteis práticos.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">✔</span>
                  <span>Discuta as histórias de valores ao ler conjuntamente na lareira de casa.</span>
                </div>
              </div>
            </div>

            {/* Beautiful visual graphic list elements detailing learning benefits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-150 dark:border-slate-850">
                <Users className="h-6 w-6 text-indigo-500 dark:text-indigo-400 mb-2" />
                <h4 className="font-extrabold text-slate-800 dark:text-white text-sm">Fator Social</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Estímulos cooperativos aumentam resiliência de grupo na infância.</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-150 dark:border-slate-850">
                <Compass className="h-6 w-6 text-rose-500 dark:text-rose-400 mb-2" />
                <h4 className="font-extrabold text-slate-800 dark:text-white text-sm">Controle Motor</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Tracejados diários dão precisão fina de escrita nas quinas primárias.</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-150 dark:border-slate-850 col-span-2">
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0 mt-0.5">🧬</span>
                  <div>
                    <h4 className="font-extrabold text-slate-800 dark:text-white text-sm">Selo de Neuroplasticidade Harmônica</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">O Cogno Kids® foi totalmente concebido com base em conselhos de pedagogas de desenvolvimento sênior brasileiras.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans antialiased selection:bg-purple-100 dark:selection:bg-purple-900/45 selection:text-purple-700 dark:selection:text-purple-300 transition-colors duration-200">
      
      {/* Brand Navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={handleSetTab} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
      />

      {/* Main Dynamic View Content Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {renderModule()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Pedagogy Footer */}
      <Footer setActiveTab={handleSetTab} />

    </div>
  );
}
