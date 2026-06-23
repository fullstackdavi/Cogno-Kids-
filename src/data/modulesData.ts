/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  LogicActivity, 
  AttentionExercise, 
  MotorExercise, 
  ValueActivity, 
  AgeChecklist, 
  PrintableActivity 
} from '../types';

// Let's design premium Portuguese content that conveys true pedagogical value.

// MÓDULO 1: Raciocínio Lógico
export const LOGIC_ACTIVITIES: LogicActivity[] = [
  {
    id: 'log-1',
    title: 'O Caminho das Cenouras',
    description: 'Ajude o Coelhinho a identificar a sequência geométrica das pedras para chegar no jardim.',
    level: 'Fácil',
    ageGroup: '3-4',
    category: 'Sequências lógicas',
    task: 'Qual figura completa a sequência: ⭕, 🔺, ⭕, 🔺, __?',
    options: ['⭕', '🔺', '⬜', '⭐'],
    correctAnswer: '⭕'
  },
  {
    id: 'log-2',
    title: 'Frutas Coloridas',
    description: 'Associe as frutas às suas cores corretas seguindo o padrão de agrupamento.',
    level: 'Fácil',
    ageGroup: '3-4',
    category: 'Associação de conceitos',
    task: 'Morango é Vermelho. Banana é Amarela. Abacaxi é __?',
    options: ['Azul', 'Verde', 'Amarelo', 'Roxo'],
    correctAnswer: 'Amarelo'
  },
  {
    id: 'log-3',
    title: 'Mistério da Floresta',
    description: 'Ordene do menor para o maior animal para ajudar o esquilo a encontrar as nozes.',
    level: 'Médio',
    ageGroup: '5-6',
    category: 'Identificação de padrões',
    task: 'Qual é a ordem correta de tamanho dos animais: Formiga, Gato, Leão?',
    options: ['Formiga < Gato < Leão', 'Leão < Gato < Formiga', 'Gato < Formiga < Leão'],
    correctAnswer: 'Formiga < Gato < Leão'
  },
  {
    id: 'log-4',
    title: 'Sequência Numérica Estelar',
    description: 'Siga a contagem das estrelas pulando de dois em dois para acender o foguete.',
    level: 'Médio',
    ageGroup: '7-8',
    category: 'Complete a sequência',
    task: 'Complete a sequência numérica: 2, 4, 6, __, 10, 12',
    options: ['7', '8', '9', '14'],
    correctAnswer: '8'
  },
  {
    id: 'log-5',
    title: 'Desafio Cósmico',
    description: 'Resolva o problema de exclusão lógica usando as pistas disponíveis.',
    level: 'Avançado',
    ageGroup: '9-10',
    category: 'Problemas simples',
    task: 'Se o quadrado verde é maior que o quadrado azul, e o azul é igual ao amarelo, o quadrado verde é:',
    options: ['Menor que o amarelo', 'Maior que o amarelo', 'Igual ao amarelo', 'Metade do amarelo'],
    correctAnswer: 'Maior que o amarelo'
  },
  {
    id: 'log-6',
    title: 'Agrupamento Científico',
    description: 'Separe as palavras dadas na categoria biológica correta.',
    level: 'Avançado',
    ageGroup: '9-10',
    category: 'Organização por categorias',
    task: 'Qual elemento NÃO pertence ao grupo dos mamíferos?',
    options: ['Cachorro', 'Tubarão', 'Baleia', 'Humano'],
    correctAnswer: 'Tubarão'
  }
];

// MÓDULO 2: Atenção e Reflexo
export const ATTENTION_EXERCISES: AttentionExercise[] = [
  {
    id: 'att-1',
    title: 'Buscador das Profundezas',
    description: 'Encontre o peixinho dourado escondido no cenário cheio de corais coloridos.',
    level: 'Fácil',
    type: 'find_objects',
    instructions: 'Olhe atentamente para o mosaico subaquático e clique no Peixinho de Listras Brancas.',
    gameData: {
      items: ['🐠', '🐡', '🐟', '🐙', '⭐', '🦞'],
      target: '🐡'
    }
  },
  {
    id: 'att-2',
    title: 'Diferença sutil no Castelo',
    description: 'Aponte o objeto intruso que mudou de cor ou orientação entre os blocos.',
    level: 'Médio',
    type: 'differences',
    instructions: 'Observe as duas colunas e encontre a carta que está espelhada ou diferente.',
    gameData: {
      left: ['🏰', '🛡️', '👑', '⚔️'],
      right: ['🏰', '🛡️', '🎯', '⚔️'] // 🎯 is different from 👑 (index 2)
    }
  },
  {
    id: 'att-3',
    title: 'Reconhecimento Ultra Rápido',
    description: 'Exercite seu reflexo clicando na figura idêntica à do centro antes do tempo acabar.',
    level: 'Avançado',
    type: 'speed_recognition',
    instructions: 'Clique no botão que exibe a mesma forma mágica que flutua no centro do portal.',
    gameData: {
      target: '⭐',
      alternatives: ['🔺', '⭕', '⭐', '⬜']
    }
  }
];

