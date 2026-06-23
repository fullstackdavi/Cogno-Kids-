/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from 'jspdf';
import { AgeChecklist, PrintableActivity, ValueActivity } from '../types';

export function downloadChecklistPDF(checklist: AgeChecklist, filledItems: string[]) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Top header banner
  doc.setFillColor(31, 41, 55); 
  doc.rect(0, 0, 210, 18, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Cogno Kids® - Ficha de Avaliação e Checklist Cognitivo', 12, 11);

  // Main Info
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(20);
  doc.setFont('Helvetica', 'bold');
  doc.text(checklist.title, 15, 33);

  doc.setFontSize(10);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(checklist.description, 15, 41, { maxWidth: 180 });

  // Student details blank list for educators
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.rect(15, 52, 180, 22, 'FD');

  doc.setFontSize(9);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.text('Nome do Aluno/Criança: __________________________________________________', 20, 60);
  doc.text('Data de Avaliação: ___/___/______   |   Avaliador: _______________________________', 20, 67);

  // Draw Indicators Table
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(12);
  doc.text('Parâmetros de Desenvolvimento Avaliados:', 15, 87);

  let startY = 95;
  checklist.indicators.forEach((ind, index) => {
    const isCompleted = filledItems.includes(ind.id);
    
    // Checkbox box
    doc.setDrawColor(71, 85, 105);
    doc.setLineWidth(0.4);
    if (isCompleted) {
      doc.setFillColor(16, 185, 129); // Green fill
      doc.rect(15, startY - 4, 5, 5, 'FD');
      // tick mark
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text('v', 16.5, startY - 0.5);
    } else {
      doc.setFillColor(255, 255, 255);
      doc.rect(15, startY - 4, 5, 5, 'FD');
    }

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'bold');
    doc.text(`[${ind.category}]`, 24, startY);

    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(ind.indicator, 52, startY, { maxWidth: 140 });

    // underline row separator
    doc.setDrawColor(241, 245, 249);
    doc.line(15, startY + 6, 195, startY + 6);
    startY += 18;
  });

  // Footer notes
  doc.setDrawColor(148, 163, 184);
  doc.line(15, 260, 195, 260);
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Este relatório é um balizador do desenvolvimento infantil. Em caso de dúvidas sobre atrasos persistentes, consulte um neuropediatra or psicopedagogo.', 15, 267, { maxWidth: 180 });

  // PDF generated copyright footer
  doc.setFillColor(241, 245, 249);
  doc.rect(0, 282, 210, 15, 'F');
  doc.setTextColor(100, 116, 139);
  doc.text('Cogno Kids® - Ferramentas de Psicopedagogia e Educação de Alto Padrão.', 15, 291);

  doc.save(`cogno-kids-checklist-${checklist.ageRange}.pdf`);
}

export function downloadActivityPDF(act: PrintableActivity) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  doc.setFillColor(59, 130, 246); // Primary blue colors
  doc.rect(0, 0, 210, 16, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Cogno Kids® - Ficha de Exercício Pedagógico Autônomo', 12, 10);

  // Category & Age Tag
  doc.setTextColor(59, 130, 246);
  doc.setFontSize(9);
  doc.text(`TÓPICO: ${act.category.toUpperCase()}   |   IDADE SUGERIDA: ${act.suggestedAge}`, 15, 28);

  // Title
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(18);
  doc.setFont('Helvetica', 'bold');
  doc.text(act.title, 15, 36);

  // Description
  doc.setFontSize(10);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(act.description, 15, 43, { maxWidth: 180 });

  // Border instructions box
  doc.setDrawColor(191, 219, 254);
  doc.setFillColor(243, 248, 255);
  doc.rect(15, 52, 180, 18, 'FD');

  doc.setTextColor(30, 41, 59);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('INSTRUÇÃO DE EXECUÇÃO:', 20, 59);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text(act.instructions, 20, 65, { maxWidth: 170 });

  // Exercise Sandbox Grid
  doc.setTextColor(15, 23, 42);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Espaço de Resolução Escrita:', 15, 85);

  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(255, 255, 255);
  doc.rect(15, 92, 180, 165, 'FD');

  // Let's print some dotted guidelines or rows inside the sandbox
  doc.setDrawColor(241, 245, 249);
  doc.setLineWidth(0.2);
  for (let y = 110; y < 250; y += 15) {
    doc.line(20, y, 190, y);
  }

  // Draw hints of template layout on content
  doc.setTextColor(203, 213, 225);
  doc.setFontSize(14);
  doc.text('[ ÁREA PARA ATIVIDADE FÍSICA E ANOTAÇÕES DO PROFESSOR ]', 32, 175);

  // Footer banner
  doc.setFillColor(241, 245, 249);
  doc.rect(0, 282, 210, 15, 'F');
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.text('Cogno Kids® - Ficha de Apoio Curricular e Clínico.', 15, 291);

  doc.save(`cogno-kids-atividade-${act.id}.pdf`);
}

