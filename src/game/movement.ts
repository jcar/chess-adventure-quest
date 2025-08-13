import type { Position, PieceType, MoveRule } from '../types/game';

const KNIGHT_MOVES: MoveRule[] = [
  { dx: 2, dy: 1 },
  { dx: 2, dy: -1 },
  { dx: -2, dy: 1 },
  { dx: -2, dy: -1 },
  { dx: 1, dy: 2 },
  { dx: 1, dy: -2 },
  { dx: -1, dy: 2 },
  { dx: -1, dy: -2 },
];

const PAWN_MOVES: MoveRule[] = [
  { dx: 0, dy: -1 }, // Forward move
  { dx: -1, dy: -1, canCapture: true }, // Diagonal capture left
  { dx: 1, dy: -1, canCapture: true }, // Diagonal capture right
];

export function getPieceMovements(pieceType: PieceType): MoveRule[] {
  switch (pieceType) {
    case 'knight':
      return KNIGHT_MOVES;
    case 'pawn':
      return PAWN_MOVES;
    default:
      return [];
  }
}

export function isValidMove(
  from: Position,
  to: Position,
  pieceType: PieceType,
  boardSize: { width: number; height: number },
  hasEnemyAtPosition: (pos: Position) => boolean
): boolean {
  // Check if the destination is within board bounds
  if (to.x < 0 || to.x >= boardSize.width || to.y < 0 || to.y >= boardSize.height) {
    return false;
  }

  const moves = getPieceMovements(pieceType);
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  for (const move of moves) {
    if (move.dx === dx && move.dy === dy) {
      if (pieceType === 'knight') {
        // Knights can move to empty squares or capture enemies
        // They can move through coins and exits but cannot capture them
        return true;
      } else if (pieceType === 'pawn') {
        // For capture moves, check if there's an enemy at the target position
        if (move.canCapture) {
          return hasEnemyAtPosition(to);
        } else {
          // For non-capture moves, ensure there's no enemy at the target position
          return !hasEnemyAtPosition(to);
        }
      }
    }
  }

  return false;
}

export function getValidMoves(
  from: Position,
  pieceType: PieceType,
  boardSize: { width: number; height: number },
  hasEnemyAtPosition: (pos: Position) => boolean
): Position[] {
  const validMoves: Position[] = [];
  const moves = getPieceMovements(pieceType);

  for (const move of moves) {
    const to = {
      x: from.x + move.dx,
      y: from.y + move.dy,
    };

    if (isValidMove(from, to, pieceType, boardSize, hasEnemyAtPosition)) {
      validMoves.push(to);
    }
  }

  return validMoves;
}