// MÓDULO 3: Coordenação Motora
export const MOTOR_EXERCISES: MotorExercise[] = [
  {
    id: 'mot-1',
    title: 'Curva das Ondas',
    description: 'Siga a linha ondulada imitando o pulo do golfinho na água.',
    ageRange: '3-4 anos',
    instructions: 'Passe o giz ou lápis por cima dos pontinhos de esquerda para a direita de forma contínua.',
    points: [
      { x: 30, y: 150 },
      { x: 80, y: 60 },
      { x: 130, y: 150 },
      { x: 180, y: 60 },
      { x: 230, y: 150 },
      { x: 280, y: 60 },
      { x: 330, y: 150 }
    ],
    svgPath: 'M 30,150 Q 80,30 130,150 T 230,150 T 330,150'
  },
  {
    id: 'mot-2',
    title: 'Espiral do Caracol',
    description: 'Trace de fora para dentro para formar a casinha em espiral do caracol Nino.',
    ageRange: '5-6 anos',
    instructions: 'Faça movimentos circulares precisos reduzindo o círculo para exercitar o controle muscular fino.',
    points: [
      { x: 200, y: 200 },
      { x: 200, y: 50 },
      { x: 350, y: 200 },
      { x: 200, y: 350 },
      { x: 80, y: 200 }
    ],
    svgPath: 'M200,200 C50,150 100,50 200,50 C320,50 350,150 350,200 C350,300 280,350 200,350 C120,350 80,280 80,200 C80,120 120,80 180,80 C240,80 250,120 250,180 C250,220 220,240 190,240'
  },
  {
    id: 'mot-3',
    title: 'Labirinto das Abelhas',
    description: 'Guie a abelhinha pelo caminho reto em zigue-zague até a colmeia dourada.',
    ageRange: '7-8 anos',
    instructions: 'Trace com firmeza angular seguindo as quinas exatas sem esbarrar nas paredes virtuais.',
    points: [
      { x: 20, y: 100 },
      { x: 100, y: 180 },
      { x: 180, y: 100 },
      { x: 260, y: 180 },
      { x: 340, y: 100 },
      { x: 420, y: 180 }
    ],
    svgPath: 'M 20,100 L 100,180 L 180,100 L 260,180 L 340,100 L 420,180'
  }
];

