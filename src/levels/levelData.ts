import type { Level } from '../types/game';

export const LEVELS: Level[] = [
  {
    id: 'knight-tutorial',
    name: 'Knight First Steps',
    description: 'Learn the Knight\'s L-shaped movement! Go around the slime to reach the exit.',
    boardSize: { width: 4, height: 4 },
    player: {
      position: { x: 0, y: 3 },
      pieceType: 'knight'
    },
    coins: [],
    exit: { x: 3, y: 0 },
    enemies: [
      { type: 'slime', position: { x: 1, y: 1 } }
    ]
  },
  {
    id: 'pawn-tutorial',
    name: 'Pawn Power',
    description: 'Learn how the Pawn captures diagonally! Defeat the slime and reach the exit.',
    boardSize: { width: 4, height: 4 },
    player: {
      position: { x: 1, y: 3 },
      pieceType: 'pawn'
    },
    coins: [],
    exit: { x: 2, y: 0 },
    enemies: [
      { type: 'slime', position: { x: 2, y: 2 } }
    ]
  },
  {
    id: 'knight-capture',
    name: 'Knight vs Slimes',
    description: 'Show your Knight skills! Capture slimes or go around them.',
    boardSize: { width: 5, height: 5 },
    player: {
      position: { x: 0, y: 4 },
      pieceType: 'knight'
    },
    coins: [],
    exit: { x: 4, y: 0 },
    enemies: [
      { type: 'slime', position: { x: 2, y: 3 } },
      { type: 'slime', position: { x: 1, y: 1 } }
    ]
  },
  {
    id: 'pawn-challenge',
    name: 'Pawn\'s Journey',
    description: 'Navigate your Pawn carefully! Capture diagonally when needed.',
    boardSize: { width: 5, height: 5 },
    player: {
      position: { x: 0, y: 4 },
      pieceType: 'pawn'
    },
    coins: [],
    exit: { x: 4, y: 0 },
    enemies: [
      { type: 'slime', position: { x: 1, y: 3 } },
      { type: 'slime', position: { x: 3, y: 1 } }
    ]
  },
  {
    id: 'grand-finale',
    name: 'Chess Master Challenge',
    description: 'The ultimate test! Use all your chess knowledge to reach the exit.',
    boardSize: { width: 6, height: 6 },
    player: {
      position: { x: 0, y: 5 },
      pieceType: 'knight'
    },
    coins: [],
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
