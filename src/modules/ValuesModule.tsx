/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, AlertCircle, Bookmark, Star } from 'lucide-react';
import { VALUES_ACTIVITIES } from '../data/modulesData';
import { ValueActivity } from '../types';

export default function ValuesModule() {
  const [activeValue, setActiveValue] = useState<ValueActivity>(VALUES_ACTIVITIES[0]);
  const [completedQuests, setCompletedQuests] = useState<Record<string, boolean>>({});

  const toggleQuest = (id: string) => {
    setCompletedQuests(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div id="values-module-page" className="space-y-8">
      
      {/* Header Container */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 p-8 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
            <Heart className="h-6 w-6" />
          </span>
          <h2 className="text-3xl font-black">❤️ Valores e Comportamento</h2>
        </div>
        <p className="mt-2 text-rose-55 max-w-2xl text-sm leading-relaxed">
          Histórias encantadoras sobre cidadania, empatia, persistência e amizade! Criado de forma a impulsionar reflexões saudáveis e tarefas concretas de bem-estar social.
        </p>
      </div>

      {/* Main Structural Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Story List selector cards */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">Pilares Emocionais:</h3>
          
          <div className="space-y-2">
            {VALUES_ACTIVITIES.map((item) => {
              const isSelected = activeValue.id === item.id;
              const isDone = completedQuests[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveValue(item)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-rose-400 dark:border-rose-500 bg-rose-50/70 dark:bg-rose-955/20 shadow-sm'
                      : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {item.valueType === 'Empatia' && '🤝'}
                      {item.valueType === 'Honestidade' && '⭐'}
                      {item.valueType === 'Gratidão' && '🙏'}
                      {item.valueType === 'Persistência' && '🧗'}
                      {item.valueType === 'Organização' && '📦'}
                      {item.valueType === 'Responsabilidade' && '🐾'}
                      {item.valueType === 'Respeito' && '💬'}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-205 text-sm">{item.valueType}</h4>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-none mt-1">{item.title}</p>
                    </div>
                  </div>

                  {isDone && (
                    <span className="text-xs bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 font-black rounded-full px-2 py-0.5 font-mono">
                      Feito
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Primary Active Storyboard Panel */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeValue.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
            >
              
              {/* Story Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-850 pb-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 dark:bg-rose-955/20 px-3 py-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                    <Sparkles className="h-3.5 w-3.5" /> Estudo Emocional: {activeValue.valueType}
                  </span>
                  <h3 className="mt-2 text-2xl font-black text-slate-800 dark:text-white">{activeValue.title}</h3>
                </div>

                <button
                  onClick={() => toggleQuest(activeValue.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition ${
                    completedQuests[activeValue.id]
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Star className={`h-4 w-4 ${completedQuests[activeValue.id] ? 'fill-white' : ''}`} />
                  {completedQuests[activeValue.id] ? 'Missão Concluída!' : 'Concluir Missão'}
                </button>
              </div>

              {/* Conto História */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase text-slate-400 dark:text-slate-505 tracking-wider font-mono">📖 Breve História Narrativa:</h4>
                <div className="rounded-2xl bg-amber-50/45 dark:bg-amber-955/10 p-6 border border-amber-100/60 dark:border-amber-950/20 leading-relaxed text-sm text-slate-750 dark:text-slate-300 font-serif italic">
                  &ldquo;{activeValue.story}&rdquo;
                </div>
              </div>

              {/* Reflexão Pedagógica */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase text-slate-400 dark:text-slate-505 tracking-wider font-mono">🧘 Reflexão sobre o Pilar:</h4>
                <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-sans font-medium bg-slate-50 dark:bg-slate-950/40 p-4 border border-slate-100 dark:border-slate-850/80 rounded-xl">
                  {activeValue.reflection}
                </p>
              </div>

              {/* Pergunta e Atividade Complementar Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                
                {/* Pergunta interactiva */}
                <div className="bg-rose-50/30 dark:bg-rose-955/10 border border-rose-50/70 dark:border-rose-950/30 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
                    <AlertCircle className="h-4 w-4" /> Pergunte para a Criança:
                  </div>
                  <p className="mt-2 text-xs font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                    {activeValue.questionForChild}
                  </p>
                </div>

                {/* Mini Atividade Prática */}
                <div className="bg-violet-50/30 dark:bg-violet-955/10 border border-violet-50/70 dark:border-violet-950/30 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs">
                    <Bookmark className="h-4 w-4" /> Desafio do Dia:
                  </div>
                  <p className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeValue.miniActivity}
                  </p>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