// MÓDULO 4: Valores e Comportamento
export const VALUES_ACTIVITIES: ValueActivity[] = [
  {
    id: 'val-1',
    title: 'O Brinquedo Compartilhado de Léo',
    valueType: 'Empatia',
    story: 'Léo ganhou um caminhão de bombeiros brilhante no seu aniversário. Ele adorava o som da sirene. Na pracinha, ele viu Clara, uma garotinha que olhava com os olhinhos brilhando para o brinquedo. Léo hesitou, mas se lembrou de como é bom brincar junto. Ele se aproximou e ofereceu a Clara para brincarem de salvar a floresta juntos. Clara deu o maior sorriso do mundo!',
    reflection: 'Colocar-se no lugar do amigo e compartilhar gera alegria multiplicada. Quando dividimos um brinquedo, multiplicamos os amigos e as histórias felizes.',
    questionForChild: 'Como você acha que a Clara se sentiu quando o Léo dividiu o brinquedo com ela? Você já dividiu algo especial hoje?',
    miniActivity: 'Desenhe em papel duas pessoas brincando juntas e dê de presente a um amigo ou familiar.'
  },
  {
    id: 'val-2',
    title: 'O Vaso de Flores da Mamãe',
    valueType: 'Honestidade',
    story: 'Ao correr atrás de sua bola pela sala, Lucas acidentalmente esbarrou e derrubou o vaso de gesso que sua mãe havia decorado com muito carinho. Ninguém viu o acidente. Lucas sentiu o coração bater forte e pensou em dizer que o gatinho fizera aquilo. Mas, respirando fundo, ele foi até a mamãe, olhou nos seus olhos e contou a verdade, pedindo desculpas sinceras.',
    reflection: 'Ser honesto exige coragem, mas traz uma paz profunda. A verdade reconstrói a confiança e nos torna pessoas mais fortes e respeitáveis.',
    questionForChild: 'Por que o Lucas sentiu medo? O que a mamãe sentiu ao perceber que seu filho foi honesto?',
    miniActivity: 'Crie o "Selo da Honestidade" com uma estrela desenhada à mão e entregue a quem falar a verdade nesta semana.'
  },
  {
    id: 'val-3',
    title: 'A Gratidão do Pequeno Urso Sol',
    valueType: 'Gratidão',
    story: 'O urso Sol acordou muito irritado porque estava chovendo e ele não podia sair para colher amoras silvestres. Sua avó, percebendo a tristeza dele, acendeu a lareira quentinha, preparou um chá de camomila saboroso e trouxe um cobertor macio. Sol percebeu que, mesmo não podendo brincar fora, ele tinha tantas coisas incríveis para agradecer dentro de casa.',
    reflection: 'A gratidão transforma o que temos em suficiente. Quando olhamos com carinho para as pequenas bênçãos, o mundo fica mais colorido e acolhedor.',
    questionForChild: 'Que coisas legais o ursinho percebeu que tinha? O que você tem no seu dia de hoje para agradecer?',
    miniActivity: 'Escreva ou diga 3 coisas legais que aconteceram com você hoje pela qual você é grato.'
  },
  {
    id: 'val-4',
    title: 'A Formiga Filipa e a Folha Gigante',
    valueType: 'Persistência',
    story: 'Filipa encontrou uma folha verde maravilhosa, o dobro de seu tamanho. Ela começou a puxá-la, mas a folha trancou em um galho. Ela puxou de novo e caiu de costas sob o vento. Filipa não desistiu. Ela contornou o obstáculo, buscou um ângulo melhor e chamou duas amigas para ajudar. Com persistência e união, a folha foi transportada com sucesso ao formigueiro.',
    reflection: 'Obstáculos não servem para nos parar, mas para nos ensinar a ter novas ideias. A persistência nos leva a realizar grandes conquistas!',
    questionForChild: 'Se a Filipa tivesse desistido na primeira queda, o que teria acontecido? Qual tarefa difícil você continuou tentando até conseguir?',
    miniActivity: 'Tente empilhar 5 copos descartáveis ou pedrinhas, uma acima da outra, sem deixar cair. Se cair, tente de novo!'
  },
  {
    id: 'val-5',
    title: 'O Quarto Organizado de Nina',
    valueType: 'Organização',
    story: 'O quarto de Nina parecia uma selva de pernas para o ar! Era difícil achar a meia azul e até de caminhar sem pisar em blocos de montar. Um dia, ela perdeu o manual de seu desenho favorito. Ela resolveu arrumar: livros na prateleira, brinquedos divididos em caixas coloridas. Que alívio! Além de achar o papel, o quarto parecia maior e mais bonito para brincar.',
    reflection: 'Organizar nossos objetos facilita nossa mente e simplifica nossa rotina. Cuidar de nosso espaço é uma forma de carinho com nós mesmos.',
    questionForChild: 'Você acha que brincar em um quarto organizado é mais legal? Qual brinquedo seu precisa voltar para a caixinha hoje?',
    miniActivity: 'Escolha um cantinho dos seus brinquedos ou livros e organize-o por cor ou tamanho.'
  },
  {
    id: 'val-6',
    title: 'A Tarefa de Alimentar o Totó',
    valueType: 'Responsabilidade',
    story: 'Mariana recebeu a missão de dar água e ração fresca todos os dias pela manhã ao cãozinho Totó. Certo dia, ela acordou querendo apenas assistir desenhos e esqueceu do amigo. Ao ver o potinho vazio e Totó sentado ao lado, com as orelhinhas caídas, Mariana percebeu como sua tarefa era vital para a saúde de quem ela amava. Ela o alimentou na hora.',
    reflection: 'Responsabilidade é entender que as nossas ações afetam o bem-estar e a segurança dos outros. Cumprir nossos deveres demonstra maturidade e amor.',
    questionForChild: 'O Totó consegue colocar comida sozinho? Qual responsabilidade diária você mais gosta de cumprir na sua casa?',
    miniActivity: 'Faça um cartão checklist simples para marcar um "OK" toda vez que você escovar os dentes ou recolher seu prato.'
  },
  {
    id: 'val-7',
    title: 'O Respeito na fila do Parquinho',
    valueType: 'Respeito',
    story: 'Havia apenas um balanço livre no parquinho e cinco crianças queriam usar ao mesmo tempo. Alguns quiseram correr e empurrar. Mas Leo sugeriu fazer uma fila organizada e contar até 30 para cada criança brincar um pouquinho. Todos concordaram e esperaram a sua vez em paz, sem nenhum choro ou empurrão.',
    reflection: 'Respeito é tratar os outros como gostaríamos de ser tratados. Saber esperar a vez e ouvir os amigos torna a convivência divertida e segura.',
    questionForChild: 'Por que empurrar e furar a fila estraga a brincadeira? Como você age quando quer brincar com algo que já está ocupado?',
    miniActivity: 'Lembre-se de usar três palavras mágicas hoje: "Por favor", "Obrigado" e "Com licença".'
  }
];

