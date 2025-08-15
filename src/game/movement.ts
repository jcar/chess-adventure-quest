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
  { dx: 0, dy: -2, firstMoveOnly: true }, // Double move from start
  { dx: -1, dy: -1, canCapture: true }, // Diagonal capture left
  { dx: 1, dy: -1, canCapture: true }, // Diagonal capture right
];

// Rook moves in straight lines
const ROOK_MOVES: MoveRule[] = [];
for (let i = 1; i <= 7; i++) {
  ROOK_MOVES.push(
    { dx: i, dy: 0 },   // Right
    { dx: -i, dy: 0 },  // Left
    { dx: 0, dy: i },   // Down
    { dx: 0, dy: -i }   // Up
  );
}

// Bishop moves diagonally
const BISHOP_MOVES: MoveRule[] = [];
for (let i = 1; i <= 7; i++) {
  BISHOP_MOVES.push(
    { dx: i, dy: i },    // Down-right
    { dx: i, dy: -i },   // Up-right
    { dx: -i, dy: i },   // Down-left
    { dx: -i, dy: -i }   // Up-left
  );
}

// Queen combines rook and bishop moves
const QUEEN_MOVES: MoveRule[] = [...ROOK_MOVES, ...BISHOP_MOVES];

// King moves one square in any direction
const KING_MOVES: MoveRule[] = [
  { dx: 1, dy: 0 },   // Right
  { dx: -1, dy: 0 },  // Left
  { dx: 0, dy: 1 },   // Down
  { dx: 0, dy: -1 },  // Up
  { dx: 1, dy: 1 },   // Down-right
  { dx: 1, dy: -1 },  // Up-right
  { dx: -1, dy: 1 },  // Down-left
  { dx: -1, dy: -1 }  // Up-left
];

export function getPieceMovements(pieceType: PieceType): MoveRule[] {
  switch (pieceType) {
    case 'knight':
      return KNIGHT_MOVES;
    case 'pawn':
      return PAWN_MOVES;
    case 'rook':
      return ROOK_MOVES;
    case 'bishop':
      return BISHOP_MOVES;
    case 'queen':
      return QUEEN_MOVES;
    case 'king':
      return KING_MOVES;
    default:
      return [];
  }
}

export function isValidMove(
  from: Position,
  to: Position,
  pieceType: PieceType,
  boardSize: { width: number; height: number },
  hasEnemyAtPosition: (pos: Position) => boolean,
  isFirstMove: boolean = false
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
      // Check firstMoveOnly constraint for pawns
      if (move.firstMoveOnly && !isFirstMove) {
        continue;
      }
      
      if (pieceType === 'knight' || pieceType === 'king') {
        // Knights and Kings can move to empty squares or capture enemies
        return true;
      } else if (pieceType === 'pawn') {
        // For capture moves, check if there's an enemy at the target position
        if (move.canCapture) {
          return hasEnemyAtPosition(to);
        } else {
          // For non-capture moves, ensure there's no enemy at the target position
          return !hasEnemyAtPosition(to);
        }
      } else if (pieceType === 'rook' || pieceType === 'bishop' || pieceType === 'queen') {
        // Sliding pieces need clear path check
        if (isClearPath(from, to, hasEnemyAtPosition)) {
          return true;
        }
      }
    }
  }

  return false;
}

// Helper function to check if path is clear for sliding pieces
function isClearPath(
  from: Position,
  to: Position,
  hasEnemyAtPosition: (pos: Position) => boolean
): boolean {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  
  // Get the direction of movement
  const stepX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
  const stepY = dy === 0 ? 0 : dy > 0 ? 1 : -1;
  
  let x = from.x + stepX;
  let y = from.y + stepY;
  
  // Check each square along the path (excluding destination)
  while (x !== to.x || y !== to.y) {
    if (hasEnemyAtPosition({ x, y })) {
      return false; // Path blocked
    }
    x += stepX;
    y += stepY;
  }
  
  return true; // Path is clear
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
