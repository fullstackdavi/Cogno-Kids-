/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame, PenTool, Sparkles, Printer, Trash2, ArrowRight } from 'lucide-react';
import { MOTOR_EXERCISES } from '../data/modulesData';
import { downloadActivityPDF } from '../utils/pdfGenerator';
import { MotorExercise, PrintableActivity } from '../types';

export default function CoordinationModule() {
  const [selectedExercise, setSelectedExercise] = useState<MotorExercise>(MOTOR_EXERCISES[0]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#3b82f6'); // Default Blue
  const [brushSize, setBrushSize] = useState(6);

  // Resize canvas based on container constraints
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Save previous drawn coordinates if necessary or just reset width/height safely
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 360; // Fixed canvas height in px for tracing
    
    // Clear & draw background lines
    clearCanvas();
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [selectedExercise]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isDark = document.documentElement.classList.contains('dark');

    // Draw background grid helper
    ctx.strokeStyle = isDark ? '#1e293b' : '#f1f5f9';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw preset background guideline helper
    ctx.strokeStyle = isDark ? '#334155' : '#e2e8f0';
    ctx.lineWidth = 4;
    ctx.setLineDash([5, 8]);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Draw guiding coordinates mapped to current canvas dimensions
    ctx.beginPath();
    const { points } = selectedExercise;
    if (points.length > 0) {
      // Map base coordinate points relative to current width
      const scaleX = canvas.width / 480;
      ctx.moveTo(points[0].x * scaleX, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x * scaleX, points[i].y);
      }
      ctx.stroke();
    }
    ctx.setLineDash([]); // clear dash offset
  };

  // Tracing drawing actions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = brushColor;

    const coords = getEventCoords(e);
    ctx.moveTo(coords.x, coords.y);
  };

  const drawPoint = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const coords = getEventCoords(e);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const getEventCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      // Touch Event
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      // Mouse Event
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  // Print function mapping state to printable module template
  const handlePrintPDF = () => {
    const act: PrintableActivity = {
      id: `mot-${selectedExercise.id}`,
      title: `Atividade de Tracejado: ${selectedExercise.title}`,
      category: 'Coordenação',
      description: selectedExercise.description,
      instructions: selectedExercise.instructions,
      suggestedAge: selectedExercise.ageRange,
      contentTemplate: selectedExercise.svgPath
    };
    downloadActivityPDF(act);
  };

  return (
    <div id="coordination-module-page" className="space-y-8">
      
      {/* Title block */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 to-rose-500 p-8 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
            <Flame className="h-6 w-6" />
          </span>
          <h2 className="text-3xl font-black">🎯 Coordenação Motora</h2>
        </div>
        <p className="mt-2 text-amber-50 max-w-2xl text-sm leading-relaxed">
          Atividades de tracejado para treinar a musculatura fina da mão! Pratique o contorno diretamente no painel digital interativo ou baixe a folha limpa para praticar com papel e lápis de cor.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left selector menu column */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">Tracejados Disponíveis:</h3>
          <div className="flex flex-col gap-3">
            {MOTOR_EXERCISES.map((ex) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExercise(ex)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selectedExercise.id === ex.id
                    ? 'border-amber-400 dark:border-amber-500 bg-amber-50/70 dark:bg-amber-955/20 shadow-sm'
                    : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-black text-rose-500">
                  <span>🎯 {ex.ageRange}</span>
                </div>
                <h4 className="font-bold text-slate-800 dark:text-slate-150 text-sm mt-1">{ex.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{ex.description}</p>
              </button>
            ))}
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-150 dark:border-slate-850/85 text-[11px] text-slate-600 dark:text-slate-350 leading-relaxed">
            💡 <strong>Dica Pedagógica:</strong> Tracejar no tablet ou computador ajuda na propriocepção visual secundária, preparando a criança para a pegada do lápis fisicamente.
          </div>
        </div>

        {/* Tracing Area column */}
        <div className="lg:col-span-3 space-y-4">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-50 dark:border-slate-850 pb-4 mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-800 dark:text-white">{selectedExercise.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-450 mt-1">{selectedExercise.instructions}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintPDF}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                >
                  <Printer className="h-4 w-4" /> Baixar Folha
                </button>
                <button
                  onClick={clearCanvas}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-rose-100 dark:border-rose-955/40 hover:bg-rose-50 dark:hover:bg-rose-955/20 text-rose-600 dark:text-rose-450 transition"
                >
                  <Trash2 className="h-4 w-4" /> Limpar Pad
                </button>
              </div>
            </div>

            {/* Canvas Custom Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-950/45 p-3 rounded-2xl mb-4 text-xs font-bold text-slate-700 dark:text-slate-300">
              
              <div className="flex items-center gap-2">
                <span>🎨 Cores do Lápis:</span>
                {['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#ef4444'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setBrushColor(color)}
                    style={{ backgroundColor: color }}
                    className={`h-6 w-6 rounded-full border-2 transition ${
                      brushColor === color ? 'border-slate-800 dark:border-white scale-110' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span>Espessura:</span>
                <input
                  type="range"
                  min="3"
                  max="15"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-24 accent-amber-500"
                />
                <span className="font-mono text-slate-400 dark:text-slate-500">{brushSize}px</span>
              </div>

            </div>

            {/* Canvas Core Element */}
            <div 
              ref={containerRef} 
              className="bg-[#fafbfc] dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden cursor-crosshair relative shadow-inner"
            >
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={drawPoint}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={drawPoint}
                onTouchEnd={stopDrawing}
                className="block w-full text-slate-800"
              />

              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/85 backdrop-blur-sm border border-slate-100 dark:border-slate-800 px-3 py-1 rounded-full text-[10px] text-slate-500 dark:text-slate-400 select-none pointer-events-none font-bold">
                <PenTool className="h-3 w-3 text-amber-500" />
                <span>Desenhe sobre a linha pontilhada usando o mouse ou dedo</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