// MÓDULO 6: Checklists Cognitivos
export const COGNITIVE_CHECKLISTS: AgeChecklist[] = [
  {
    ageRange: '3-4',
    title: 'Desenvolvimento Inicial (3 a 4 Anos)',
    description: 'Etapa focada na expansão rápida da linguagem, exploração sensorial-motora inicial e identificação básica de formas.',
    indicators: [
      { id: 'ind-34-1', category: 'Linguagem', indicator: 'Consegue formular frases curtas de 3 a 4 palavras' },
      { id: 'ind-34-2', category: 'Atenção', indicator: 'Presta atenção em historinhas curtas por 5 a 10 minutos' },
      { id: 'ind-34-3', category: 'Coordenação', indicator: 'Consegue empilhar uma torre de até 6 cubos pequenos' },
      { id: 'ind-34-4', category: 'Socialização', indicator: 'Brinca ao lado de outras crianças de forma associativa simples' },
      { id: 'ind-34-5', category: 'Criatividade', indicator: 'Faz desenhos com rabiscos circulares e lhes atribui nomes' },
      { id: 'ind-34-6', category: 'Resolução de problemas', indicator: 'Consegue encaixar peças geométricas tridimensionais corretas' },
      { id: 'ind-34-7', category: 'Desenvolvimento emocional', indicator: 'Demonstra afeto por companheiros e reconhece choro básico' }
    ]
  },
  {
    ageRange: '5-6',
    title: 'Socialização e Autonomia (5 a 6 Anos)',
    description: 'Fase essencial para o desenvolvimento da coordenação motora fina (prancheta e escrita) e entendimento de regras lógicas elementares.',
    indicators: [
      { id: 'ind-56-1', category: 'Resolução de problemas', indicator: 'Compreende e segue ordens lógicas de até 3 etapas consecutivas' },
      { id: 'ind-56-2', category: 'Linguagem', indicator: 'Conta fatos cotidianos de forma clara usando tempos verbais corretos' },
      { id: 'ind-56-3', category: 'Coordenação', indicator: 'Consegue recortar papel seguindo uma linha tracejada reta' },
      { id: 'ind-56-4', category: 'Atenção', indicator: 'Permanece concentrado em uma atividade lúdica por 15 a 20 minutos' },
      { id: 'ind-56-5', category: 'Socialização', indicator: 'Demonstra habilidade em compartilhar brinquedos espontaneamente' },
      { id: 'ind-56-6', category: 'Criatividade', indicator: 'Combina elementos fantásticos e relata histórias inventadas inteiras' },
      { id: 'ind-56-7', category: 'Desenvolvimento emocional', indicator: 'Experimenta menos birras emocionais e verbaliza sentimentos básicos' }
    ]
  },
  {
    ageRange: '7-8',
    title: 'Alfabetização e Integração (7 a 8 Anos)',
    description: 'A criança consolida operações numéricas básicas, leitura compreensiva e habilidades de cooperação refinada em grupo.',
    indicators: [
      { id: 'ind-78-1', category: 'Atenção', indicator: 'Mantém foco em tarefas escolares guiadas de 25 a 30 minutos' },
      { id: 'ind-78-2', category: 'Resolução de problemas', indicator: 'Efetua adição e subtração simples usando objetos ou papel' },
      { id: 'ind-78-3', category: 'Linguagem', indicator: 'Lê de forma autônoma pequenos parágrafos de gibis e livrinhos' },
      { id: 'ind-78-4', category: 'Coordenação', indicator: 'Amarra os próprios cadarços de sapatos sem auxílio' },
      { id: 'ind-78-5', category: 'Socialização', indicator: 'Respeita regras de jogos de tabuleiro e entende perder de forma saudável' },
      { id: 'ind-78-6', category: 'Criatividade', indicator: 'Cria brinquedos alternativos utilizando recicláveis com propósito' },
      { id: 'ind-78-7', category: 'Desenvolvimento emocional', indicator: 'Consegue descrever e justificar o motivo de frustrações cotidianas' }
    ]
  },
  {
    ageRange: '9-10',
    title: 'Abstração e Raciocínio (9 a 10 Anos)',
    description: 'Consolidação de raciocínio hipotético-dedutivo, empatia complexa, resolução autônoma de conflitos sociais e hobbies refinados.',
    indicators: [
      { id: 'ind-910-1', category: 'Resolução de problemas', indicator: 'Planeja estratégias antecipadas em jogos complexos (Xadrez, Damas)' },
      { id: 'ind-910-2', category: 'Linguagem', indicator: 'Escreve pequenos textos criativos estruturados com começo, meio e fim' },
      { id: 'ind-910-3', category: 'Atenção', indicator: 'Estuda ou realiza atividades autônomas por 40 minutos com intervalos' },
      { id: 'ind-910-4', category: 'Coordenação', indicator: 'Demonstra controle motor maduro em esportes com bola ou música complexa' },
      { id: 'ind-910-5', category: 'Socialização', indicator: 'Forma laços duradouros de amizade baseados em lealdade e interesses mútuos' },
      { id: 'ind-910-6', category: 'Criatividade', indicator: 'Estrutura projetos detalhados (quadrinhos, construções de blocos, etc)' },
      { id: 'ind-910-7', category: 'Desenvolvimento emocional', indicator: 'Entende múltiplos pontos de vista morais e lida com ansiedade de forma mediada' }
    ]
  }
];

