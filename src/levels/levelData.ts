import type { Level } from '../types/game';

export const LEVELS: Level[] = [
  {
    id: 'knight-tutorial',
    name: '🌟 Sir Hopscotch\'s First Quest',
    description: 'Help Sir Hopscotch learn his magical L-shaped jumps! Hop around the silly green slime to find the golden door!',
    boardSize: { width: 4, height: 4 },
    player: {
      position: { x: 0, y: 3 },
      pieceType: 'knight'
    },
    coins: [
      { x: 2, y: 1 }  // A treasure to collect on the way!
    ],
    exit: { x: 3, y: 0 },
    enemies: [
      { type: 'slime', position: { x: 1, y: 1 } }
    ]
  },
  {
    id: 'pawn-tutorial',
    name: '⚡ Pawny\'s Big Adventure',
    description: 'Join Pawny the Brave on his first quest! March forward and use your diagonal power to defeat the goofy slime!',
    boardSize: { width: 4, height: 4 },
    player: {
      position: { x: 1, y: 3 },
      pieceType: 'pawn'
    },
    coins: [
      { x: 0, y: 1 },  // Treasure hidden to the side
      { x: 3, y: 1 }   // Another treasure to discover
    ],
    exit: { x: 2, y: 0 },
    enemies: [
      { type: 'slime', position: { x: 2, y: 2 } }
    ]
  },
  {
    id: 'knight-capture',
    name: '🗡️ Sir Hopscotch vs. Giggle Slimes',
    description: 'The giggly slimes are blocking the path to Rainbow Valley! Use your L-shaped magic to outsmart them!',
    boardSize: { width: 5, height: 5 },
    player: {
      position: { x: 0, y: 4 },
      pieceType: 'knight'
    },
    coins: [
      { x: 3, y: 3 },  // Treasure near the slimes
      { x: 1, y: 2 },  // Hidden gem
      { x: 4, y: 1 }   // Final treasure before exit
    ],
    exit: { x: 4, y: 0 },
    enemies: [
      { type: 'slime', position: { x: 2, y: 3 } },
      { type: 'slime', position: { x: 1, y: 1 } }
    ]
  },
  {
    id: 'pawn-challenge',
    name: '🏆 Pawny\'s Heroic Crystal Cave',
    description: 'Brave Pawny must rescue his friend from the Crystal Caves! Collect the magical crystals and defeat the cave slime!',
    boardSize: { width: 4, height: 5 },
    player: {
      position: { x: 1, y: 4 },
      pieceType: 'pawn'
    },
    coins: [
      { x: 0, y: 2 },  // Crystal treasure
      { x: 3, y: 3 },  // Another crystal  
      { x: 3, y: 0 }   // Friend rescue token (represented as coin)
    ],
    exit: { x: 2, y: 1 },
    enemies: [
      { type: 'slime', position: { x: 2, y: 2 } }
    ]
  },
  {
    id: 'grand-finale',
    name: '👑 The Dragon\'s Lair Challenge',
    description: 'Face the ultimate quest! Collect all the dragon\'s treasures and prove you\'re a true Chess Adventure Master!',
    boardSize: { width: 6, height: 6 },
    player: {
      position: { x: 0, y: 5 },
      pieceType: 'knight'
    },
    coins: [
      { x: 0, y: 2 },  // Dragon treasure 1
      { x: 3, y: 1 },  // Dragon treasure 2  
      { x: 5, y: 3 },  // Dragon treasure 3
      { x: 2, y: 4 },  // Friend rescue 1
      { x: 4, y: 1 }   // Friend rescue 2
    ],
    exit: { x: 5, y: 0 },
    enemies: [
      { type: 'slime', position: { x: 1, y: 4 } },
      { type: 'slime', position: { x: 2, y: 2 } },
      { type: 'slime', position: { x: 3, y: 4 } },
      { type: 'slime', position: { x: 4, y: 2 } },
      { type: 'slime', position: { x: 1, y: 0 } }
    ]
  }
];

export function validateLevel(level: Level): boolean {
  // Check board size
  if (level.boardSize.width <= 0 || level.boardSize.height <= 0) {
    return false;
  }

  // Check player position is within bounds
  if (!isPositionInBounds(level.player.position, level.boardSize)) {
    return false;
  }

  // Check exit position is within bounds
  if (!isPositionInBounds(level.exit, level.boardSize)) {
    return false;
  }

  // Check all coin positions are within bounds
  for (const coin of level.coins) {
    if (!isPositionInBounds(coin, level.boardSize)) {
      return false;
    }
  }

  // Check all enemy positions are within bounds
  for (const enemy of level.enemies) {
    if (!isPositionInBounds(enemy.position, level.boardSize)) {
      return false;
    }
  }

  // Check no overlapping positions
  const positions = new Set<string>();
  const addPosition = (pos: { x: number; y: number }, name: string): boolean => {
    const key = `${pos.x},${pos.y}`;
    if (positions.has(key)) {
      console.warn(`Position conflict at ${key} for ${name}`);
      return false;
    }
    positions.add(key);
    return true;
  };

  if (!addPosition(level.player.position, 'player')) return false;
  if (!addPosition(level.exit, 'exit')) return false;
  
  for (let i = 0; i < level.coins.length; i++) {
    if (!addPosition(level.coins[i], `coin ${i}`)) return false;
  }
  
  for (let i = 0; i < level.enemies.length; i++) {
    if (!addPosition(level.enemies[i].position, `enemy ${i}`)) return false;
  }

  return true;
}

function isPositionInBounds(
  position: { x: number; y: number },
  boardSize: { width: number; height: number }
): boolean {
  return (
    position.x >= 0 &&
    position.x < boardSize.width &&
    position.y >= 0 &&
    position.y < boardSize.height
  );
}

export function getLevel(index: number): Level | null {
  return index >= 0 && index < LEVELS.length ? LEVELS[index] : null;
}

export function getTotalLevels(): number {
  return LEVELS.length;
}
