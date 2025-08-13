import type { Position, Entity } from '../types/game';

export function calculateEnemyMoves(
  enemies: Entity[],
  playerPosition: Position,
  boardSize: { width: number; height: number },
  getEntityAt: (pos: Position) => Entity | null
): Map<string, Position> {
  const moves = new Map<string, Position>();

  for (const enemy of enemies) {
    if (enemy.type === 'slime') {
      // Slimes don't move
      moves.set(enemy.id, enemy.position);
    } else if (enemy.type === 'goblin') {
      const newPosition = calculateGoblinMove(
        enemy.position,
        playerPosition,
        boardSize,
        getEntityAt
      );
      moves.set(enemy.id, newPosition);
    }
  }

  return moves;
}

function calculateGoblinMove(
  goblinPosition: Position,
  playerPosition: Position,
  boardSize: { width: number; height: number },
  getEntityAt: (pos: Position) => Entity | null
): Position {
  // Calculate the distance to the player
  const dx = playerPosition.x - goblinPosition.x;
  const dy = playerPosition.y - goblinPosition.y;

  // Determine the direction to move (one square orthogonally toward the player)
  let targetX = goblinPosition.x;
  let targetY = goblinPosition.y;

  // Move horizontally first if there's a horizontal distance
  if (dx !== 0) {
    targetX = goblinPosition.x + Math.sign(dx);
  } else if (dy !== 0) {
    // If no horizontal distance, move vertically
    targetY = goblinPosition.y + Math.sign(dy);
  }

  const targetPosition = { x: targetX, y: targetY };

  // Check if the target position is valid (within bounds and not blocked)
  if (
    targetPosition.x >= 0 &&
    targetPosition.x < boardSize.width &&
    targetPosition.y >= 0 &&
    targetPosition.y < boardSize.height &&
    isPathClear(goblinPosition, targetPosition, getEntityAt)
  ) {
    return targetPosition;
  }

  // If the preferred move is blocked, stay in place
  return goblinPosition;
}

function isPathClear(
  _from: Position,
  to: Position,
  getEntityAt: (pos: Position) => Entity | null
): boolean {
  // For orthogonal moves of distance 1, just check if the target position is free
  // (excluding the player, since goblins can capture the player)
  const entityAtTarget = getEntityAt(to);
  return !entityAtTarget || entityAtTarget.type === 'player';
}

export function checkPlayerCaptured(
  playerPosition: Position,
  enemies: Entity[]
): boolean {
  return enemies.some(enemy => 
    enemy.position.x === playerPosition.x && 
    enemy.position.y === playerPosition.y
  );
}