// MÓDULO 8: Atividades para Impressão
export const PRINTABLE_ACTIVITIES: PrintableActivity[] = [
  {
    id: 'prt-1',
    title: 'Desafio do Tracejado Reto e Curvo',
    category: 'Coordenação',
    description: 'Treino muscular de precisão fina ideal para pré-escrita de crianças pequenas.',
    instructions: 'Trace os caminhos dos carros até o posto de combustível sem encostar nas bordas das pistas.',
    suggestedAge: '3 a 5 anos',
    contentTemplate: 'Tracejado de Coordenação: Carro A -----🚙----> Posto, Avião B ~~~~~✈️~~~~> Nuvem'
  },
  {
    id: 'prt-2',
    title: 'Cruzadinha das Sílabas Simples',
    category: 'Exercício Pedagógico',
    description: 'Atividade de consolidação fonológica e alfabetização lúdica.',
    instructions: 'Complete as lacunas vazias com a sílaba correta correspondente à imagem ilustrada.',
    suggestedAge: '6 a 7 anos',
    contentTemplate: 'Sílabas: BO-__-LE-TA (BO-BO-LE-TA), CA-__-LO (CA-VA-LO), GAFANHOTO'
  },
  {
    id: 'prt-3',
    title: 'Sudoku Lúdico de Formas Geométricas',
    category: 'Raciocínio',
    description: 'Adaptação especial do clássico quebra-cabeça japonês para raciocínio lógico infantil.',
    instructions: 'Preencha cada linha e coluna sem repetir nenhuma das 4 formas: Círculo, Quadrado, Triângulo e Estrela.',
    suggestedAge: '7 a 10 anos',
    contentTemplate: 'Sudoku infantil 4x4. Linhas com figuras em sequência geométrica.'
  },
  {
    id: 'prt-4',
    title: 'O Diário de Sentimentos de Sol',
    category: 'Atividades Cognitivas',
    description: 'Atividade voltada para reconhecer, nomear e autorregular as emoções.',
    instructions: 'Circule os emojis que representam como você se sentiu hoje e escreva uma coisa boa que aconteceu.',
    suggestedAge: '5 a 8 anos',
    contentTemplate: 'Emojis de emoções: Feliz ☀️, Triste 🌧️, Bravo ⚡, Assustado 🌫️. Diário reflexivo.'
  }
];
