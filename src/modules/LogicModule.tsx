/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Filter, CheckCircle, XCircle, Award } from 'lucide-react';
import { LOGIC_ACTIVITIES } from '../data/modulesData';
import { LogicActivity, DevelopmentLevel, AgeGroup } from '../types';

export default function LogicModule() {
  const [selectedLevel, setSelectedLevel] = useState<DevelopmentLevel | 'Todos'>('Todos');
  const [selectedAge, setSelectedAge] = useState<AgeGroup | 'Todos'>('Todos');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const filteredActivities = LOGIC_ACTIVITIES.filter(act => {
    const matchLevel = selectedLevel === 'Todos' || act.level === selectedLevel;
    const matchAge = selectedAge === 'Todos' || act.ageGroup === selectedAge;
    return matchLevel && matchAge;
  });

  const handleSelectOption = (actId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [actId]: option }));
    setRevealed(prev => ({ ...prev, [actId]: true }));
  };

  const handleReset = (actId: string) => {
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[actId];
      return copy;
    });
    setRevealed(prev => {
      const copy = { ...prev };
      delete copy[actId];
      return copy;
    });
  };

  return (
    <div id="logic-module-page" className="space-y-8">
      
      {/* Module Title */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
            <Brain className="h-6 w-6" />
          </span>
          <h2 className="text-3xl font-black">🧠 Raciocínio Lógico</h2>
        </div>
        <p className="mt-2 text-blue-100 max-w-2xl text-sm leading-relaxed">
          Exercite o cérebro! Sequências de formas, identificação de regras, padrões visuais e associações lúdicas desenhadas especificamente por faixas etárias de 3 a 10 anos.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <Filter className="h-4 w-4 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider">Filtrar Categoria:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Level Filter */}
          <span className="text-xs text-slate-400 dark:text-slate-500 font-mono self-center">Nível:</span>
          {['Todos', 'Fácil', 'Médio', 'Avançado'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl as any)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                selectedLevel === lvl 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {lvl}
            </button>
          ))}

          {/* Age Filter */}
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1 self-center hidden sm:block" />
          <span className="text-xs text-slate-400 dark:text-slate-500 font-mono self-center">Idade:</span>
          {['Todos', '3-4', '5-6', '7-8', '9-10'].map((age) => (
            <button
              key={age}
              onClick={() => setSelectedAge(age as any)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                selectedAge === age 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {age === 'Todos' ? 'Todos' : `${age} anos`}
            </button>
          ))}
        </div>
      </div>

      {/* Logic Activities Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((act) => {
            const chosen = answers[act.id];
            const isRevealed = revealed[act.id];
            const isCorrect = chosen === act.correctAnswer;

            return (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-850 pb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-650 dark:text-indigo-400 font-mono">
                      {act.category}
                    </span>
                    <div className="flex gap-1.5">
                      <span className="rounded-full bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 text-[9px] font-bold text-blue-700 dark:text-blue-300">
                        {act.level}
                      </span>
                      <span className="rounded-full bg-purple-50 dark:bg-purple-950/50 px-2.5 py-0.5 text-[9px] font-bold text-purple-700 dark:text-purple-300">
                        {act.ageGroup} anos
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-4 text-lg font-black text-slate-800 dark:text-white">{act.title}</h3>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{act.description}</p>
                  
                  {/* Task statement */}
                  <div className="mt-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100/75 dark:border-slate-800/80 p-4 rounded-xl text-center">
                    <span className="text-[10px] font-bold text-indigo-400 dark:text-indigo-300 block uppercase tracking-wide">Qual é a resposta?</span>
                    <p className="mt-1.5 text-sm font-extrabold text-slate-755 dark:text-slate-200 font-sans">{act.task}</p>
                  </div>
                </div>

                {/* Question interactive state options */}
                <div className="mt-6 space-y-3">
                  {!isRevealed ? (
                    <div className="grid grid-cols-2 gap-2">
                      {act.options?.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectOption(act.id, opt)}
                          className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-730 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 active:bg-indigo-100/40 transition text-center focus:outline-none"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className={`flex items-center gap-2 p-3 rounded-xl border ${
                        isCorrect 
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300' 
                          : 'bg-rose-50 dark:bg-rose-955/15 border-rose-100 dark:border-rose-905/30 text-rose-850 dark:text-rose-300'
                      }`}>
                      {isCorrect ? (
                        <>
                          <CheckCircle className="h-5.5 w-5.5 text-emerald-500 shrink-0" />
                          <div>
                            <p className="text-xs font-black">Sensacional! Você acertou!</p>
                            <p className="text-[10px] opacity-90 mt-0.5 font-medium">A resposta certa é mesmo {act.correctAnswer}. Parabéns!</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5.5 w-5.5 text-rose-500 shrink-0" />
                          <div>
                            <p className="text-xs font-black">Ops! Tente novamente.</p>
                            <p className="text-[10px] opacity-90 mt-0.5 font-medium">Você escolheu &ldquo;{chosen}&rdquo;. Que tal analisar o padrão mais uma vez?</p>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleReset(act.id)}
                        className="px-3 py-1.5 text-[10px] font-bold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-150 dark:hover:bg-slate-700 transition text-slate-700 dark:text-slate-300"
                      >
                        Tentar de novo
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </motion.div>
          );
        })
      ) : (
        <div className="md:col-span-2 text-center py-12 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-150 dark:border-slate-805 text-slate-405 dark:text-slate-500 text-xs font-semibold">
          ⚠️ Nenhuma atividade de raciocínio corresponde aos filtros selecionados. Altere os filtros acima para explorar mais!
        </div>
      )}
    </div>

    </div>
  );
}
