/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, Zap, Flame, Trophy, CheckCircle, RefreshCw, Star, ArrowRight, ArrowLeft,
  Brain, Lightbulb, Compass, Award, ShieldAlert, MousePointerClick, Hourglass, Sparkles, Check, Play
} from 'lucide-react';

// Definitions for the 10 games
interface GameMetadata {
  id: string;
  name: string;
  title: string;
  icon: string;
  level: 'Fácil' | 'Médio' | 'Avançado';
  ageRange: string;
  skills: string[];
  howToDo: string[];
  parentTip: string;
  pedagogicalExplain: string;
}

const ATTENTION_GAMES_METADATA: GameMetadata[] = [
  {
    id: 'att-1',
    name: 'Caça Objetos',
    title: '🔍 Caça aos Animais Perdidos',
    icon: '🔍',
    level: 'Fácil',
    ageRange: '3–4 anos',
    skills: [
      'Atenção visual e foco sustentado',
      'Concentração seletiva rápida',
      'Percepção de pequenos detalhes',
      'Velocidade de varredura visual'
    ],
    howToDo: [
      'Observe o animalzinho que aparece em destaque na caixa de "Alvo".',
      'Procure com atenção por ele no meio de todos os outros animais do painel.',
      'Clique nele assim que o encontrar para registrar seu acerto!'
    ],
    parentTip: 'Pergunte à criança as cores do animalzinho alvo e encoraje-a a procurar por linhas ou colunas para treinar a varredura visual de forma organizada.',
    pedagogicalExplain: 'Ao rastrear e isolar um estímulo visual no meio de distratores, o cérebro ativa o córtex visual e pré-frontal, fortalecendo a atenção concentrada e melhorando a capacidade de leitura e foco em sala de aula.'
  },
  {
    id: 'att-2',
    name: 'Encontre as Diferenças',
    title: '⚖️ Encontre o Detalhe Oculto no Castelo',
    icon: '⚖️',
    level: 'Médio',
    ageRange: '5–6 anos',
    skills: [
      'Comparação de imagens e análise espacial',
      'Varredura binocular coordenada',
      'Paciência e observação minuciosa',
      'Identificação de discrepâncias visuais'
    ],
    howToDo: [
      'Olhe para o Castelo A à esquerda e depois para o Castelo B à direita.',
      'Três itens foram trocados ou modificados no Castelo B.',
      'Clique nas 3 figuras diferentes no Castelo B para marcar os acertos!'
    ],
    parentTip: 'Estimule a criança a comparar uma linha de cada vez. Deixe que ela gaste o tempo necessário sem pressão e evite apontar as respostas diretamente.',
    pedagogicalExplain: 'A atividade de "jogo dos erros" ativa áreas de processamento visual associativo, ajudando o cérebro infantil a discriminar formas, tamanhos e orientações espaciais necessárias para a escrita espontânea e o raciocínio matemático.'
  },
  {
    id: 'att-4',
    name: 'Identifique o Intruso',
    title: '🚫 Descubra o Intruso Misterioso',
    icon: '🚫',
    level: 'Fácil',
    ageRange: '3–4 anos',
    skills: [
      'Classificação cognitiva por categorias',
      'Raciocínio lógico dedutivo',
      'Reconhecimento de afinidade de classe',
      'Análise rápida de propriedades comuns'
    ],
    howToDo: [
      'Observe o conjunto de 4 figuras mostradas na tela.',
      'Descubra qual delas NÃO pertence à mesma família ou categoria das demais.',
      'Toque no intruso correto para desvendar a charada categórica!'
    ],
    parentTip: 'Após a criança acertar, peça para ela explicar por que aquele elemento é o intruso (ex: "Porque os outros voam e a maçã é de comer"). Isso estimula a reflexão lógica expressiva e o vocabulário.',
    pedagogicalExplain: 'Agrupar ideias e encontrar exceções desenvolve a categorização executiva abstrata. Facilita o aprendizado de regras gramaticais, categorização científica e compreensão ampla de conceitos matemáticos abstratos.'
  },

  {
    id: 'att-6',
    name: 'Observe e Memorize',
    title: '👁️ Cartas de Memória Brilhantes',
    icon: '👁️',
    level: 'Avançado',
    ageRange: '7–8 anos',
    skills: [
      'Memória de trabalho visuoespacial',
      'Fixação de foco e retenção de imagens',
      'Organização icônica mental',
      'Flexibilidade de estratégias cognitivas'
    ],
    howToDo: [
      'Selecione as cartas viradas para baixo para revelar o desenho oculto.',
      'Tente se lembrar de onde viu cada desenho correspondente.',
      'Encontre os pares idênticos usando o menor número de tentativas possível!'
    ],
    parentTip: 'Encoraje a criança a descrever em voz alta o que há em cada carta ao virar. A associação verbal de traços ajuda na retenção duradoura da imagem mental.',
    pedagogicalExplain: 'A retenção temporária e a associação de símbolos idênticos fortalecem as vias de memória episódica no lobo temporal medial e o córtex pré-frontal, cruciais para lembrar fórmulas, ortografia e regras didáticas cotidianas.'
  },
  {
    id: 'att-7',
    name: 'Reação Rápida',
    title: '⚡ Desafio do Toque Relâmpago',
    icon: '⚡',
    level: 'Avançado',
    ageRange: '9–10 anos',
    skills: [
      'Tempo de reação e velocidade psicomotora',
      'Atenção sustentada vigilante estrita',
      'Controle inibitório avançado (esperar)',
      'Prontidão de resposta motora fina'
    ],
    howToDo: [
      'Olhe para o painel de alerta e prepare o dedo sobre o botão de clique.',
      'Aguarde com atenção, resistindo ao impulso de clicar enquanto estiver amarelo!',
      'Assim que a lâmpada brilhar em verde e disser "TOQUE JÁ", clique o mais rápido possível!'
    ],
    parentTip: 'Brinque de "Estátua" ou "Siga o Mestre" em casa para reforçar o controle inibitório corporal em conjunto com esta atividade neurodinâmica digital.',
    pedagogicalExplain: 'A modulação fina de receptores de atenção e inibição motora treina os limites do controle de impulsos. Ajuda crianças agitadas a criarem um freio inibitório voluntário, diminuindo a ansiedade física e as respostas por impulso.'
  },
  {
    id: 'att-8',
    name: 'Complete o Padrão',
    title: '🔄 Sequência de Padrões Lógicos',
    icon: '🔄',
    level: 'Médio',
    ageRange: '5–6 anos',
    skills: [
      'Reconhecimento de padrões periódicos',
      'Pensamento sequencial analítico',
      'Raciocínio indutivo e dedutivo',
      'Foco em simetria e ordenação espacial'
    ],
    howToDo: [
      'Observe os desenhos enfileirados de esquerda para a direita na tela.',
      'Descubra qual é a regra ou ritmo de repetição do padrão atual.',
      'Escolha a figura correta que deve ocupar a vaga marcada com a interrogação [?].'
    ],
    parentTip: 'Peça para a criança falar o padrão cantando como se fosse um ritmo musical ("Sol, Chuva, Sol, Chuva..."). O som ritmado torna a lógica natural e espontânea!',
    pedagogicalExplain: 'O reconhecimento de ritmos sequenciais e padrões periódicos constitui o fundamento principal para o aprendizado de álgebra linear, partituras, leitura estruturada e lógica computacional algorítmica.'
  },
  {
    id: 'att-9',
    name: 'Ligue os Elementos Corretos',
    title: '🔗 Ligando os Pares Certos',
    icon: '🔗',
    level: 'Fácil',
    ageRange: '3–4 anos',
    skills: [
      'Associação semântica e pareamento lógico',
      'Relação de causa-efeito do cotidiano',
      'Integração perceptiva unificada',
      'Alinhamento motor e visual coordenado'
    ],
    howToDo: [
      'Veja as figuras do lado esquerdo e seus respectivos parceiros no lado direito.',
      'Toque em uma figura do lado esquerdo para selecioná-la com brilho.',
      'Em seguida, toque no par ideal do lado direito para ligá-los!'
    ],
    parentTip: 'Pergunte em voz alta por que eles formam um par (ex: "Por que a abelha combina com a florzinha?"). Isso estimula a verbalização da lógica contextual.',
    pedagogicalExplain: 'A associação de conceitos e objetos complementares ajuda na integração funcional de conexões neurais inter-hemisféricas (esquerdo e direito), fundamentais para a interpretação de texto e cognição semântica.'
  },
  {
    id: 'att-10',
    name: 'Ordene a Sequência',
    title: '⏳ Linha do Tempo Divertida',
    icon: '⏳',
    level: 'Médio',
    ageRange: '7–8 anos',
    skills: [
      'Raciocínio de ordenação cronológica e linear',
      'Relação temporal de início, meio e fim',
      'Planejamento lógico e estruturação narrativa',
      'Foco em detalhes sequenciais de evolução'
    ],
    howToDo: [
      'Observe os três cartões com ilustrações da história fora de ordem.',
      'Pense sobre o que precisa acontecer primeiro, depois e no final.',
      'Identifique os cartões correspondentes ao Passo 1, Passo 2 e Passo 3 na ordem certa!'
    ],
    parentTip: 'Estimule seu filho a inventar uma história curta divertida justificando a ordem escolhida. Expressão criativa consolida a compreensão temporal.',
    pedagogicalExplain: 'A capacidade de colocar eventos em sequência temporal no córtex frontal facilita a organização diária do estudante, o planejamento de deveres escolares e o entendimento de cadeias de causa e consequência comportamentais.'
  }
];

