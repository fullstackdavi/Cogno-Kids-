/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Clock, 
  Download, 
  CheckCircle, 
  Brain, 
  Eye, 
  Flame, 
  Heart,
  RefreshCw
} from 'lucide-react';
import { 
  LOGIC_ACTIVITIES, 
  ATTENTION_EXERCISES, 
  MOTOR_EXERCISES, 
  VALUES_ACTIVITIES 
} from '../data/modulesData';
import { downloadDailyPlanPDF } from '../utils/pdfGenerator';

export default function CognitiveDailyPlan() {
  const [plan, setPlan] = useState<any>(null);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const generateNewPlan = () => {
    // Pick 1 random activity from each category Group
    const randomLogic = LOGIC_ACTIVITIES[Math.floor(Math.random() * LOGIC_ACTIVITIES.length)];
    const randomAttention = ATTENTION_EXERCISES[Math.floor(Math.random() * ATTENTION_EXERCISES.length)];
    const randomMotor = MOTOR_EXERCISES[Math.floor(Math.random() * MOTOR_EXERCISES.length)];
    const randomValue = VALUES_ACTIVITIES[Math.floor(Math.random() * VALUES_ACTIVITIES.length)];

    setPlan({
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      logic: randomLogic,
      attention: randomAttention,
      motor: randomMotor,
      values: randomValue,
      estimatedTime: '45 minutos'
    });
    setCompleted({});
  };

  // Auto-generate on mount if empty
  React.useEffect(() => {
    generateNewPlan();
  }, []);

  const toggleComplete = (key: string) => {
    setCompleted(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDownloadPDF = () => {
    if (!plan) return;
    downloadDailyPlanPDF(plan, plan.date);
  };

  if (!plan) return null;

  const progress = Object.values(completed).filter(Boolean).length;
  const progressPercent = Math.round((progress / 4) * 100);

  return (
    <div id="daily-plan-widget" className="rounded-3xl border border-indigo-100 dark:border-slate-800 bg-[#fafaff] dark:bg-slate-900/40 p-6 sm:p-8 shadow-xl shadow-indigo-50/50 dark:shadow-none">
      
      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-indigo-100 dark:border-slate-800 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 px-3.5 py-1 text-xs font-bold text-white shadow-sm">
            <Sparkles className="h-3 w-3 animate-pulse" /> SUGERIDO PARA HOJE
          </span>
          <h3 className="mt-2 text-2xl font-black text-slate-800 dark:text-white">
            Plano Cognitivo do Dia ☀️
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Treino equilibrado e lúdico para impulsionar diferentes facetas neurológicas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={generateNewPlan}
            className="flex items-center gap-1.5 rounded-xl border border-indigo-200 dark:border-indigo-950 bg-white dark:bg-slate-850 px-3.5 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 shadow-sm hover:bg-indigo-50 dark:hover:bg-slate-800 transition"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Outro Plano
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition"
          >
            <Download className="h-3.5 w-3.5" /> Baixar PDF
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-350 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-2xl px-4 py-2 border border-indigo-100/60 dark:border-indigo-900/40">
            <Clock className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
            <span className="text-xs font-bold">Tempo estimado:</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{plan.estimatedTime}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Progresso:</span>
            <div className="w-24 sm:w-32 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">{progressPercent}%</span>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">Data: {plan.date}</span>
        </div>
      </div>

      {/* Structured 4 Facets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        
        {/* Facet 1: Raciocínio Lógico */}
        <motion.div 
          whileHover={{ y: -2 }}
          className={`relative rounded-2xl border p-5 transition-all ${
            completed.logic 
              ? 'bg-slate-50/80 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 opacity-60' 
              : 'bg-white dark:bg-slate-900 border-blue-100 dark:border-slate-800 shadow-sm'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Brain className="h-4.5 w-4.5" />
              </span>
              <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider font-mono">1. Raciocínio</span>
            </div>
            <button 
              onClick={() => toggleComplete('logic')}
              className="text-slate-300 dark:text-slate-700 hover:text-blue-500 transition"
            >
              <CheckCircle className={`h-6 w-6 ${completed.logic ? 'text-blue-500 fill-blue-100 dark:fill-blue-950' : 'text-slate-200 dark:text-slate-800'}`} />
            </button>
          </div>

          <h4 className="mt-4 text-base font-bold text-slate-800 dark:text-slate-100">{plan.logic.title}</h4>
          <span className="inline-block mt-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-300">
            Nível: {plan.logic.level} ({plan.logic.ageGroup} anos)
          </span>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{plan.logic.description}</p>
          
          <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 border border-blue-50 dark:border-blue-900/30 p-3 rounded-xl">
            <span className="text-[10px] font-black uppercase text-blue-500 dark:text-blue-400">Desafio Rápido:</span>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">{plan.logic.task}</p>
          </div>
        </motion.div>

        {/* Facet 2: Atenção */}
        <motion.div 
          whileHover={{ y: -2 }}
          className={`relative rounded-2xl border p-5 transition-all ${
            completed.attention 
              ? 'bg-slate-50/80 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 opacity-60' 
              : 'bg-white dark:bg-slate-900 border-emerald-100 dark:border-slate-800 shadow-sm'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Eye className="h-4.5 w-4.5" />
              </span>
              <span className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider font-mono">2. Atenção</span>
            </div>
            <button 
              onClick={() => toggleComplete('attention')}
              className="text-slate-300 dark:text-slate-700 hover:text-emerald-500 transition"
            >
              <CheckCircle className={`h-6 w-6 ${completed.attention ? 'text-emerald-500 fill-emerald-100 dark:fill-emerald-950' : 'text-slate-200 dark:text-slate-800'}`} />
            </button>
          </div>

          <h4 className="mt-4 text-base font-bold text-slate-800 dark:text-slate-100">{plan.attention.title}</h4>
          <span className="inline-block mt-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-300">
            Atenção Visual • Nível {plan.attention.level}
          </span>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{plan.attention.description}</p>

          <div className="mt-4 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-50 dark:border-emerald-900/30 p-3 rounded-xl text-xs text-slate-600 dark:text-slate-300">
            <strong className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 block">Como fazer:</strong>
            {plan.attention.instructions}
          </div>
        </motion.div>

        {/* Facet 3: Coordenação */}
        <motion.div 
          whileHover={{ y: -2 }}
          className={`relative rounded-2xl border p-5 transition-all ${
            completed.motor 
              ? 'bg-slate-50/80 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 opacity-60' 
              : 'bg-white dark:bg-slate-900 border-amber-100 dark:border-slate-800 shadow-sm'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                <Flame className="h-4.5 w-4.5" />
              </span>
              <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider font-mono">3. Motora</span>
            </div>
            <button 
              onClick={() => toggleComplete('motor')}
              className="text-slate-300 dark:text-slate-700 hover:text-amber-500 transition"
            >
              <CheckCircle className={`h-6 w-6 ${completed.motor ? 'text-amber-500 fill-amber-100 dark:fill-amber-955' : 'text-slate-200 dark:text-slate-800'}`} />
            </button>
          </div>

          <h4 className="mt-4 text-base font-bold text-slate-800 dark:text-slate-100">{plan.motor.title}</h4>
          <span className="inline-block mt-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-300">
            Coordenação Fina ({plan.motor.ageRange})
          </span>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{plan.motor.description}</p>

          <div className="mt-4 bg-amber-50/40 dark:bg-amber-950/20 border border-amber-50 dark:border-amber-900/30 p-3 rounded-xl text-xs text-slate-600 dark:text-slate-300">
            <strong className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 block">Atividade Prática:</strong>
            {plan.motor.instructions}
          </div>
        </motion.div>

        {/* Facet 4: Valores e Coportamento */}
        <motion.div 
          whileHover={{ y: -2 }}
          className={`relative rounded-2xl border p-5 transition-all ${
            completed.values 
              ? 'bg-slate-50/80 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 opacity-60' 
              : 'bg-white dark:bg-slate-900 border-rose-100 dark:border-slate-800 shadow-sm'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-955 text-rose-600 dark:text-rose-400">
                <Heart className="h-4.5 w-4.5" />
              </span>
              <span className="text-xs font-black uppercase text-rose-600 dark:text-rose-400 tracking-wider font-mono">4. Comportamento</span>
            </div>
            <button 
              onClick={() => toggleComplete('values')}
              className="text-slate-300 dark:text-slate-700 hover:text-rose-500 transition"
            >
              <CheckCircle className={`h-6 w-6 ${completed.values ? 'text-rose-500 fill-rose-100 dark:fill-rose-955' : 'text-slate-200 dark:text-slate-800'}`} />
            </button>
          </div>

          <h4 className="mt-4 text-base font-bold text-slate-800 dark:text-slate-100">{plan.values.title}</h4>
          <span className="inline-block mt-1.5 rounded-full bg-rose-55 dark:bg-rose-955/20 px-2.5 py-0.5 text-[10px] font-bold text-rose-600 dark:text-rose-400">
            Inteligência Emocional • {plan.values.valueType}
          </span>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">{plan.values.story}</p>

          <div className="mt-4 bg-rose-50/40 dark:bg-rose-955/10 border border-rose-50 dark:border-rose-950/20 p-3 rounded-xl text-[11px] text-slate-755 dark:text-slate-300">
            <strong className="text-[10px] font-black uppercase text-rose-600 dark:text-rose-400 block">Reflexão Desafiadora:</strong>
            {plan.values.questionForChild}
          </div>
        </motion.div>

      </div>

      {progressPercent === 100 && (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-6 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
        >
          <span className="text-3xl">🎉 Parabéns!</span>
          <p className="text-sm font-bold mt-1">Você concluiu todo o plano cognitivo balanceado de hoje com maestria!</p>
          <p className="text-xs text-emerald-100 mt-1">Volte amanhã para novos desafios inteligentes.</p>
        </motion.div>
      )}

    </div>
  );
}
