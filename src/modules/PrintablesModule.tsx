/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Printer, Download, Eye, Tag, AlertCircle, FileText } from 'lucide-react';
import { PRINTABLE_ACTIVITIES } from '../data/modulesData';
import { PrintableActivity } from '../types';
import { downloadActivityPDF } from '../utils/pdfGenerator';

export default function PrintablesModule() {
  const [selectedAct, setSelectedAct] = useState<PrintableActivity | null>(PRINTABLE_ACTIVITIES[0]);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (act: PrintableActivity) => {
    downloadActivityPDF(act);
    setDownloadSuccess(act.id);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  return (
    <div id="printables-module-page" className="space-y-8">
      
      {/* Title Header */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-500 p-8 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
            <BookOpen className="h-6 w-6" />
          </span>
          <h2 className="text-3xl font-black">📚 Atividades para Impressão</h2>
        </div>
        <p className="mt-2 text-indigo-50 max-w-2xl text-sm leading-relaxed">
          Evite o excesso de telas! Baixe e imprima fichas pedagógicas, folhas de treino psicomotor, cruzadinhas infantis estruturadas e desafios de raciocínio práticos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column list of sheets (Colspan 5) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">Fichas Curriculares Catalogadas:</h3>
          
          <div className="space-y-3">
            {PRINTABLE_ACTIVITIES.map((act) => {
              const isSelected = selectedAct?.id === act.id;
              return (
                <button
                  key={act.id}
                  onClick={() => setSelectedAct(act)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-indigo-400 dark:border-indigo-500 bg-indigo-50/55 dark:bg-indigo-955/20 shadow-sm scale-102 shadow-indigo-100 dark:shadow-none'
                      : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-black uppercase font-mono tracking-wider text-indigo-600 dark:text-indigo-400">
                    <span>{act.category}</span>
                    <span className="text-purple-600 dark:text-purple-400">Alvo: {act.suggestedAge}</span>
                  </div>
                  <h4 className="font-extrabold text-slate-800 dark:text-slate-150 text-sm mt-1.5">{act.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{act.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column detailed Sheet Preview & Export panel (Colspan 7) */}
        <div className="lg:col-span-7">
          {selectedAct ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedAct.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
              >
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-850 pb-5">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-955/20 px-3 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-400">
                      <Tag className="h-3.5 w-3.5" /> {selectedAct.category}
                    </span>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white mt-1.5">{selectedAct.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">Recomendado para: {selectedAct.suggestedAge}</p>
                  </div>

                  <button
                    onClick={() => handleDownload(selectedAct)}
                    className="flex items-center gap-1.5 bg-indigo-650 px-5 py-2.5 rounded-xl text-xs font-black text-white hover:bg-indigo-700 transition shadow-md shadow-indigo-150 dark:shadow-none shrink-0"
                  >
                    <Printer className="h-4 w-4" /> Exportar para PDF
                  </button>
                </div>

                {/* Print Guidance Note */}
                <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850/80 rounded-2xl p-4 text-xs text-slate-600 dark:text-slate-350 leading-relaxed flex items-start gap-2.5">
                  <AlertCircle className="h-4.5 w-4.5 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>Instruções de Estudo:</strong>
                    <p className="mt-0.5">{selectedAct.instructions}</p>
                  </div>
                </div>

                {/* Document Virtual Preview Box */}
                <div className="space-y-3">
                  <span className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 font-mono tracking-wider">Esboço Visual da Ficha Resolutiva:</span>
                  
                  {/* Styled A4 sheet preview */}
                  <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-950 p-6 flex flex-col justify-between font-mono text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed min-h-80 shadow-inner select-none pointer-events-none relative overflow-hidden">
                    
                    {/* Header line */}
                    <div id="virtual-sheet-header" className="border-b border-slate-200 dark:border-slate-800 pb-3 flex justify-between items-center bg-white/60 dark:bg-slate-900/60 p-2.5 rounded-lg text-[9px] text-slate-400 dark:text-slate-500">
                      <span>Cogno Kids® Ficha Pedagógica</span>
                      <span>Aluno: _____________________</span>
                    </div>

                    {/* Content body */}
                    <div className="flex-1 flex flex-col justify-center items-center text-center py-8 px-4 font-sans">
                      <h4 className="text-sm font-black text-slate-700 dark:text-slate-200">{selectedAct.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm font-medium">{selectedAct.description}</p>
                      
                      <div className="mt-6 border border-dashed border-indigo-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 rounded-xl text-[11px] text-slate-600 dark:text-slate-350 text-left w-full max-w-md">
                        <span className="font-bold text-indigo-650 dark:text-indigo-400 font-mono text-[9px] uppercase">Gabarito de Template:</span>
                        <p className="mt-1 font-mono font-semibold">{selectedAct.contentTemplate}</p>
                      </div>
                    </div>

                    {/* Guidelines bottom footer */}
                    <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between items-center text-[8px] text-slate-400 dark:text-slate-500">
                      <span>© 2026 Cogno Kids Inc</span>
                      <span>Aproveite o ensino físico!</span>
                    </div>

                  </div>
                </div>

                {downloadSuccess === selectedAct.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 text-center bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-xs font-bold"
                  >
                    🚀 PDF gerado e baixado com sucesso! Salve ou envie direto para a impressora.
                  </motion.div>
                )}

              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl text-sm text-slate-450 dark:text-slate-500 font-sans">
              Selecione uma ficha pedagógica ao lado para visualizar os detalhes curriculares!
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
