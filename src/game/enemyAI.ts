import type { Position, Entity } from '../types/game';

export function calculateEnemyMoves(
  enemies: Entity[],
  _playerPosition: Position,
  _boardSize: { width: number; height: number },
  _getEntityAt: (pos: Position) => Entity | null
): Map<string, Position> {
  const moves = new Map<string, Position>();

  for (const enemy of enemies) {
    // Slimes don't move - they are stationary obstacles
    moves.set(enemy.id, enemy.position);
  }

  return moves;
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