export default function AttentionModule() {
  const [activeGameIndex, setActiveGameIndex] = useState<number>(0);
  const [completedGames, setCompletedGames] = useState<number[]>([]);
  const [stars, setStars] = useState<number>(0);
  const [showVictoryCard, setShowVictoryCard] = useState<boolean>(false);

  // Retrieve metadata for current exercise
  const currentMetadata = useMemo(() => {
    return ATTENTION_GAMES_METADATA[activeGameIndex];
  }, [activeGameIndex]);

  // Handle marking active game as completed and triggering victory banner
  const completeCurrentExercise = () => {
    if (!completedGames.includes(activeGameIndex)) {
      setCompletedGames(prev => [...prev, activeGameIndex]);
      setStars(prev => prev + 10);
    }
    setShowVictoryCard(true);
  };

  const handleNextGame = () => {
    setShowVictoryCard(false);
    if (activeGameIndex < ATTENTION_GAMES_METADATA.length - 1) {
      setActiveGameIndex(prev => prev + 1);
    }
  };

  const handleTryAgain = () => {
    setShowVictoryCard(false);
  };

  // State definitions and resets for each interactive exercise
  
  // Game 1: Caça Objetos state
  const g1Pool = ['🦁', '🐯', '🐼', '🦊', '🐨', '🦖', '🦜', '🐸', '🐙', '🦀', '🐳', '🐝'];
  const [g1Target, setG1Target] = useState<string>('🦁');
  const [g1Grid, setG1Grid] = useState<string[]>([]);
  const [g1Clicked, setG1Clicked] = useState<number | null>(null);

  const resetG1 = () => {
    const target = g1Pool[Math.floor(Math.random() * g1Pool.length)];
    const items: string[] = [];
    for (let i = 0; i < 23; i++) {
      let candidate = g1Pool[Math.floor(Math.random() * g1Pool.length)];
      while (candidate === target) {
        candidate = g1Pool[Math.floor(Math.random() * g1Pool.length)];
      }
      items.push(candidate);
    }
    const targetIndex = Math.floor(Math.random() * 24);
    items.splice(targetIndex, 0, target);
    setG1Target(target);
    setG1Grid(items);
    setG1Clicked(null);
  };

  const handleG1ItemClick = (index: number, item: string) => {
    setG1Clicked(index);
    if (item === g1Target) {
      setTimeout(() => {
        completeCurrentExercise();
      }, 500);
    }
  };

  // Game 2: Encontre as Diferenças state
  const leftCastle =  ['🏰', '🛡️', '👑', '⚔️', '🧱', '🛡️', '🦁', '🎺', '🐉'];
  const rightCastle = ['🏰', '🛡️', '🎯', '⚔️', '🧱', '🛡️', '🦊', '🎺', '🦖']; 
  const diffIndices = [2, 6, 8]; // 👑 vs 🎯, 🦁 vs 🦊, 🐉 vs 🦖
  const [g2Discovered, setG2Discovered] = useState<number[]>([]);

  const resetG2 = () => {
    setG2Discovered([]);
  };

  const handleG2ItemClick = (index: number) => {
    if (diffIndices.includes(index) && !g2Discovered.includes(index)) {
      const nextFound = [...g2Discovered, index];
      setG2Discovered(nextFound);
      if (nextFound.length === 3) {
        setTimeout(() => {
          completeCurrentExercise();
        }, 500);
      }
    }
  };

  // Game 3: Sequência Visual
  const g3Colors = [
    { id: 'red', colorClass: 'bg-rose-500 shadow-rose-300', emoji: '🔴' },
    { id: 'blue', colorClass: 'bg-blue-500 shadow-blue-300', emoji: '🔵' },
    { id: 'green', colorClass: 'bg-emerald-500 shadow-emerald-300', emoji: '🟢' },
    { id: 'yellow', colorClass: 'bg-amber-400 shadow-amber-200', emoji: '🟡' }
  ];
  const [g3Seq, setG3Seq] = useState<string[]>([]);
  const [g3UserSeq, setG3UserSeq] = useState<string[]>([]);
  const [g3FlashedIndex, setG3FlashedIndex] = useState<number | null>(null);
  const [g3IsPlaying, setG3IsPlaying] = useState<boolean>(false);
  const [g3Step, setG3Step] = useState<'idle' | 'showing' | 'player'>('idle');

  const resetG3 = () => {
    setG3Seq([]);
    setG3UserSeq([]);
    setG3FlashedIndex(null);
    setG3IsPlaying(false);
    setG3Step('idle');
  };

  const startG3Sequence = () => {
    resetG3();
    setG3IsPlaying(true);
    setG3Step('showing');
    
    // Generate random sequence of length 4
    const generated: string[] = [];
    for (let i = 0; i < 4; i++) {
      const randColor = g3Colors[Math.floor(Math.random() * g3Colors.length)].id;
      generated.push(randColor);
    }
    setG3Seq(generated);

    // Playback loop
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < generated.length) {
        const colorId = generated[idx];
        const colorIdx = g3Colors.findIndex(c => c.id === colorId);
        setG3FlashedIndex(colorIdx);
        
        setTimeout(() => {
          setG3FlashedIndex(null);
        }, 650);

        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setG3Step('player');
          setG3IsPlaying(false);
        }, 400);
      }
    }, 1000);
  };

  const handleG3GemClick = (colorId: string) => {
    if (g3Step !== 'player' || g3IsPlaying) return;
    
    const updatedUserSeq = [...g3UserSeq, colorId];
    setG3UserSeq(updatedUserSeq);

    // Check correctness immediately
    const checkIdx = updatedUserSeq.length - 1;
    if (updatedUserSeq[checkIdx] !== g3Seq[checkIdx]) {
      // Failed pattern
      alert('Ops! Essa não era a cor certa da sequência. Vamos tentar de novo?');
      resetG3();
      return;
    }

    if (updatedUserSeq.length === g3Seq.length) {
      setTimeout(() => {
        completeCurrentExercise();
      }, 500);
    }
  };

  // Game 4: Identifique o Intruso state
  const g4Rounds = [
    { items: ['🍎', '🍌', '🍓', '🏎️'], answer: '🏎️', title: 'Frutas vs. Veículo', reason: 'Os outros são frutas deliciosas e saudáveis, mas o carrinho de corrida é um meio de transporte!' },
    { items: ['🐶', '🐱', '🦁', '🚀'], answer: '🚀', title: 'Animais vs. Espaço', reason: 'Os outros são animais terrestres fofinhos, mas o foguete é um veículo que viaja para o espaço!' },
    { items: ['☀️', '🌙', '⭐', '👕'], answer: '👕', title: 'Universo vs. Vestuário', reason: 'Os outros são astros brilhantes do céu, mas a camiseta é uma peça de roupa para usarmos!' },
  ];
  const [g4RoundIdx, setG4RoundIdx] = useState<number>(0);
  const [g4Selected, setG4Selected] = useState<string | null>(null);

  const resetG4 = () => {
    setG4RoundIdx(Math.floor(Math.random() * g4Rounds.length));
    setG4Selected(null);
  };

  const handleG4ItemClick = (item: string) => {
    setG4Selected(item);
    const round = g4Rounds[g4RoundIdx];
    if (item === round.answer) {
      setTimeout(() => {
        completeCurrentExercise();
      }, 800);
    }
  };

  // Game 5: Encontre o Caminho (Labirinto do Coelhinho)
  // 5x5 grid where true is walkable grass, false is rocky path blocker
  const g5MazeGrid = [
    [true,  true,  false, false, false],
    [false, true,  true,  false, false],
    [false, false, true,  true,  false],
    [false, false, false, true,  true],
    [false, false, false, false, true]
  ];
  const g5Goal = { r: 4, c: 4 };
  const [g5RabbitPos, setG5RabbitPos] = useState<{ r: number; c: number }>({ r: 0, c: 0 });

  const resetG5 = () => {
    setG5RabbitPos({ r: 0, c: 0 });
  };

  const handleG5TileClick = (r: number, c: number) => {
    // Check if the tile clicked is walkable and adjacent physically to Rabbit
    if (!g5MazeGrid[r][c]) return; // is rock
    const rowDiff = Math.abs(g5RabbitPos.r - r);
    const colDiff = Math.abs(g5RabbitPos.c - c);
    
    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
      setG5RabbitPos({ r, c });
      if (r === g5Goal.r && c === g5Goal.c) {
        setTimeout(() => {
          completeCurrentExercise();
        }, 500);
      }
    }
  };

  // Game 6: Memorize & Encontre os Pares state
  const g6AnimalPairs = ['🦁', '🦊', '🐨', '🦁', '🦊', '🐨'];
  const [g6Cards, setG6Cards] = useState<string[]>([]);
  const [g6Flipped, setG6Flipped] = useState<number[]>([]);
  const [g6Matched, setG6Matched] = useState<number[]>([]);

  const resetG6 = () => {
    // Shuffle cards
    const shuffled = [...g6AnimalPairs].sort(() => Math.random() - 0.5);
    setG6Cards(shuffled);
    setG6Flipped([]);
    setG6Matched([]);
  };

  const handleG6CardClick = (idx: number) => {
    if (g6Flipped.length >= 2 || g6Matched.includes(idx) || g6Flipped.includes(idx)) return;
    
    const nextFlipped = [...g6Flipped, idx];
    setG6Flipped(nextFlipped);

    if (nextFlipped.length === 2) {
      const [first, second] = nextFlipped;
      if (g6Cards[first] === g6Cards[second]) {
        // Match found!
        const nextMatched = [...g6Matched, first, second];
        setG6Matched(nextMatched);
        setG6Flipped([]);
        if (nextMatched.length === g6Cards.length) {
          setTimeout(() => {
            completeCurrentExercise();
          }, 800);
        }
      } else {
        // No match, turn back down after a short delay
        setTimeout(() => {
          setG6Flipped([]);
        }, 1200);
      }
    }
  };

  // Game 7: Reação Rápida (Desafio do Toque Relâmpago)
  const [g7Status, setG7Status] = useState<'idle' | 'waiting' | 'ready' | 'success' | 'before'>('idle');
  const [g7WaitMs, setG7WaitMs] = useState<number>(0);
  const [g7StartTime, setG7StartTime] = useState<number>(0);
  const [g7ReactionTime, setG7ReactionTime] = useState<number | null>(null);
  const g7TimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const resetG7 = () => {
    if (g7TimeoutRef.current) clearTimeout(g7TimeoutRef.current);
    setG7Status('idle');
    setG7ReactionTime(null);
  };

  const startG7Challenge = () => {
    if (g7TimeoutRef.current) clearTimeout(g7TimeoutRef.current);
    setG7Status('waiting');
    setG7ReactionTime(null);
    
    const waitTime = 1500 + Math.random() * 2500; // between 1.5s and 4s
    setG7WaitMs(waitTime);
    
    g7TimeoutRef.current = setTimeout(() => {
      setG7Status('ready');
      setG7StartTime(Date.now());
    }, waitTime);
  };

  const handleG7TriggerAction = () => {
    if (g7Status === 'waiting') {
      if (g7TimeoutRef.current) clearTimeout(g7TimeoutRef.current);
      setG7Status('before');
    } else if (g7Status === 'ready') {
      const elapsed = Date.now() - g7StartTime;
      setG7ReactionTime(elapsed);
      setG7Status('success');
      setTimeout(() => {
        completeCurrentExercise();
      }, 800);
    }
  };

  useEffect(() => {
    return () => {
      if (g7TimeoutRef.current) clearTimeout(g7TimeoutRef.current);
    };
  }, []);

  // Game 8: Complete o Padrão state
  const g8Rounds = [
    { sequence: ['🌞', '🌧️', '🌞', '🌧️'], options: ['🌞', '🌧️'], answer: '🌞', title: 'Ritmo do Tempo', explain: 'Sol, Chuva, Sol, Chuva... o próximo é Sol! Muito bem!' },
    { sequence: ['🚗', '✈️', '⛵', '🚗', '✈️'], options: ['🚗', '✈️', '⛵'], answer: '⛵', title: 'Ritmo dos Veículos', explain: 'Carro, Avião, Barco... Carro, Avião, então o seguinte é o Barco!' },
    { sequence: ['🔴', '🔵', '🔵', '🔴', '🔵'], options: ['🔴', '🔵'], answer: '🔵', title: 'Ritmo das Cores', explain: 'Um Vermelho, dois Azuis... Um Vermelho, o próximo precisa ser Azul para repetir!' }
  ];
  const [g8RoundIdx, setG8RoundIdx] = useState<number>(0);
  const [g8Selected, setG8Selected] = useState<string | null>(null);

  const resetG8 = () => {
    setG8RoundIdx(Math.floor(Math.random() * g8Rounds.length));
    setG8Selected(null);
  };

  const handleG8OptionClick = (item: string) => {
    setG8Selected(item);
    const round = g8Rounds[g8RoundIdx];
    if (item === round.answer) {
      setTimeout(() => {
        completeCurrentExercise();
      }, 800);
    }
  };

  // Game 9: Ligue os Elementos (Associação Lógica)
  const g9LeftItems = [
    { id: 'bee', label: 'Abelha 🐝' },
    { id: 'monkey', label: 'Macaco 🐒' },
    { id: 'spider', label: 'Aranha 🕷️' },
    { id: 'cloud', label: 'Nuvem ☁️' }
  ];
  const g9RightItems = [
    { id: 'banana', label: 'Banana 🍌', match: 'monkey' },
    { id: 'flower', label: 'Flor 🌸', match: 'bee' },
    { id: 'rain', label: 'Chuva 🌧️', match: 'cloud' },
    { id: 'web', label: 'Teia 🕸️', match: 'spider' }
  ];
  const [g9SelectedLeft, setG9SelectedLeft] = useState<string | null>(null);
  const [g9Connected, setG9Connected] = useState<Record<string, string>>({}); // maps leftId to rightId

  const resetG9 = () => {
    setG9SelectedLeft(null);
    setG9Connected({});
  };

  const handleG9LeftClick = (id: string) => {
    // If already connected, do nothing
    if (g9Connected[id]) return;
    setG9SelectedLeft(id);
  };

  const handleG9RightClick = (rightItem: typeof g9RightItems[0]) => {
    if (!g9SelectedLeft) return;
    
    // Check if the selected left items matches this right item
    if (rightItem.match === g9SelectedLeft) {
      const updated = { ...g9Connected, [g9SelectedLeft]: rightItem.id };
      setG9Connected(updated);
      setG9SelectedLeft(null);
      
      if (Object.keys(updated).length === 4) {
        setTimeout(() => {
          completeCurrentExercise();
        }, 800);
      }
    } else {
      alert('Ops! Esses dois elementos não têm uma ligação lógica muito comum. Tente outro par!');
      setG9SelectedLeft(null);
    }
  };

  // Game 10: Ordene a Sequência Chronológica
  const g10TimelineOptions = [
    {
      title: 'Plantar a florzinha',
      steps: [
        { step: 1, label: '🌱 Semear', text: 'Você coloca a sementinha com terra e carinho no vaso.' },
        { step: 2, label: '🌿 Regar', text: 'A sementinha ganha água e começa a brotar uma folhinha.' },
        { step: 3, label: '🌸 Florescer', text: 'Com a luz solar, uma linda flor vermelha se abre alegre!' }
      ]
    },
    {
      title: 'Construir a casinha',
      steps: [
        { step: 1, label: '🪵 Fundação', text: 'Colocam-se as estacas e cimento no chão firme do quintal.' },
        { step: 2, label: '🧱 Paredes', text: 'Tijolos e telhas são encaixados pelos trabalhadores.' },
        { step: 3, label: '🏡 Pintura', text: 'A casinha ganha cor, janelas e fica pronta para morar!' }
      ]
    }
  ];
  const [g10PhaseIdx, setG10PhaseIdx] = useState<number>(0);
  const [g10UserSelections, setG10UserSelections] = useState<Record<number, number>>({}); // maps step index in g10Rounds to selected order (1, 2, 3)

  const resetG10 = () => {
    setG10PhaseIdx(Math.floor(Math.random() * g10TimelineOptions.length));
    setG10UserSelections({});
  };

  const handleG10Assoc = (stepIndexInRound: number, orderValue: number) => {
    // Remove if already assigned to someone else
    const updated = { ...g10UserSelections };
    
    // Clear previous assignments of the same orderValue
    Object.keys(updated).forEach((key) => {
      if (updated[Number(key)] === orderValue) {
        delete updated[Number(key)];
      }
    });

    updated[stepIndexInRound] = orderValue;
    setG10UserSelections(updated);

    // Check if correct
    const phase = g10TimelineOptions[g10PhaseIdx];
    const totalSelected = Object.keys(updated).length;

    if (totalSelected === 3) {
      let isAllCorrect = true;
      phase.steps.forEach((st, idx) => {
        if (updated[idx] !== st.step) {
          isAllCorrect = false;
        }
      });

      if (isAllCorrect) {
        setTimeout(() => {
          completeCurrentExercise();
        }, 800);
      } else {
        setTimeout(() => {
          alert('Ops! Essa linha do tempo ficou um pouco confusa. Pense sobre qual ação deve vir antes da outra!');
          setG10UserSelections({});
        }, 400);
      }
    }
  };

  // Automatically reset states when active game shifts
  useEffect(() => {
    resetG1();
    resetG2();
    resetG3();
    resetG4();
    resetG5();
    resetG6();
    resetG7();
    resetG8();
    resetG9();
    resetG10();
    setShowVictoryCard(false);
  }, [activeGameIndex]);

  return (
    <div id="attention-module-page" className="space-y-6">
      
      {/* 1. Header principal - focused element target 1 */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-teal-400/20">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-sm border border-white/10">
              <Brain className="h-6 w-6 text-white" />
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Estações de Atenção e Reflexo</h2>
          </div>
          <p className="mt-2 text-teal-500 dark:text-teal-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Nossos exercícios foram estruturados de maneira clínica e psicopedagógica para fortificar a foco executivo sustentado e acelerar o tempo de resposta cognitiva inicial!
          </p>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <div className="flex items-center gap-1.5 bg-white/10 dark:bg-slate-900/60 font-black text-xs md:text-sm text-yellow-300 px-4 py-2 rounded-2xl border border-white/5 shadow-xs">
            <Star className="h-4 w-4 fill-yellow-300 text-yellow-300 animate-spin" />
            <span>ESTRELAS DE FOCO: {stars}</span>
          </div>
          <span className="text-[10px] text-teal-100 dark:text-teal-300 mt-1 uppercase font-semibold font-mono tracking-wider">Módulos Concluídos: {completedGames.length}/{ATTENTION_GAMES_METADATA.length}</span>
        </div>
      </div>

      {/* 2. Caminho Pedagógico - O MINI MAPA DA TRILHA DE APRENDIZAGEM */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-emerald-500" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Trilha de Superpoderes da Atenção</h3>
          </div>
          <div className="text-[10px] bg-slate-100 dark:bg-slate-950 px-3 py-1 rounded-full text-slate-500 dark:text-slate-400 font-bold border border-slate-200/40">
            Nível Geral de Concentração: <span className="text-emerald-500 dark:text-emerald-400 font-black">{Math.round((completedGames.length / ATTENTION_GAMES_METADATA.length) * 100)}%</span>
          </div>
        </div>

        {/* The SERPENTINE Pathway Roadmap of 10 stages */}
        <div className="relative pt-1 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center justify-between min-w-[760px] relative px-4">
            
            {/* Background progress bar line */}
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-100 dark:bg-slate-850 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-4 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 -translate-y-1/2 z-0 transition-all duration-500" 
              style={{ width: `${(completedGames.length / ATTENTION_GAMES_METADATA.length) * 100}%` }}
            />

            {ATTENTION_GAMES_METADATA.map((game, idx) => {
              const isActive = idx === activeGameIndex;
              const isCompleted = completedGames.includes(idx);
              
              return (
                <button
                  key={game.id}
                  onClick={() => setActiveGameIndex(idx)}
                  className="z-10 focus:outline-none flex flex-col items-center group relative cursor-pointer"
                >
                  {/* Circle Badge */}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-lg font-black shadow-xs transition-all duration-300 border-2 ${
                    isActive
                      ? 'bg-emerald-500 text-white border-white scale-110 ring-4 ring-emerald-300'
                      : isCompleted
                      ? 'bg-rose-500 text-white border-white scale-100 hover:scale-105'
                      : 'bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-white border-slate-200 dark:border-slate-700 hover:border-emerald-200'
                  }`}>
                    {isCompleted ? '✓' : game.icon}
                  </div>
                  
                  {/* Step label info */}
                  <span className={`text-[10px] mt-1.5 font-bold transition-all ${
                    isActive 
                      ? 'text-emerald-600 dark:text-emerald-400 font-extrabold scale-105' 
                      : isCompleted
                      ? 'text-rose-500 dark:text-rose-300'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}>
                    Etapa {idx + 1}
                  </span>
                  
                  {/* Short tiny task type */}
                  <span className="text-[8px] text-slate-400 dark:text-slate-600 font-medium tracking-tight">
                    {game.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Main Split Section - LEFT: Structured learning card, RIGHT: Core Interactive Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Educational & Instructional Structure (Col span 5) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
          
          {/* Badge & Title block */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className={`text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full ${
                currentMetadata.level === 'Fácil' 
                  ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400' 
                  : currentMetadata.level === 'Médio'
                  ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400'
                  : 'bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-400'
              }`}>
                Nível {currentMetadata.level}
              </span>
              <span className="bg-sky-100 dark:bg-sky-950/40 text-sky-800 dark:text-sky-400 text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full">
                Idade: {currentMetadata.ageRange}
              </span>
            </div>
            
            <h3 className="text-xl font-black text-slate-855 dark:text-white flex items-center gap-2">
              <span>{currentMetadata.title}</span>
            </h3>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-850 pt-4" />

          {/* O QUE VOCÊ VAI TREINAR (Skills checklists) */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-emerald-500" />
              <span>O que você vai treinar</span>
            </h4>
            <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold space-y-1.5">
              {currentMetadata.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-500 stroke-[3]" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-850 pt-1" />

          {/* COMO FAZER (Simple layout instructions) */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider flex items-center gap-1.5">
              <MousePointerClick className="h-3.5 w-3.5 text-emerald-500" />
              <span>Como Fazer</span>
            </h4>
            <div className="space-y-2 leading-relaxed">
              {currentMetadata.howToDo.map((step, index) => (
                <div key={index} className="flex gap-2">
                  <span className="flex h-5 w-5 hover:scale-105 transition items-center justify-center shrink-0 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-extrabold text-[10px] border border-emerald-100 dark:border-emerald-900/30">
                    {index + 1}
                  </span>
                  <p className="text-xs text-slate-650 dark:text-slate-350 font-medium">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DICA PARA PAIS E PROFESSORES */}
          <div className="bg-yellow-50/50 dark:bg-yellow-950/20 border border-yellow-100/75 dark:border-yellow-900/30 rounded-2xl p-4 space-y-1.5">
            <h5 className="text-[11px] font-black uppercase text-yellow-800 dark:text-yellow-400 tracking-wider flex items-center gap-1.5">
              <Lightbulb className="h-3.5 w-3.5 text-yellow-500" />
              <span>Dica para Pais e Professores</span>
            </h5>
            <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
              {currentMetadata.parentTip}
            </p>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-850 pt-1" />

          {/* O QUE ESTA ATIVIDADE DESENVOLVE (Pedagogical brain explains) */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider flex items-center gap-1.5">
              <Brain className="h-3.5 w-3.5 text-emerald-500" />
              <span>O que esta atividade desenvolve</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal font-medium">
              {currentMetadata.pedagogicalExplain}
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Exercise Panel (Col span 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm min-h-[460px] flex flex-col justify-between relative overflow-hidden">
          
          <div className="space-y-4">
            
            {/* Title / Action bar inside play space */}
            <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-850 pb-3">
              <span className="text-xs font-black text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                Painel Ativo de Atividade Prática
              </span>
              <button
                onClick={() => {
                  resetG1();
                  resetG2();
                  resetG3();
                  resetG4();
                  resetG5();
                  resetG6();
                  resetG7();
                  resetG8();
                  resetG9();
                  resetG10();
                }}
                className="text-[10px] text-slate-400 hover:text-slate-650 dark:hover:text-white flex items-center gap-1 font-bold bg-slate-50 dark:bg-slate-850 px-2.5 py-1 rounded-xl border border-slate-100 dark:border-slate-800 transition"
                title="Reiniciar exercício atual"
              >
                <RefreshCw className="h-3 w-3" /> Reiniciar
              </button>
            </div>

            {/* Sandbox Exercise Screen - Conditional Rendering on index (0 to 9) */}
            <div className="bg-slate-50/50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-850 min-h-[300px] flex items-center justify-center">
              
              {/* STAGE 1: Caça aos Animais Perdidos */}
              {activeGameIndex === 0 && (
                <div className="w-full space-y-4 max-w-md">
                  <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-black text-slate-500">Encontre este bichinho:</span>
                    <span className="text-4xl animate-bounce">{g1Target}</span>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-2">
                    {g1Grid.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleG1ItemClick(idx, item)}
                        className={`h-11 w-11 flex items-center justify-center text-2xl rounded-xl transition-all duration-300 ${
                          g1Clicked === idx
                            ? item === g1Target
                              ? 'bg-emerald-500 text-white scale-95 border-emerald-500'
                              : 'bg-rose-500 text-white scale-95 border-rose-500'
                            : 'bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 hover:border-emerald-400 active:scale-90 hover:scale-105 shadow-2xs'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-center text-slate-400">Varra cada linha e toque no par idêntico!</p>
                </div>
              )}

              {/* STAGE 2: Encontre as Diferenças */}
              {activeGameIndex === 1 && (
                <div className="w-full space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Left Normal Card */}
                    <div className="space-y-2">
                      <div className="text-center font-black text-[10px] text-slate-400 uppercase tracking-wider">Castelo A (Normal)</div>
                      <div className="grid grid-cols-3 gap-2 p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                        {leftCastle.map((icon, idx) => (
                          <div key={idx} className="h-10 flex items-center justify-center text-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/50 rounded-lg select-none">
                            {icon}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Altered Card */}
                    <div className="space-y-2">
                      <div className="text-center font-black text-[10px] text-emerald-500 uppercase tracking-wider">Castelo B (Toque as 3 Diferenças!)</div>
                      <div className="grid grid-cols-3 gap-2 p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                        {rightCastle.map((icon, idx) => {
                          const isFound = g2Discovered.includes(idx);
                          return (
                            <button
                              key={idx}
                              onClick={() => handleG2ItemClick(idx)}
                              className={`h-10 flex items-center justify-center text-xl rounded-lg border transition ${
                                isFound 
                                  ? 'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-800 text-emerald-700 font-bold scale-95' 
                                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200/50 hover:border-emerald-350 cursor-pointer hover:bg-emerald-50/50'
                              }`}
                            >
                              {isFound ? '🎯' : icon}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1 pt-1">
                    <span>Progresso de Observação:</span>
                    <span className="text-emerald-500 font-extrabold">{g2Discovered.length} de 3 encontrados</span>
                  </div>
                </div>
              )}

              {/* STAGE 4: Identifique o Intruso */}
              {activeGameIndex === 2 && (
                <div className="w-full max-w-md space-y-4">
                  <div className="text-center font-bold text-xs text-slate-500">
                    Família Temática: <span className="text-emerald-500 font-black underline">{g4Rounds[g4RoundIdx].title}</span>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {g4Rounds[g4RoundIdx].items.map((item) => {
                      const isSelected = g4Selected === item;
                      const isAnswer = item === g4Rounds[g4RoundIdx].answer;
                      return (
                        <button
                          key={item}
                          disabled={g4Selected !== null}
                          onClick={() => handleG4ItemClick(item)}
                          className={`h-20 bg-white dark:bg-slate-900 border rounded-2xl flex items-center justify-center text-4xl transition-all duration-300 ${
                            isSelected
                              ? isAnswer
                                ? 'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-800 scale-95 font-bold'
                                : 'bg-rose-100 dark:bg-rose-950/40 border-rose-400 dark:border-rose-800 scale-95 text-rose-500'
                              : 'border-slate-150 dark:border-slate-800 hover:border-emerald-350 cursor-pointer'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>

                  {g4Selected && (
                    <div className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-855 rounded-xl text-center space-y-1">
                      <span className="text-xs font-black text-slate-850 dark:text-white">
                        {g4Selected === g4Rounds[g4RoundIdx].answer ? '✅ Incrível! Você Acertou!' : '❌ Ops, esse item combina sim!'}
                      </span>
                      <p className="text-[10px] text-slate-500 leading-normal">
                        {g4Rounds[g4RoundIdx].reason}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* STAGE 6: Observe e Memorize */}
              {activeGameIndex === 3 && (
                <div className="w-full max-w-sm space-y-4 text-center">
                  <div className="grid grid-cols-3 gap-3">
                    {g6Cards.map((card, idx) => {
                      const isFlipped = g6Flipped.includes(idx);
                      const isMatched = g6Matched.includes(idx);
                      const isRevealed = isFlipped || isMatched;
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => handleG6CardClick(idx)}
                          className={`h-24 rounded-2xl flex items-center justify-center text-4xl shadow-sm border transition-all duration-300 ${
                            isRevealed
                              ? 'bg-white dark:bg-slate-900 border-emerald-400 rotate-0 scale-100'
                              : 'bg-gradient-to-br from-emerald-500 to-teal-600 border-teal-400 text-white cursor-pointer rotate-180 hover:brightness-105 active:scale-95'
                          }`}
                        >
                          <span className={`${isRevealed ? 'block' : 'hidden'} select-none`}>
                            {card}
                          </span>
                          <span className={`${!isRevealed ? 'block' : 'hidden'} text-white text-2xl select-none`}>
                            ⭐
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="text-xs font-bold text-slate-500">
                    Encontre todos os pares de animaizinhos idênticos!
                  </div>
                </div>
              )}

              {/* STAGE 7: Reação Rápida */}
              {activeGameIndex === 4 && (
                <div className="w-full max-w-xs space-y-4 text-center">
                  <div 
                    onClick={handleG7TriggerAction}
                    className={`h-40 rounded-3xl flex flex-col items-center justify-center border-2 shadow-sm transition-all duration-300 cursor-pointer select-none ${
                      g7Status === 'idle'
                        ? 'bg-slate-150 border-slate-300 hover:bg-slate-100'
                        : g7Status === 'waiting'
                        ? 'bg-yellow-400 border-yellow-500 text-yellow-950 animate-pulse'
                        : g7Status === 'ready'
                        ? 'bg-emerald-500 border-emerald-600 text-white font-black scale-105 animate-bounce'
                        : g7Status === 'before'
                        ? 'bg-rose-500 border-rose-600 text-white'
                        : 'bg-emerald-100 border-emerald-300 text-emerald-800'
                    }`}
                  >
                    {g7Status === 'idle' && (
                      <div className="space-y-1">
                        <Hourglass className="h-8 w-8 mx-auto text-slate-400" />
                        <span className="text-xs font-extrabold text-slate-600 block">PRONTO? CLIQUE "COMEÇAR"</span>
                      </div>
                    )}
                    {g7Status === 'waiting' && (
                      <div className="space-y-1">
                        <Sparkles className="h-8 w-8 mx-auto text-yellow-850 animate-spin" />
                        <span className="text-xs font-black block tracking-widest">AGUARDE... ESPERE O VERDE...</span>
                      </div>
                    )}
                    {g7Status === 'ready' && (
                      <div className="space-y-1">
                        <Flame className="h-10 w-10 mx-auto fill-yellow-200 text-yellow-250" />
                        <span className="text-lg font-black block leading-none">TOQUE JÁ! TOQUE AGORA! ⚡</span>
                      </div>
                    )}
                    {g7Status === 'before' && (
                      <div className="space-y-1">
                        <ShieldAlert className="h-8 w-8 mx-auto text-white" />
                        <span className="text-xs font-black block">ANCIOSO! ESPERE ACENDER VERDE!</span>
                      </div>
                    )}
                    {g7Status === 'success' && (
                      <div className="space-y-1">
                        <CheckCircle className="h-8 w-8 mx-auto text-emerald-600" />
                        <span className="text-xs font-extrabold block">SUCESSO ESPETACULAR!</span>
                        {g7ReactionTime && (
                          <span className="text-lg font-black block font-mono">{g7ReactionTime}ms!</span>
                        )}
                      </div>
                    )}
                  </div>

                  {g7Status !== 'waiting' && g7Status !== 'ready' && (
                    <button
                      onClick={startG7Challenge}
                      className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs"
                    >
                      Começar Desafio de Reflexo
                    </button>
                  )}
                </div>
              )}

              {/* STAGE 8: Complete o Padrão */}
              {activeGameIndex === 5 && (
                <div className="w-full max-w-md space-y-4 text-center">
                  <div className="text-xs text-slate-500 font-bold uppercase">Ritmo Atual: <span className="text-emerald-500 font-black">{g8Rounds[g8RoundIdx].title}</span></div>

                  {/* Sequence Line */}
                  <div className="flex items-center justify-center gap-2 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    {g8Rounds[g8RoundIdx].sequence.map((sq, i) => (
                      <span key={i} className="text-4xl">{sq}</span>
                    ))}
                    <span className="text-4xl bg-yellow-100 border border-dashed border-yellow-400 h-10 w-10 flex items-center justify-center rounded-lg font-black font-mono text-yellow-700 animate-pulse text-base">?</span>
                  </div>

                  {/* Choosing blocks */}
                  <div className="grid grid-cols-3 gap-2 justify-center max-w-xs mx-auto">
                    {g8Rounds[g8RoundIdx].options.map((opt) => {
                      const isSelected = g8Selected === opt;
                      const isAnswer = opt === g8Rounds[g8RoundIdx].answer;
                      return (
                        <button
                          key={opt}
                          disabled={g8Selected !== null}
                          onClick={() => handleG8OptionClick(opt)}
                          className={`h-14 bg-white dark:bg-slate-900 border rounded-2xl flex items-center justify-center text-3xl transition-all ${
                            isSelected
                              ? isAnswer
                                ? 'bg-emerald-100 border-emerald-400 text-emerald-800 font-black scale-95'
                                : 'bg-rose-100 border-rose-400 text-rose-800 scale-95'
                              : 'border-slate-150 dark:border-slate-800 hover:border-emerald-350 cursor-pointer'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {g8Selected && (
                    <div className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                      <p className="text-[10px] text-slate-500 leading-normal font-medium">
                        {g8Rounds[g8RoundIdx].explain}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* STAGE 9: Ligue os Elementos */}
              {activeGameIndex === 6 && (
                <div className="w-full space-y-4">
                  <div className="grid grid-cols-2 gap-8 relative">
                    
                    {/* Left Column Items */}
                    <div className="space-y-3">
                      <div className="text-center font-bold text-[10px] text-slate-400 uppercase">Figura Inicial</div>
                      {g9LeftItems.map((left) => {
                        const isConnected = g9Connected[left.id] !== undefined;
                        const isSelected = g9SelectedLeft === left.id;
                        return (
                          <button
                            key={left.id}
                            onClick={() => handleG9LeftClick(left.id)}
                            className={`w-full py-3 text-xs font-bold rounded-xl border text-center transition-all ${
                              isConnected
                                ? 'bg-slate-100 text-slate-450 border-slate-200 line-through'
                                : isSelected
                                ? 'bg-emerald-500 text-white border-emerald-400 scale-103 shadow-md ring-2 ring-emerald-250 animate-pulse'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-250 cursor-pointer'
                            }`}
                          >
                            {left.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Column Partners */}
                    <div className="space-y-3">
                      <div className="text-center font-bold text-[10px] text-slate-400 uppercase">Seu Companheiro</div>
                      {g9RightItems.map((right) => {
                        const isThisConnectedObj = Object.values(g9Connected).includes(right.id);
                        return (
                          <button
                            key={right.id}
                            onClick={() => handleG9RightClick(right)}
                            className={`w-full py-3 text-xs font-bold rounded-xl border text-center transition-all ${
                              isThisConnectedObj
                                ? 'bg-slate-100 text-slate-450 border-slate-200 line-through'
                                : g9SelectedLeft
                                ? 'bg-white dark:bg-slate-900 border-emerald-150 hover:bg-emerald-50/50 hover:border-emerald-350 cursor-pointer'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:opacity-100 select-none'
                            }`}
                          >
                            {right.label}
                          </button>
                        );
                      })}
                    </div>

                  </div>

                  <div className="text-center text-[10px] text-slate-400 font-bold border-t border-slate-100 dark:border-slate-855 pt-2">
                    Clique em um item azul da esquerda e depois na sua direita correspondente!
                  </div>
                </div>
              )}

              {/* STAGE 10: Ordene a Sequência */}
              {activeGameIndex === 7 && (
                <div className="w-full max-w-sm space-y-4">
                  <div className="text-center text-xs font-black text-slate-500">História: <span className="text-emerald-500 underline">{g10TimelineOptions[g10PhaseIdx].title}</span></div>
                  
                  {/* Timeline steps display */}
                  <div className="space-y-3">
                    {g10TimelineOptions[g10PhaseIdx].steps.map((st, idx) => {
                      const selectedOrder = g10UserSelections[idx];
                      return (
                        <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-3 flex items-center justify-between shadow-xs">
                          <div className="flex-1 pr-2">
                            <span className="text-xs font-black text-slate-800 dark:text-white block">{st.label}</span>
                            <span className="text-[10px] text-slate-550 leading-normal block">{st.text}</span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {[1, 2, 3].map((val) => {
                              const active = selectedOrder === val;
                              return (
                                <button
                                  key={val}
                                  onClick={() => handleG10Assoc(idx, val)}
                                  className={`h-7 w-7 rounded-lg text-[11px] font-black transition-all ${
                                    active
                                      ? 'bg-rose-500 text-white scale-105'
                                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200/50 cursor-pointer'
                                  }`}
                                >
                                  {val}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-center text-[9px] text-slate-400 font-bold leading-relaxed">
                    Marque os botões 1, 2 e 3 de cada bloco para alinhar a ordem cronológica correta!
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Core Footer section inside sandboxed box */}
          <div className="text-center border-t border-slate-100 dark:border-slate-850 pt-4 mt-6">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
              Todas as etapas são autorizadas e auditadas cognitivamente. Certificação Cogno Kids®.
            </span>
          </div>

          {/* Dynamic Victory overlay modal when an exercise completes successfully */}
          <AnimatePresence>
            {showVictoryCard && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-40"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 15 }}
                  className="bg-white dark:bg-slate-905 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl border border-emerald-100 dark:border-emerald-900/40 relative overflow-hidden"
                >
                  {/* Decorative confetti particles in background */}
                  <span className="absolute top-2 left-6 text-3xl animate-bounce">🎉</span>
                  <span className="absolute top-8 right-6 text-3xl animate-bounce delay-200">✨</span>
                  <span className="absolute bottom-6 left-12 text-2xl animate-pulse">🌟</span>

                  <div className="h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-950/55 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto text-3xl shadow-sm">
                    🏆
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-slate-850 dark:text-white">Etapa {activeGameIndex + 1} Concluída!</h4>
                    <p className="text-xs text-slate-500">Seu cérebro executou os estímulos perfeitamente e fortaleceu conexões sinápticas importantes!</p>
                  </div>

                  <div className="bg-emerald-50 dark:bg-emerald-950/20 py-2.5 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-350 font-black text-xs inline-block px-5">
                    🎁 GANHOU +10 ESTRELAS DE CONCENTRAÇÃO!
                  </div>

                  {/* Options navigation */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <button
                      onClick={handleTryAgain}
                      className="flex-1 py-3 border border-slate-200 dark:border-slate-800 hover:border-slate-350 text-slate-650 dark:text-slate-300 text-xs font-extrabold rounded-xl transition-all cursor-pointer"
                    >
                      Treinar mais uma vez
                    </button>
                    <button
                      onClick={handleNextGame}
                      className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      {activeGameIndex < ATTENTION_GAMES_METADATA.length - 1 ? 'Próxima Etapa 🚀' : 'Prontinho! 🎉'}
                    </button>
                  </div>

                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