export function downloadDailyPlanPDF(activities: { logic: any, attention: any, motor: any, values: ValueActivity }, dateStr: string) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Top header banner
  doc.setFillColor(79, 70, 229); // Violet primary
  doc.rect(0, 0, 210, 18, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Cogno Kids® - Plano de Desenvolvimento Cognitivo Diário', 12, 11);

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(18);
  doc.setFont('Helvetica', 'bold');
  doc.text(`Plano Cognitivo Gerado em ${dateStr}`, 15, 30);

  doc.setFontSize(10);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Uma combinação balanceada de raciocínio, foco mental, estimulação física fina e inteligência emocional.', 15, 36);

  // --- ACTIVITY 1: LOGIC ---
  doc.setFillColor(239, 246, 255);
  doc.setDrawColor(191, 219, 254);
  doc.rect(15, 45, 180, 45, 'FD');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(29, 78, 216);
  doc.text('1. Atividade de Raciocínio Lógico:', 20, 52);
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text(`Título: ${activities.logic?.title || 'Exercício Crítico'}`, 20, 58);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Descrição: ${activities.logic?.description || ''}`, 20, 64, { maxWidth: 170 });
  doc.setFont('Helvetica', 'bold');
  doc.text(`Desafio: ${activities.logic?.task || ''}`, 20, 76, { maxWidth: 170 });

  // --- ACTIVITY 2: FOCUS ---
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.rect(15, 96, 180, 40, 'FD');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(21, 128, 61);
  doc.text('2. Exercício de Atenção e Reflexo:', 20, 103);
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text(`Título: ${activities.attention?.title || 'Foco Absoluto'}`, 20, 109);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Instruções: ${activities.attention?.instructions || ''}`, 20, 115, { maxWidth: 170 });
  doc.text(`Nível Recomendado: ${activities.attention?.level || 'Médio'}`, 20, 127);

  // --- ACTIVITY 3: MOTOR ---
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(253, 230, 138);
  doc.rect(15, 142, 180, 40, 'FD');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(180, 83, 9);
  doc.text('3. Atividade de Coordenação Motora:', 20, 149);
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text(`Título: ${activities.motor?.title || 'Escrita Fina'}`, 20, 155);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Objetivo: ${activities.motor?.description || ''}`, 20, 161, { maxWidth: 170 });
  doc.text(`Orientação de uso: ${activities.motor?.instructions || ''}`, 20, 172, { maxWidth: 170 });

  // --- ACTIVITY 4: EMOTIONAL ---
  doc.setFillColor(253, 242, 248);
  doc.setDrawColor(251, 207, 232);
  doc.rect(15, 188, 180, 75, 'FD');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(190, 24, 74);
  doc.text('4. Valores e Inteligência Comportamental:', 20, 195);
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text(`Título da História: ${activities.values.title} (${activities.values.valueType})`, 20, 201);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Conto Infantil: ${activities.values.story.slice(0, 160)}...`, 20, 207, { maxWidth: 170 });
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(190, 24, 74);
  doc.text(`Pergunta para reflexão com a criança:`, 20, 227);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(30, 41, 59);
  doc.text(activities.values.questionForChild, 20, 233, { maxWidth: 170 });
  doc.setFont('Helvetica', 'bold');
  doc.text(`Missão Criança: ${activities.values.miniActivity}`, 20, 245, { maxWidth: 170 });

  // Bottom copyright footer
  doc.setFillColor(241, 245, 249);
  doc.rect(0, 282, 210, 15, 'F');
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.text('Cogno Kids® - Ficha de Atividades Diárias. Tempo médio sugerido: 45 minutos totais de diversão educacional.', 15, 291);

  doc.save(`cogno-kids-plano-diario-${dateStr}.pdf`);
}
