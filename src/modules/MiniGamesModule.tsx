/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RefreshCw, Trophy, Target, HelpCircle, Activity, Sparkles, CheckCircle, Brain } from 'lucide-react';

type GameType = 'memory' | 'errors7' | 'connect' | 'sequence' | 'dragmatch';

export default function MiniGamesModule() {
  const [activeGame, setActiveGame] = useState<GameType>('memory');

  // ==========================================
  // GAME 1: JOGO DA MEMÓRIA STATE
  // ==========================================
  const [memoryTiles, setMemoryTiles] = useState<{ id: number; symbol: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [chosenTiles, setChosenTiles] = useState<number[]>([]);
  const [memoryFinished, setMemoryFinished] = useState(false);

  const initMemoryGame = () => {
    const symbols = ['🦁', '🦊', '🦉', '🐸', '🐳', '🐨'];
    // Duplicate symbols for pairs
    const double = [...symbols, ...symbols].map((symbol, idx) => ({
      id: idx,
      symbol,
      isFlipped: false,
      isMatched: false,
    }));
    // Shuffle
    const shuffled = double.sort(() => Math.random() - 0.5);
    setMemoryTiles(shuffled);
    setMemoryMoves(0);
    setChosenTiles([]);
    setMemoryFinished(false);
  };

  const handleTileClick = (id: number) => {
    if (chosenTiles.length === 2) return; // wait for match verification
    const current = memoryTiles.find(t => t.id === id);
    if (!current || current.isFlipped || current.isMatched) return;

    // Flip current
    setMemoryTiles(prev => prev.map(t => t.id === id ? { ...t, isFlipped: true } : t));
    const newChosen = [...chosenTiles, id];
    setChosenTiles(newChosen);

    if (newChosen.length === 2) {
      setMemoryMoves(prev => prev + 1);
      const [firstId, secondId] = newChosen;
      const t1 = memoryTiles.find(t => t.id === firstId);
      const t2 = memoryTiles.find(t => t.id === secondId);

      if (t1 && t2 && t1.symbol === t2.symbol) {
        // MATCH found
        setTimeout(() => {
          setMemoryTiles(prev => prev.map(t => (t.id === firstId || t.id === secondId) ? { ...t, isMatched: true } : t));
          setChosenTiles([]);
        }, 400);
      } else {
        // NO MATCH -> flip back after delay
        setTimeout(() => {
          setMemoryTiles(prev => prev.map(t => (t.id === firstId || t.id === secondId) ? { ...t, isFlipped: false } : t));
          setChosenTiles([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (memoryTiles.length > 0 && memoryTiles.every(t => t.isMatched)) {
      setMemoryFinished(true);
    }
  }, [memoryTiles]);


  // ==========================================
  // GAME 2: JOGO DOS 7 ERROS
  // ==========================================
  const [errorsFound, setErrorsFound] = useState<number[]>([]);
  // Let's configure 7 target coordinate points representing differences in our cartoon grids
  const differenceSpots = [
    { id: 1, x: 25, y: 18, desc: 'Nuvem ausente' },
    { id: 2, x: 74, y: 35, desc: 'Fruta no galho do pinheiro' },
    { id: 3, x: 15, y: 56, desc: 'Cor do cogumelo' },
    { id: 4, x: 50, y: 48, desc: 'Borboleta adicional' },
    { id: 5, x: 88, y: 82, desc: 'Tamanho da pedra' },
    { id: 6, x: 42, y: 88, desc: 'Graminha florescida' },
    { id: 7, x: 62, y: 70, desc: 'Janela da cabana' }
  ];

  const handleSpotClick = (id: number) => {
    if (!errorsFound.includes(id)) {
      setErrorsFound(prev => [...prev, id]);
    }
  };

  const reset7Errors = () => {
    setErrorsFound([]);
  };


  // ==========================================
  // GAME 3: CONECTAR CONCEITOS
  // ==========================================
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [conceptConnections, setConceptConnections] = useState<Record<string, string>>({});
  const leftItems = [
    { id: 'l1', label: '🍎 Maçã', matchingRight: 'r1' },
    { id: 'l2', label: '🚗 Fusquinha', matchingRight: 'r2' },
    { id: 'l3', label: '🐝 Abelhinha', matchingRight: 'r3' },
    { id: 'l4', label: '🧸 Ursinho', matchingRight: 'r4' }
  ];
  const rightItems = [
    { id: 'r2', label: 'Transporte 🚙' },
    { id: 'r1', label: 'Fruta Doce 🍓' },
    { id: 'r4', label: 'Brinquedo Fofinho 🧩' },
    { id: 'r3', label: 'Inseto Voador 🦋' }
  ];

  const handleLeftSelect = (id: string) => {
    setSelectedLeft(id);
  };

  const handleRightSelect = (rightId: string) => {
    if (!selectedLeft) return;
    const targetLeft = leftItems.find(item => item.id === selectedLeft);
    if (targetLeft && targetLeft.matchingRight === rightId) {
      setConceptConnections(prev => ({ ...prev, [selectedLeft]: rightId }));
    }
    setSelectedLeft(null);
  };

  const resetConnections = () => {
    setConceptConnections({});
    setSelectedLeft(null);
  };


  // ==========================================
  // GAME 4: SEQUÊNCIA LÓGICA
  // ==========================================
  const [seqIndex, setSeqIndex] = useState(0);
  const [seqFeedback, setSeqFeedback] = useState<string | null>(null);
  const logicalSequences = [
    {
      id: 1,
      sequence: ['🍎', '🍌', '🍎', '🍌', '🍎', '___'],
      options: ['🍎', '🍌', '🍇', '🍉'],
      correct: '🍌',
      expl: 'A sequência alterna entre uma fruta vermelha (Maçã) e uma amarela (Banana).'
    },
    {
      id: 2,
      sequence: ['🔺', '⬜', '⭕', '🔺', '⬜', '___'],
      options: ['🔺', '⬜', '⭕', '⭐'],
      correct: '⭕',
      expl: 'A sequência repete o bloco de três formas geométricas de forma cíclica.'
    },
    {
      id: 3,
      sequence: ['1', '3', '5', '7', '___'],
      options: ['8', '9', '10', '11'],
      correct: '9',
      expl: 'O padrão pula de dois em dois (apenas números ímpares).'
    }
  ];

  const handleSequenceGuess = (opt: string) => {
    const current = logicalSequences[seqIndex];
    if (opt === current.correct) {
      setSeqFeedback('CORRECT');
    } else {
      setSeqFeedback('WRONG');
    }
  };

  const nextSequence = () => {
    setSeqIndex(prev => (prev + 1) % logicalSequences.length);
    setSeqFeedback(null);
  };


  // ==========================================
  // GAME 5: ARRASTE E COMBINE (CLIQUE E RELACIONE)
  // ==========================================
  const [activeFamilySource, setActiveFamilySource] = useState<string | null>(null);
  const [familyConnections, setFamilyConnections] = useState<Record<string, string>>({});
  
  const animalsLeft = [
    { id: 'fam-1', name: 'Galinha', matchBaby: 'fam-baby-1', icon: '🐔' },
    { id: 'fam-2', name: 'Vaca', matchBaby: 'fam-baby-2', icon: '🐮' },
    { id: 'fam-3', name: 'Cachorrinho', matchBaby: 'fam-baby-3', icon: '🐶' }
  ];
  const babiesRight = [
    { id: 'fam-baby-2', name: 'Bezerro', icon: '🍼🐮' },
    { id: 'fam-baby-3', name: 'Filhote', icon: '🐾🐶' },
    { id: 'fam-baby-1', name: 'Pintinho', icon: '🐥🐣' }
  ];

  const selectFamilySource = (id: string) => {
    setActiveFamilySource(id);
  };

  const selectFamilyTarget = (id: string) => {
    if (!activeFamilySource) return;
    const item = animalsLeft.find(a => a.id === activeFamilySource);
    if (item && item.matchBaby === id) {
      setFamilyConnections(prev => ({ ...prev, [activeFamilySource]: id }));
    }
    setActiveFamilySource(null);
  };

  const resetFamilies = () => {
    setFamilyConnections({});
    setActiveFamilySource(null);
  };


  useEffect(() => {
    initMemoryGame();
  }, [activeGame]);

  return (
    <div id="minigames-module-page" className="space-y-8">
      
      {/* Banner Title */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-rose-500 to-indigo-600 p-8 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
            <Trophy className="h-6 w-6" />
          </span>
          <h2 className="text-3xl font-black">🎮 Mini Jogos Cognitivos</h2>
        </div>
        <p className="mt-2 text-purple-100 max-w-2xl text-sm leading-relaxed">
          Garantindo 100% de aprendizado lúdico! Experimente jogos interativos fantásticos projetados para estimular memória, reflexão, lógica sequencial e dedução científica.
        </p>
      </div>

      {/* Game Selector Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-slate-950 pb-1.5 border-b border-rose-50 dark:border-slate-850/80">
        <button
          onClick={() => setActiveGame('memory')}
          className={`px-4 py-2 text-xs font-black rounded-xl transition ${
            activeGame === 'memory' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          🧩 Jogo da Memória
        </button>
        <button
          onClick={() => setActiveGame('errors7')}
          className={`px-4 py-2 text-xs font-black rounded-xl transition ${
            activeGame === 'errors7' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          🔍 Jogo dos 7 Erros
        </button>
        <button
          onClick={() => setActiveGame('connect')}
          className={`px-4 py-2 text-xs font-black rounded-xl transition ${
            activeGame === 'connect' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          🔗 Conectar Conceitos
        </button>
        <button
          onClick={() => setActiveGame('sequence')}
          className={`px-4 py-2 text-xs font-black rounded-xl transition ${
            activeGame === 'sequence' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          🔢 Sequência Lógica
        </button>
        <button
          onClick={() => setActiveGame('dragmatch')}
          className={`px-4 py-2 text-xs font-black rounded-xl transition ${
            activeGame === 'dragmatch' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          🐾 Arraste e Combine
        </button>
      </div>

      {/* Game Stage Area */}
      <div className="bg-white dark:bg-slate-900 border border-rose-50/50 dark:border-slate-805 rounded-3xl p-6 shadow-sm">
        
        {/* =======================================================
            GAME 1: INDIVIDUAL MEMORY MODULE 
            ======================================================= */}
        {activeGame === 'memory' && (
          <div className="space-y-6 text-center max-w-lg mx-auto">
            <div>
              <span className="text-xs bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400 px-3 py-1 rounded-full font-bold">ESTIMULA A ATENÇÃO DE TRABALHO</span>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-2">Jogo da Memória dos Animais 🦄</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Encontre todas as duplas combinadas com o menor número de jogadas possível!</p>
            </div>

            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/40 rounded-xl p-3 text-xs font-bold text-slate-600 dark:text-slate-350">
              <span>Jogadas efetuadas: <span className="text-purple-600 dark:text-purple-400">{memoryMoves}</span></span>
              <button onClick={initMemoryGame} className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 hover:underline">
                <RefreshCw className="h-3.5 w-3.5" /> Reiniciar Partida
              </button>
            </div>

            {/* Tile Layout Container */}
            <div className="grid grid-cols-4 gap-3">
              {memoryTiles.map((tile) => {
                const show = tile.isFlipped || tile.isMatched;
                return (
                  <button
                    key={tile.id}
                    onClick={() => handleTileClick(tile.id)}
                    className={`aspect-square rounded-2xl flex items-center justify-center text-3xl font-bold shadow-md transition-all duration-300 ${
                      tile.isMatched
                        ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 opacity-60 scale-95 cursor-default'
                        : show
                        ? 'bg-purple-100 dark:bg-purple-950/20 border-2 border-purple-400 dark:border-purple-500 rotate-y-180'
                        : 'bg-gradient-to-tr from-purple-500 to-indigo-600 text-white text-base hover:scale-105'
                    }`}
                  >
                    {show ? tile.symbol : '❓'}
                  </button>
                );
              })}
            </div>

            {memoryFinished && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-emerald-50 dark:bg-emerald-955/15 border border-emerald-100 dark:border-emerald-900/35 rounded-2xl p-5 text-emerald-800 dark:text-emerald-400 text-xs font-bold leading-relaxed"
              >
                🎉 Incrível! Você completou o Jogo de Memória em {memoryMoves} rodadas!
              </motion.div>
            )}
          </div>
        )}

        {/* =======================================================
            GAME 2: JOGO DOS 7 ERROS 
            ======================================================= */}
        {activeGame === 'errors7' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center">
              <span className="text-xs bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-450 px-3 py-1 rounded-full font-bold">ESTIMULA FOCO E CONCENTRAÇÃO VISUAL</span>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-2">Diferenças no Parque Ecológico 🌳</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Descubra as 7 sutilezas ocultas na imagem da direita.</p>
            </div>

            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/40 rounded-xl p-3 text-xs font-bold text-slate-600 dark:text-slate-350">
              <span className="flex items-center gap-1.5"><Target className="h-4 w-4 text-rose-500" /> Progresso: <b className="text-rose-600 dark:text-rose-400">{errorsFound.length} de 7</b> erros detectados</span>
              <button onClick={reset7Errors} className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 hover:underline">
                <RefreshCw className="h-3.5 w-3.5" /> Limpar Erros
              </button>
            </div>

            {/* Simulated side-by-side spot screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
              
              {/* Scene A: Reference Image */}
              <div className="relative border-4 border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden aspect-video bg-gradient-to-b from-sky-200 to-emerald-100 p-8 flex flex-col justify-between">
                <span className="absolute top-2 left-2 bg-slate-900 text-white text-[10px] font-mono px-2 py-0.5 rounded">Cena A (CORRETA)</span>
                
                {/* Visual cartoon items */}
                <div className="flex justify-around items-center h-full">
                  <span className="text-6xl text-slate-800 animate-pulse">🏰</span>
                  <div className="text-center">
                    <span className="text-4xl block leading-none">🌲</span>
                    <span className="text-sm font-bold text-emerald-800">Maçãs</span>
                  </div>
                  <span className="text-5xl mt-12">🍄</span>
                </div>
                <div className="flex justify-between text-xs font-black text-rose-600">
                  <span>🦋 Borboleta azul</span>
                  <span>Janela decorada 🪟</span>
                </div>
              </div>

              {/* Scene B: Spotting area */}
              <div className="relative border-4 border-rose-400 dark:border-rose-600 rounded-2xl overflow-hidden aspect-video bg-gradient-to-b from-sky-200 to-emerald-100 p-8 flex flex-col justify-between cursor-crosshair">
                <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-mono px-2 py-0.5 rounded">Cena B (TOQUE NOS ERROS!)</span>

                {/* Spot items where users click to detect */}
                <div className="flex justify-around items-center h-full relative">
                  
                  {/* Spot 1: Hut click boundary (no chimney detail) */}
                  <button onClick={() => handleSpotClick(1)} className="absolute top-3 Left-2 h-14 w-14 hover:border-rose-450 border border-transparent rounded-full flex items-center justify-center">
                    {errorsFound.includes(1) ? <span className="text-3xl text-rose-600 font-black">⭕</span> : null}
                  </button>

                  <span className="text-6xl text-slate-700">🏰</span>
                  
                  {/* Spot 2: Apple count detail of pine */}
                  <button onClick={() => handleSpotClick(2)} className="absolute top-8 left-1/3 h-14 w-14 hover:border-rose-450 border border-transparent rounded-full flex items-center justify-center">
                    {errorsFound.includes(2) ? <span className="text-3xl text-rose-600 font-bold">⭕</span> : <span className="text-xs">🍎</span>}
                  </button>

                  {/* Spot 3: Color of shroom click */}
                  <button onClick={() => handleSpotClick(3)} className="absolute bottom-4 right-1/4 h-14 w-14 hover:border-rose-450 border border-transparent rounded-full flex items-center justify-center">
                    {errorsFound.includes(3) ? <span className="text-3xl text-rose-600 font-bold">⭕</span> : null}
                  </button>

                  <span className="text-5xl mt-12 text-rose-800">🍄</span>

                </div>

                <div className="flex justify-between text-xs font-black text-slate-500 dark:text-slate-400">
                  {/* Spot 4: extra bug */}
                  <button onClick={() => handleSpotClick(4)} className="hover:text-rose-500">
                    {errorsFound.includes(4) ? <span className="text-red-500 font-black">🎯 Extra</span> : '🐝 Inseto'}
                  </button>
                  {/* Spot 5: Window */}
                  <button onClick={() => handleSpotClick(5)} className="hover:text-rose-500">
                    {errorsFound.includes(5) ? <span className="text-red-500 font-black">🎯 Mudou</span> : 'Janela Plana'}
                  </button>
                </div>
              </div>

            </div>

            {errorsFound.length === 5 && (
              <div className="bg-emerald-50 dark:bg-emerald-955/15 border border-emerald-100 dark:border-emerald-900/35 p-4 rounded-xl text-emerald-800 dark:text-emerald-400 font-bold text-xs text-center">
                🌟 Maravilhoso! Fantásticos olhos de águia! Você identificou os erros desta rodada com êxito!
              </div>
            )}
          </div>
        )}

        {/* =======================================================
            GAME 3: CONECTAR CONCEITOS 
            ======================================================= */}
        {activeGame === 'connect' && (
          <div className="space-y-6 max-w-lg mx-auto">
            <div className="text-center">
              <span className="text-xs bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full font-bold">AGRUPAMENTO CATEGÓRICO COGNITIVO</span>
              <h3 className="text-xl font-bold text-slate-805 dark:text-white mt-2">Conectar Conceitos Universais ⛓️</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Associe o objeto particular à esquerda com sua classe exata à direita.</p>
            </div>

            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/40 rounded-xl p-3 text-xs font-bold text-slate-600 dark:text-slate-350">
              <span>Conexões: <b className="text-blue-600 dark:text-blue-400">{Object.keys(conceptConnections).length} de 4</b> resolvidas</span>
              <button onClick={resetConnections} className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                <RefreshCw className="h-3.5 w-3.5" /> Zerar Linhas
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 items-center pt-2">
              {/* Left Column words */}
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 block tracking-wider font-mono">Objeto:</span>
                {leftItems.map((left) => {
                  const isLinked = !!conceptConnections[left.id];
                  const isSelected = selectedLeft === left.id;
                  return (
                    <button
                      key={left.id}
                      onClick={() => !isLinked && handleLeftSelect(left.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all text-xs font-extrabold ${
                        isLinked
                          ? 'border-emerald-200 dark:border-emerald-850 bg-emerald-50/20 dark:bg-emerald-950/10 text-emerald-800 dark:text-emerald-400 opacity-70'
                          : isSelected
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 shadow-sm scale-102'
                          : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850'
                      }`}
                    >
                      {left.label}
                    </button>
                  );
                })}
              </div>

              {/* Right Column target category locks */}
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 block tracking-wider font-mono">Categoria de Estudo:</span>
                {rightItems.map((right) => {
                  const matchingLeftKey = Object.keys(conceptConnections).find(key => conceptConnections[key] === right.id);
                  const isLinked = !!matchingLeftKey;
                  return (
                    <button
                      key={right.id}
                      onClick={() => !isLinked && handleRightSelect(right.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all text-xs font-extrabold ${
                        isLinked
                          ? 'border-emerald-250 dark:border-emerald-855 bg-emerald-50/20 dark:bg-emerald-955/10 text-emerald-800 dark:text-emerald-400 opacity-70'
                          : selectedLeft
                          ? 'border-dashed border-blue-400 dark:border-blue-500 bg-blue-50/40 dark:bg-blue-950/10 text-blue-800 dark:text-blue-300 hover:bg-blue-100/60'
                          : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850'
                      }`}
                    >
                      {right.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedLeft && (
              <div className="bg-blue-50 dark:bg-blue-950/25 border border-blue-100 dark:border-blue-900/40 p-2.5 rounded-xl text-[11px] text-blue-700 dark:text-blue-300 font-bold transition text-center animate-bounce">
                🔵 Selecionado! Agora toque na classificação correta de agrupamento correspondente na coluna da direita!
              </div>
            )}
          </div>
        )}

        {/* =======================================================
            GAME 4: SEQUÊNCIA LÓGICA 
            ======================================================= */}
        {activeGame === 'sequence' && (
          <div className="space-y-6 max-w-lg mx-auto">
            <div className="text-center">
              <span className="text-xs bg-amber-50 dark:bg-amber-955/20 text-amber-750 dark:text-amber-400 px-3 py-1 rounded-full font-bold">RACIOCÍNIO CRÍTICO MATEMÁTICO</span>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-2">Sequências Lógicas de Padrão 🔢</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Descubra a peça ideal que prolonga logicamente a fileira dada!</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/40 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-850">
              <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 font-mono tracking-wider">Desafio Ativo:</span>
              
              {/* Output current pattern block */}
              <div className="flex justify-center items-center gap-2 mt-4">
                {logicalSequences[seqIndex].sequence.map((item, id) => (
                  <span key={id} className="text-2xl bg-white dark:bg-slate-900 border dark:border-slate-800 h-12 w-12 rounded-xl flex items-center justify-center shadow-xs text-slate-800 dark:text-white">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Answer feedback status */}
            {seqFeedback ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-xl text-center text-xs font-bold leading-normal border ${
                  seqFeedback === 'CORRECT'
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                    : 'bg-rose-50 border-rose-100 text-rose-800'
                }`}>
                  {seqFeedback === 'CORRECT' ? (
                    <>
                      <p className="font-black text-sm">🎉 Magnífico! Resposta certa!</p>
                      <p className="opacity-90 mt-1 font-medium">{logicalSequences[seqIndex].expl}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-black text-sm">❌ Quase lá! Que tal reanalisar?</p>
                      <p className="opacity-90 mt-1 font-medium">Lembre-se de verificar o ritmo ou som da sequência!</p>
                    </>
                  )}
                </div>

                <div className="text-center">
                  <button
                    onClick={nextSequence}
                    className="bg-indigo-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
                  >
                    Próxima Sequência ▶️
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="text-xs font-black uppercase text-slate-400 text-center block font-mono">Assinale a Alternativa para preencher o [___]:</span>
                <div className="grid grid-cols-4 gap-2">
                  {logicalSequences[seqIndex].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSequenceGuess(opt)}
                      className="py-3 text-xl bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50/20 rounded-xl transition text-center"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center">
              <span className="text-[10px] text-slate-400 dark:text-slate-500">Problemas resolvidos consecutivamente rotativos.</span>
            </div>
          </div>
        )}

        {/* =======================================================
            GAME 5: ARRASTE E COMBINE (CLIQUE E RELACIONE)
            ======================================================= */}
        {activeGame === 'dragmatch' && (
          <div className="space-y-6 max-w-lg mx-auto">
            <div className="text-center">
              <span className="text-xs bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full font-bold">ESTIMULA A ASSOCIAÇÃO ESPACIAL CIENTÍFICA</span>
              <h3 className="text-xl font-bold text-slate-850 dark:text-white mt-2">Encontre a Família das Animais 🐾</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Ajude cada mamãe animal a encontrar o filhote correspondente!</p>
            </div>

            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/40 rounded-xl p-3 text-xs font-bold text-slate-600 dark:text-slate-350">
              <span>Famílias reunidas: <b className="text-emerald-600 dark:text-emerald-400">{Object.keys(familyConnections).length} de 3</b></span>
              <button onClick={resetFamilies} className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
                <RefreshCw className="h-3.5 w-3.5" /> Recomeçar
              </button>
            </div>

            {/* Click to Pair columns cards */}
            <div className="grid grid-cols-2 gap-8 items-center pt-2">
              
              {/* Mothers */}
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 block font-mono">Mamãe:</span>
                {animalsLeft.map((mom) => {
                  const isDone = !!familyConnections[mom.id];
                  const isSelected = activeFamilySource === mom.id;
                  return (
                    <button
                      key={mom.id}
                      onClick={() => !isDone && selectFamilySource(mom.id)}
                      className={`w-full p-4 rounded-2xl border-2 transition text-xs font-bold flex items-center gap-3 ${
                        isDone
                          ? 'border-emerald-250 dark:border-emerald-850 bg-emerald-50 dark:bg-emerald-955/15 text-slate-500 dark:text-slate-400 opacity-60'
                          : isSelected
                          ? 'border-emerald-500 dark:border-emerald-500 bg-emerald-50/30 dark:bg-emerald-955/20 text-emerald-800 dark:text-emerald-400'
                          : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xl">{mom.icon}</span>
                      <span>Mãe {mom.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Babies */}
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 block font-mono">Filhotinho correspondente:</span>
                {babiesRight.map((baby) => {
                  const matchingMomId = Object.keys(familyConnections).find(key => familyConnections[key] === baby.id);
                  const isDone = !!matchingMomId;
                  return (
                    <button
                      key={baby.id}
                      onClick={() => !isDone && selectFamilyTarget(baby.id)}
                      className={`w-full p-4 rounded-2xl border-2 transition text-xs font-bold flex items-center gap-3 ${
                        isDone
                          ? 'border-emerald-250 dark:border-emerald-850 bg-emerald-50 dark:bg-emerald-955/15 text-slate-500 dark:text-slate-400 opacity-60'
                          : activeFamilySource
                          ? 'border-dashed border-emerald-400 dark:border-emerald-500 hover:bg-emerald-50/40 dark:hover:bg-emerald-955/10 bg-slate-50/60 dark:bg-slate-900 text-emerald-805 dark:text-emerald-400'
                          : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-705'
                      }`}
                    >
                      <span className="text-xl">{baby.icon}</span>
                      <span>Filho {baby.name}</span>
                    </button>
                  );
                })}
              </div>

            </div>

            {activeFamilySource && (
              <div className="bg-emerald-50 dark:bg-emerald-955/15 border border-emerald-100 dark:border-emerald-900/35 p-2.5 rounded-xl text-[11px] text-emerald-800 dark:text-emerald-400 text-center font-bold animate-pulse">
                🐾 Sucesso! Agora escolha o bebê correspondente para uni-los!
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
