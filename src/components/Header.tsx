/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Brain, 
  BookOpen, 
  FileText, 
  Sun,
  Moon 
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ activeTab, setActiveTab, isDarkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-rose-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors duration-200">
      <div id="nav-container" className="mx-auto flex max-w-7xl h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Animated Brand Logo */}
        <div 
          id="brand-logo" 
          className="flex cursor-pointer items-center space-x-2"
          onClick={() => setActiveTab('home')}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-rose-400 text-white shadow-md shadow-purple-200/50 dark:shadow-none"
          >
            <Brain className="h-5.5 w-5.5" />
          </motion.div>
          <div>
            <span className="font-sans text-xl font-black tracking-tight text-slate-850 dark:text-white">
              Cogno <span className="bg-gradient-to-r from-indigo-600 via-rose-500 to-amber-500 bg-clip-text text-transparent font-extrabold">Kids®</span>
            </span>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 font-mono leading-none">
              Desenvolvimento Infantil
            </div>
          </div>
        </div>

        {/* Desktop Quick Nav Menu */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'home' 
                ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400' 
                : 'text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            Página Inicial
          </button>
          
          <button
            onClick={() => setActiveTab('games')}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'games' 
                ? 'bg-rose-50 text-rose-650 dark:bg-rose-955/40 dark:text-rose-400' 
                : 'text-slate-600 dark:text-slate-300 hover:text-rose-650 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="h-4 w-4" /> Jogos
          </button>

          <button
            onClick={() => setActiveTab('checklists')}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'checklists' 
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' 
                : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="h-4 w-4" /> Checklist
          </button>

          <button
            onClick={() => setActiveTab('printables')}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'printables' 
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400' 
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="h-4 w-4" /> Imprimir
          </button>
        </nav>

        {/* Right tools and Light/Dark Switch */}
        <div id="quick-badge" className="flex items-center space-x-3">
          
          {/* Light/Dark mode toggle switch */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-850 bg-white/80 dark:bg-slate-900 text-slate-705 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs"
            title={isDarkMode ? "Alternar para Modo Claro" : "Alternar para Modo Escuro"}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <Sun className="h-4.5 w-4.5 text-amber-500 fill-amber-500/20" />
            ) : (
              <Moon className="h-4.5 w-4.5 text-indigo-600 fill-indigo-600/10" />
            )}
          </motion.button>

          <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600"></span>
            </span>
            Acesso Pedagógico Aberto
          </span>

          {/* Quick Home action for smart responsive spacing */}
          <button
            onClick={() => setActiveTab('home')}
            aria-label="Home"
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            🏚️
          </button>
        </div>

      </div>
    </header>
  );
}
