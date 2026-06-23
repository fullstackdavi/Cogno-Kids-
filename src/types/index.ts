/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AgeGroup = '3-4' | '5-6' | '7-8' | '9-10';
export type DevelopmentLevel = 'Fácil' | 'Médio' | 'Avançado';

// Module 1: Raciocínio Lógico Activity type
export interface LogicActivity {
  id: string;
  title: string;
  description: string;
  level: DevelopmentLevel;
  ageGroup: AgeGroup;
  category: string;
  task: string;
  options?: string[];
  correctAnswer?: string;
  gameData?: any; // For interactive visual sequence or matching
}

// Module 2: Atenção e Reflexo Exercise type
export interface AttentionExercise {
  id: string;
  title: string;
  description: string;
  level: DevelopmentLevel;
  type: 'differences' | 'attention_visual' | 'find_objects' | 'speed_recognition';
  instructions: string;
  gameData?: any;
}

// Module 3: Coordenação Motora Trace type
export interface MotorExercise {
  id: string;
  title: string;
  description: string;
  ageRange: string;
  instructions: string;
  points: { x: number; y: number }[]; // Trace coordinates
  svgPath: string; // Printable SVG path trace preview
}

// Module 4: Valores e Comportamento Activity
export interface ValueActivity {
  id: string;
  title: string;
  valueType: 'Respeito' | 'Honestidade' | 'Gratidão' | 'Empatia' | 'Responsabilidade' | 'Organização' | 'Persistência';
  story: string;
  reflection: string;
  questionForChild: string;
  miniActivity: string;
}

// Module 6: Checklist Cognitivo
export interface ChecklistIndicator {
  id: string;
  category: 'Atenção' | 'Linguagem' | 'Coordenação' | 'Socialização' | 'Criatividade' | 'Resolução de problemas' | 'Desenvolvimento emocional';
  indicator: string;
}

export interface AgeChecklist {
  ageRange: AgeGroup;
  title: string;
  description: string;
  indicators: ChecklistIndicator[];
}

// Module 8: Atividades para Impressão
export interface PrintableActivity {
  id: string;
  title: string;
  category: 'Exercício Pedagógico' | 'Atividades Cognitivas' | 'Folha de Prática' | 'Coordenação' | 'Raciocínio';
  description: string;
  instructions: string;
  suggestedAge: string;
  contentTemplate: string; // Simple visual pattern for preview & PDF generation
}
