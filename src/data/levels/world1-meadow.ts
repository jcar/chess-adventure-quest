import type { Level } from '../../types/game';

export const WORLD1_MEADOW_LEVELS: Level[] = [
  {
    id: 'meadow-1-pawn-first-steps',
    name: '🌟 Pawn Pete\'s First Steps',
    description: 'Meet Pawn Pete! Help him learn to walk forward in the sunny meadow!',
    worldId: 'meadow-tutorial',
    levelNumber: 1,
    boardSize: { width: 4, height: 4 },
    player: {
      position: { x: 1, y: 3 },
      pieceType: 'pawn',
      canDoublePawnMove: true
    },
    objectives: ['reach-exit'],
    coins: [],
    treasures: [{ x: 1, y: 1 }], // A flower to collect
    friends: [],
    exit: { x: 1, y: 0 },
    exitLocked: false,
    enemies: [],
    dangerSquares: [],
    tutorialText: 'Pawns move forward! Click the square in front of Pete, or try moving two squares from the start!',
    characterIntro: {
      piece: 'pawn',
      name: 'Pawn Pete',
      greeting: '⚡ "Hi there! I\'m Pawn Pete! I love to march forward to adventure!"',
      ability: 'I move forward 1 square, or 2 squares from my starting spot!'
    }
  },

  {
    id: 'meadow-2-double-step',
    name: '⚡ Double Step Power',
    description: 'Pete discovered he can take a big double step from his starting position!',
    worldId: 'meadow-tutorial',
    levelNumber: 2,
    boardSize: { width: 5, height: 5 },
    player: {
      position: { x: 2, y: 4 },
      pieceType: 'pawn',
      canDoublePawnMove: true
    },
    objectives: ['reach-exit', 'collect-treasures'],
    coins: [],
    treasures: [
      { x: 2, y: 2 }, // Flower in the middle
      { x: 1, y: 1 }  // Bonus flower
    ],
    friends: [],
    exit: { x: 2, y: 0 },
    exitLocked: false,
    enemies: [],
    dangerSquares: [],
    tutorialText: 'From your starting position, try Pete\'s special double-step power! Move 2 squares forward!',
    characterIntro: {
      piece: 'pawn',
      name: 'Pawn Pete',
      greeting: '💪 "I can take a BIG step - two squares - but only from where I start!"',
      ability: 'Special double-step from starting position!'
    }
  },

  {
    id: 'meadow-3-knight-big-jump',
    name: '🐴 Knight Nelly\'s Big Jump',
    description: 'Meet Knight Nelly! She loves to jump in exciting L-shapes across the meadow!',
    worldId: 'meadow-tutorial',
    levelNumber: 3,
    boardSize: { width: 4, height: 4 },
    player: {
      position: { x: 0, y: 3 },
      pieceType: 'knight'
    },
    objectives: ['reach-exit'],
    coins: [],
    treasures: [{ x: 2, y: 1 }], // Horseshoe treasure
    friends: [],
    exit: { x: 3, y: 0 },
    exitLocked: false,
    enemies: [],
    dangerSquares: [],
    tutorialText: 'Knights jump in L-shapes! Go 2 squares one way, then 1 square sideways. Try different L-shapes!',
    characterIntro: {
      piece: 'knight',
      name: 'Knight Nelly',
      greeting: '🐴 "Neighhhh! I\'m Knight Nelly! Watch me jump in L-shapes - it\'s like magic!"',
      ability: 'I jump in L-shapes: 2 squares one direction, then 1 square sideways!'
    }
  },

  {
    id: 'meadow-4-rook-races',
    name: '🚗 Rook Ruby Races',
    description: 'Meet Rook Ruby! She loves to zoom in straight lines super fast!',
    worldId: 'meadow-tutorial',
    levelNumber: 4,
    boardSize: { width: 5, height: 4 },
    player: {
      position: { x: 0, y: 3 },
      pieceType: 'rook'
    },
    objectives: ['reach-exit'],
    coins: [],
    treasures: [
      { x: 2, y: 3 }, // Speed boost
      { x: 4, y: 1 }  // Finish line flag
    ],
    friends: [],
    exit: { x: 4, y: 0 },
    exitLocked: false,
    enemies: [],
    dangerSquares: [],
    tutorialText: 'Rooks race in straight lines! Go up, down, left, or right as far as you want!',
    characterIntro: {
      piece: 'rook',
      name: 'Rook Ruby',
      greeting: '🚗 "Vroom vroom! I\'m Rook Ruby! I love to race in straight lines!"',
      ability: 'I zoom straight up, down, left, or right - super fast!'
    }
  },

  {
    id: 'meadow-5-bishop-glides',
    name: '✨ Bishop Barry Glides',
    description: 'Meet Bishop Barry! He glides gracefully along diagonal paths like a dancer!',
    worldId: 'meadow-tutorial',
    levelNumber: 5,
    boardSize: { width: 5, height: 5 },
    player: {
      position: { x: 0, y: 4 },
      pieceType: 'bishop'
    },
    objectives: ['reach-exit'],
    coins: [],
    treasures: [
      { x: 1, y: 3 }, // Sparkle
      { x: 3, y: 1 }  // Crystal
    ],
    friends: [],
    exit: { x: 4, y: 0 },
    exitLocked: false,
    enemies: [],
    dangerSquares: [],
    tutorialText: 'Bishops glide diagonally! Move along the slanted lines from corner to corner!',
    characterIntro: {
      piece: 'bishop',
      name: 'Bishop Barry',
      greeting: '✨ "Greetings! I\'m Bishop Barry! I dance along diagonal paths with grace!"',
      ability: 'I glide diagonally - like drawing lines from corner to corner!'
    }
  },

  {
    id: 'meadow-6-queen-can-do-all',
    name: '👑 Queen Quinn Can Do It All',
    description: 'Meet Queen Quinn! She has ALL the powers of her friends combined!',
    worldId: 'meadow-tutorial',
    levelNumber: 6,
    boardSize: { width: 6, height: 5 },
    player: {
      position: { x: 0, y: 4 },
      pieceType: 'queen'
    },
    objectives: ['reach-exit', 'collect-treasures'],
    coins: [],
    treasures: [
      { x: 2, y: 4 }, // Royal gem (horizontal like rook)
      { x: 3, y: 1 }, // Royal crown (diagonal like bishop) 
      { x: 5, y: 2 }  // Victory crown near exit
    ],
    friends: [],
    exit: { x: 5, y: 0 },
    exitLocked: false,
    enemies: [],
    dangerSquares: [],
    tutorialText: 'Queens can move like rooks (straight lines) AND bishops (diagonals)! Try both powers!',
    characterIntro: {
      piece: 'queen',
      name: 'Queen Quinn',
      greeting: '👑 "I\'m Queen Quinn! I have the powers of ALL my friends - rook AND bishop!"',
      ability: 'Ultimate power: I move straight lines AND diagonals!'
    }
  }
];
