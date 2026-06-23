/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import { Heart, Activity, Globe, Award, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-350 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-sans text-lg font-black tracking-tight text-white">
                Cogno <span className="text-rose-450 font-extrabold text-indigo-400">Kids®</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plataforma digital científica dedicada ao desenvolvimento da inteligência mental, coordenação motora e saúde psicossocial infantil de 3 a 10 anos.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-indigo-300 font-medium">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              <span>Selo de Excelência Psicopedagógica</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 font-mono">
              Nossos Pilares
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white transition cursor-pointer" onClick={() => setActiveTab('logic')}>🧠 Raciocínio Lógico</li>
              <li className="hover:text-white transition cursor-pointer" onClick={() => setActiveTab('attention')}>⚡ Atenção e Reflexo</li>
              <li className="hover:text-white transition cursor-pointer" onClick={() => setActiveTab('coordination')}>🎯 Coordenação Motora</li>
              <li className="hover:text-white transition cursor-pointer" onClick={() => setActiveTab('values')}>❤️ Valores e Empatia</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 font-mono">
              Recursos Especiais
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li className="hover:text-white transition cursor-pointer text-indigo-300" onClick={() => setActiveTab('games')}>🎮 5 Mini Jogos Interativos</li>
              <li className="hover:text-white transition cursor-pointer text-emerald-300" onClick={() => setActiveTab('checklists')}>📋 Checklists por Idade</li>
              <li className="hover:text-white transition cursor-pointer text-blue-300" onClick={() => setActiveTab('printables')}>📚 Exercícios para Impressão</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Segurança & Isenção
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Sem propagandas, sem armazenamento de dados e sem barreiras de cadastro. Acesso 100% gratuito e seguro projetado em cooperação de designers e pedagogos seniores.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
              <ShieldCheck className="h-4 w-4" />
              <span>Conforme com a LGPD e privacidade COPPA</span>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 Cogno Kids® - Todos os direitos reservados. Feito com amor por educadores de alto nível.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="flex items-center gap-1">
              Desenhado para <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> a infância
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
