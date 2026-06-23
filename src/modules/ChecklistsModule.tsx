/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckSquare, Square, Download, Smile, BookOpen, Clock, Users } from 'lucide-react';
import { COGNITIVE_CHECKLISTS } from '../data/modulesData';
import { AgeChecklist, AgeGroup } from '../types';
import { downloadChecklistPDF } from '../utils/pdfGenerator';

export default function ChecklistsModule() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>('5-6');
  const [checkedRecords, setCheckedRecords] = useState<Record<string, boolean>>({});

  const activeChecklist = COGNITIVE_CHECKLISTS.find(chk => chk.ageRange === selectedAgeGroup) || COGNITIVE_CHECKLISTS[0];

  const handleToggle = (id: string) => {
    setCheckedRecords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getActiveFilledIds = () => {
    return activeChecklist.indicators
      .filter(ind => checkedRecords[ind.id])
      .map(ind => ind.id);
  };

  const handleDownloadPDF = () => {
    downloadChecklistPDF(activeChecklist, getActiveFilledIds());
  };

  // Calculate stats
  const totalIndicators = activeChecklist.indicators.length;
  const completedCount = activeChecklist.indicators.filter(ind => checkedRecords[ind.id]).length;
  const completePercentage = Math.round((completedCount / totalIndicators) * 100);

  // Recommendations based on percentage
  const getRecommendation = () => {
    if (completePercentage >= 80) {
      return {
        title: '🌟 Excelente Ritmo de Desenvolvimento',
        text: 'A criança demonstra robustez em múltiplos quesitos de maturidade. Continue estimulando-a com quebra-cabeças lógicos mais complexos e incentive a leitura autônoma.'
      };
    } else if (completePercentage >= 40) {
      return {
        title: '🌱 Progresso de Desenvolvimento Estável',
        text: 'A maior parte dos marcos motores e cognitivos básicos estão no caminho certo. Dedique mais tempo a atividades de atenção focada e interações sociais com regras estruturadas.'
      };
    } else {
      return {
        title: '⚠️ Estímulos Especiais Necessários',
        text: 'Nesta fase, a criança se beneficiará de tarefas simples em etapas individuais consecutivas. Considere fazer nossos tracejados motores diariamente e busque uma avaliação pedagógica.'
      };
    }
  };

  const adviceDoc = getRecommendation();

  return (
    <div id="checklists-module-page" className="space-y-8">
      
      {/* Module Banner Header */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 p-8 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
            <CheckSquare className="h-6 w-6" />
          </span>
          <h2 className="text-3xl font-black">📋 Checklists Cognitivos</h2>
        </div>
        <p className="mt-2 text-teal-100 max-w-2xl text-sm leading-relaxed">
          Instrumentos de avaliação psicopedagógica rápidos divididos por frentes de desenvolvimento (Atenção, Linguagem, Coordenação e Socialização) para monitoração assertiva.
        </p>
      </div>

      {/* Age Group select switches */}
      <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-slate-900 p-4 border border-indigo-50 dark:border-slate-800 rounded-2xl shadow-sm">
        <span className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 font-mono tracking-wider">Selecione a Idade Alvo:</span>
        <div className="flex flex-wrap gap-2">
          {COGNITIVE_CHECKLISTS.map((chk) => (
            <button
              key={chk.ageRange}
              onClick={() => setSelectedAgeGroup(chk.ageRange)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                selectedAgeGroup === chk.ageRange
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {chk.ageRange === '3-4' && '🧸'} {chk.ageRange === '5-6' && '🎨'} {chk.ageRange === '7-8' && '📚'} {chk.ageRange === '9-10' && '🚀'} {chk.ageRange} Anos
            </button>
          ))}
        </div>
      </div>

      {/* Content Checklist Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Indicators List Ticks (Colspan 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-850 pb-4">
            <div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white">{activeChecklist.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-450 mt-0.5">{activeChecklist.description}</p>
            </div>

            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 bg-emerald-600 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md shadow-emerald-200/50 dark:shadow-none hover:bg-emerald-700 transition shrink-0"
            >
              <Download className="h-4 w-4" /> Baixar Ficha
            </button>
          </div>

          {/* List items mapping */}
          <div className="space-y-3">
            {activeChecklist.indicators.map((ind) => {
              const isChecked = !!checkedRecords[ind.id];
              return (
                <button
                  key={ind.id}
                  onClick={() => handleToggle(ind.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    isChecked 
                      ? 'border-emerald-200/50 dark:border-emerald-900 bg-emerald-50/20 dark:bg-emerald-950/20' 
                      : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-850/50'
                  }`}
                >
                  <div className="flex items-start gap-3.5 pr-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono self-start mt-0.5 min-w-16">
                      [{ind.category}]
                    </span>
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      {ind.indicator}
                    </span>
                  </div>

                  <div className="shrink-0 text-slate-300 hover:text-emerald-600 transition">
                    {isChecked ? (
                      <CheckSquare className="h-6 w-6 text-emerald-600 fill-emerald-50 dark:fill-emerald-950" />
                    ) : (
                      <Square className="h-6 w-6 text-slate-200 dark:text-slate-800" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Evaluation and recommendation column (Colspan 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Progress Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm text-center flex flex-col items-center justify-center relative overflow-hidden">
            <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">Status da Ficha</span>
            <div className="relative h-24 w-24 flex items-center justify-center">
              
              {/* Circular gauge helper */}
              <div className="absolute inset-0 rounded-full border-10 border-slate-100 dark:border-slate-800" />
              <div 
                className="absolute inset-0 rounded-full border-10 border-emerald-500 clip-circle transition-all duration-300"
                style={{ clipPath: `polygon(50% 50%, -50% -50%, ${completePercentage}% -50%, ${completePercentage}% 150%, -50% 150%)` }}
              />
              <span className="text-2xl font-black text-slate-800 dark:text-white">{completePercentage}%</span>
            </div>

            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-4">
              {completedCount} de {totalIndicators} objetivos pedagógicos alcançados
            </p>
          </div>

          {/* Context Advisory Recommendation card */}
          <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850/80 rounded-3xl p-6 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">Parecer Técnico Estimado:</h4>
            
            <div className="space-y-2">
              <span className="text-sm font-black text-slate-800 dark:text-slate-200 block">
                {adviceDoc.title}
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {adviceDoc.text}
              </p>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-850 pt-4 text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed flex items-start gap-2">
              <span className="text-lg">💡</span>
              <span>Marque com sinceridade cada ítem. Relatórios completos podem ser baixados individualmente por idade e salvos na pasta clínica do aluno.</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
