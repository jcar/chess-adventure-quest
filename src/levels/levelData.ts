import type { Level } from '../types/game';

export const LEVELS: Level[] = [
  {
    id: 'knight-tutorial',
    name: 'Knight Training',
    description: 'Learn how the Knight moves in an L-shape! Collect the coin and reach the exit.',
    boardSize: { width: 4, height: 4 },
    player: {
      position: { x: 0, y: 3 },
      pieceType: 'knight'
    },
    coins: [{ x: 2, y: 1 }],
    exit: { x: 3, y: 0 },
    enemies: []
  },
  {
    id: 'pawn-tutorial',
    name: 'Pawn Practice',
    description: 'Learn how the Pawn moves forward and captures diagonally! Defeat the slime and collect the coin.',
    boardSize: { width: 4, height: 4 },
    player: {
      position: { x: 1, y: 3 },
      pieceType: 'pawn'
    },
    coins: [{ x: 2, y: 0 }],
    exit: { x: 3, y: 0 },
    enemies: [
      { type: 'slime', position: { x: 1, y: 2 } }
    ]
  },
  {
    id: 'knight-challenge-1',
    name: 'Knight vs Goblins',
    description: 'Use your Knight to outmaneuver the goblins!',
    boardSize: { width: 5, height: 5 },
    player: {
      position: { x: 0, y: 4 },
      pieceType: 'knight'
    },
    coins: [
      { x: 2, y: 2 },
      { x: 4, y: 1 }
    ],
    exit: { x: 4, y: 0 },
    enemies: [
      { type: 'goblin', position: { x: 1, y: 2 } },
      { type: 'slime', position: { x: 3, y: 3 } }
    ]
  },
  {
    id: 'pawn-challenge-1',
    name: 'Pawn Power',
    description: 'Guide your Pawn through enemy territory!',
    boardSize: { width: 5, height: 5 },
    player: {
      position: { x: 2, y: 4 },
      pieceType: 'pawn'
    },
    coins: [
      { x: 1, y: 2 },
      { x: 3, y: 1 }
    ],
    exit: { x: 2, y: 0 },
    enemies: [
      { type: 'slime', position: { x: 1, y: 3 } },
      { type: 'slime', position: { x: 3, y: 2 } },
      { type: 'goblin', position: { x: 0, y: 1 } }
    ]
  },
  {
    id: 'mixed-challenge',
    name: 'The Grand Adventure',
    description: 'A challenging level to test all your skills!',
    boardSize: { width: 5, height: 5 },
    player: {
      position: { x: 0, y: 4 },
      pieceType: 'knight'
    },
    coins: [
      { x: 1, y: 1 },
      { x: 3, y: 3 },
      { x: 4, y: 2 }
    ],
    exit: { x: 4, y: 0 },
    enemies: [
      { type: 'goblin', position: { x: 2, y: 3 } },
      { type: 'goblin', position: { x: 4, y: 4 } },
      { type: 'slime', position: { x: 1, y: 2 } },
      { type: 'slime', position: { x: 3, y: 1 } }
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
