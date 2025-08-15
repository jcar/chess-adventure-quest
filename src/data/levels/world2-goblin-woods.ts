import type { Level } from '../../types/game';

export const WORLD2_GOBLIN_WOODS_LEVELS: Level[] = [
  {
    id: 'goblin-7-first-capture',
    name: '⚔️ First Capture',
    description: 'Oh no! A silly goblin blocks Pete\'s path! Learn to capture diagonally!',
    worldId: 'goblin-woods',
    levelNumber: 7,
    boardSize: { width: 4, height: 4 },
    player: {
      position: { x: 1, y: 3 },
      pieceType: 'pawn'
    },
    objectives: ['capture-specific', 'reach-exit'],
    coins: [],
    treasures: [{ x: 0, y: 0 }], // Victory treasure
    friends: [],
    exit: { x: 1, y: 0 },
    exitLocked: true, // Must capture the goblin first
    enemies: [
      {
        type: 'goblin',
        position: { x: 2, y: 2 },
        pieceType: 'pawn',
        name: 'Giggly Goblin'
      }
    ],
    dangerSquares: [],
    tutorialText: 'Pawns capture diagonally! Pete can\'t move through the goblin, but he can capture it diagonally!',
    characterIntro: {
      piece: 'pawn',
      name: 'Pawn Pete',
      greeting: '⚡ "That goblin is in my way! But I can capture diagonally - watch this!"',
      ability: 'I capture enemies diagonally forward - my secret weapon!'
    }
  },

  {
    id: 'goblin-8-knight-takedown',
    name: '🐴 Knight\'s First Takedown',
    description: 'Nelly shows off her L-shaped capture power! Jump and capture the goblin!',
    worldId: 'goblin-woods',
    levelNumber: 8,
    boardSize: { width: 5, height: 4 },
    player: {
      position: { x: 0, y: 3 },
      pieceType: 'knight'
    },
    objectives: ['capture-specific', 'reach-exit'],
    coins: [],
    treasures: [
      { x: 2, y: 1 }, // Horseshoe power-up
      { x: 4, y: 0 }  // Victory flag
    ],
    friends: [],
    exit: { x: 4, y: 0 },
    exitLocked: false,
    enemies: [
      {
        type: 'goblin',
        position: { x: 2, y: 2 },
        pieceType: 'knight',
        name: 'Clumsy Goblin'
      }
    ],
    dangerSquares: [],
    tutorialText: 'Knights can capture any enemy they can jump to! Show that goblin your L-shaped power!',
    characterIntro: {
      piece: 'knight',
      name: 'Knight Nelly',
      greeting: '🐴 "L-shapes aren\'t just for moving - I can capture enemies too! Charge!"',
      ability: 'I capture enemies at any L-shaped jump destination!'
    }
  },

  {
    id: 'goblin-9-rook-chase',
    name: '🚗 Rook Chase',
    description: 'Ruby races after a goblin! Line up in the same row or column to capture!',
    worldId: 'goblin-woods',
    levelNumber: 9,
    boardSize: { width: 5, height: 4 },
    player: {
      position: { x: 0, y: 2 },
      pieceType: 'rook'
    },
    objectives: ['capture-specific', 'reach-exit'],
    coins: [],
    treasures: [{ x: 3, y: 0 }], // Speed trophy
    friends: [],
    exit: { x: 4, y: 0 },
    exitLocked: false,
    enemies: [
      {
        type: 'goblin',
        position: { x: 3, y: 2 },
        pieceType: 'rook',
        name: 'Speedy Goblin'
      }
    ],
    dangerSquares: [],
    tutorialText: 'Rooks capture along their straight-line paths! Chase that goblin in a straight line!',
    characterIntro: {
      piece: 'rook',
      name: 'Rook Ruby',
      greeting: '🚗 "Time for a chase scene! I\'ll zoom straight at that goblin!"',
      ability: 'I capture enemies along my straight-line racing paths!'
    }
  },

  {
    id: 'goblin-10-bishop-ambush',
    name: '✨ Bishop Ambush',
    description: 'Barry sets up a diagonal ambush! Glide along the diagonal to surprise the goblin!',
    worldId: 'goblin-woods',
    levelNumber: 10,
    boardSize: { width: 5, height: 5 },
    player: {
      position: { x: 0, y: 4 },
      pieceType: 'bishop'
    },
    objectives: ['capture-specific', 'reach-exit'],
    coins: [],
    treasures: [{ x: 2, y: 2 }], // Diagonal crystal
    friends: [],
    exit: { x: 4, y: 0 },
    exitLocked: false,
    enemies: [
      {
        type: 'goblin',
        position: { x: 3, y: 1 },
        pieceType: 'bishop',
        name: 'Sneaky Goblin'
      }
    ],
    dangerSquares: [],
    tutorialText: 'Bishops capture along diagonal lines! Glide diagonally to ambush the goblin!',
    characterIntro: {
      piece: 'bishop',
      name: 'Bishop Barry',
      greeting: '✨ "A diagonal ambush! The goblin won\'t see me coming along this slanted path!"',
      ability: 'I capture enemies along my graceful diagonal glides!'
    }
  },

  {
    id: 'goblin-11-queen-sweep',
    name: '👑 Queen Sweep',
    description: 'Quinn shows her ultimate power! Capture TWO goblins using her royal abilities!',
    worldId: 'goblin-woods',
    levelNumber: 11,
    boardSize: { width: 6, height: 5 },
    player: {
      position: { x: 1, y: 4 },
      pieceType: 'queen'
    },
    objectives: ['capture-all', 'reach-exit'],
    coins: [],
    treasures: [{ x: 0, y: 0 }], // Royal victory crown
    friends: [],
    exit: { x: 5, y: 0 },
    exitLocked: false,
    enemies: [
      {
        type: 'goblin',
        position: { x: 1, y: 2 },
        pieceType: 'queen',
        name: 'First Goblin'
      },
      {
        type: 'goblin',
        position: { x: 3, y: 2 },
        pieceType: 'queen',
        name: 'Second Goblin'
      }
    ],
    dangerSquares: [],
    tutorialText: 'Queens can capture like rooks AND bishops! Use both powers to capture both goblins!',
    characterIntro: {
      piece: 'queen',
      name: 'Queen Quinn',
      greeting: '👑 "Two goblins? No problem! I have rook power AND bishop power!"',
      ability: 'Ultimate capture power: straight lines AND diagonals!'
    }
  },

  {
    id: 'goblin-12-goblin-guard',
    name: '🛡️ Goblin Guard',
    description: 'The exit is locked! Defeat the goblin guard to unlock the magical door!',
    worldId: 'goblin-woods',
    levelNumber: 12,
    boardSize: { width: 5, height: 4 },
    player: {
      position: { x: 0, y: 3 },
      pieceType: 'pawn'
    },
    objectives: ['capture-specific'],
    coins: [],
    treasures: [{ x: 1, y: 1 }], // Key treasure
    friends: [],
    exit: { x: 4, y: 0 },
    exitLocked: true, // Exit unlocks after defeating guard
    enemies: [
      {
        type: 'goblin',
        position: { x: 2, y: 2 },
        pieceType: 'pawn',
        name: 'Gate Guard Goblin',
        health: 1
      }
    ],
    dangerSquares: [],
    tutorialText: 'The door won\'t open until you defeat the guard! Capture the goblin to unlock the exit!',
    characterIntro: {
      piece: 'pawn',
      name: 'Pawn Pete',
      greeting: '⚡ "That guard has the key! I need to capture him to open the door!"',
      ability: 'Defeating enemies can unlock doors and passages!'
    }
  },

  {
    id: 'goblin-13-two-in-a-row',
    name: '🎯 Two in a Row',
    description: 'A strategic challenge! Capture the first goblin, then quickly get the second one!',
    worldId: 'goblin-woods',
    levelNumber: 13,
    boardSize: { width: 5, height: 5 },
    player: {
      position: { x: 0, y: 4 },
      pieceType: 'knight'
    },
    objectives: ['capture-all', 'reach-exit'],
    coins: [],
    treasures: [
      { x: 2, y: 2 }, // Strategy gem
      { x: 4, y: 0 }  // Victory banner
    ],
    friends: [],
    exit: { x: 4, y: 0 },
    exitLocked: false,
    enemies: [
      {
        type: 'goblin',
        position: { x: 1, y: 2 },
        pieceType: 'knight',
        name: 'Goblin A'
      },
      {
        type: 'goblin',
        position: { x: 3, y: 1 },
        pieceType: 'knight',
        name: 'Goblin B'
      }
    ],
    dangerSquares: [],
    tutorialText: 'Plan your L-shaped jumps! Capture the first goblin, then jump to capture the second!',
    characterIntro: {
      piece: 'knight',
      name: 'Knight Nelly',
      greeting: '🐴 "Two goblins need my L-shaped attention! Time for some jumping strategy!"',
      ability: 'Planning multiple jumps in sequence!'
    }
  },

  {
    id: 'goblin-14-capture-and-exit',
    name: '🏁 Capture and Exit',
    description: 'The final woods challenge! Capture the target goblin, then race to the far exit!',
    worldId: 'goblin-woods',
    levelNumber: 14,
    boardSize: { width: 6, height: 4 },
    player: {
      position: { x: 0, y: 2 },
      pieceType: 'rook'
    },
    objectives: ['capture-specific', 'reach-exit'],
    coins: [],
    treasures: [
      { x: 2, y: 1 }, // Halfway trophy
      { x: 5, y: 3 }  // Exit treasure
    ],
    friends: [],
    exit: { x: 5, y: 3 },
    exitLocked: false,
    enemies: [
      {
        type: 'goblin',
        position: { x: 3, y: 2 },
        pieceType: 'rook',
        name: 'Target Goblin'
      }
    ],
    dangerSquares: [],
    tutorialText: 'Capture the target, then zoom to the exit on the far side! Plan your route!',
    characterIntro: {
      piece: 'rook',
      name: 'Rook Ruby',
      greeting: '🚗 "Capture first, then race to the finish! I love a good challenge!"',
      ability: 'Combining capture and movement strategy!'
    }
  }
];
