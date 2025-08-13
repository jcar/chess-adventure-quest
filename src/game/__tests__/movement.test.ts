import { describe, it, expect } from 'vitest';
import { getPieceMovements, isValidMove, getValidMoves } from '../movement';
import type { Position } from '../../types/game';

describe('Movement Logic', () => {
  describe('getPieceMovements', () => {
    it('should return correct knight moves', () => {
      const knightMoves = getPieceMovements('knight');
      expect(knightMoves).toHaveLength(8);
      expect(knightMoves).toContainEqual({ dx: 2, dy: 1 });
      expect(knightMoves).toContainEqual({ dx: -2, dy: -1 });
      expect(knightMoves).toContainEqual({ dx: 1, dy: 2 });
      expect(knightMoves).toContainEqual({ dx: -1, dy: -2 });
    });

    it('should return correct pawn moves', () => {
      const pawnMoves = getPieceMovements('pawn');
      expect(pawnMoves).toHaveLength(3);
      expect(pawnMoves).toContainEqual({ dx: 0, dy: -1 }); // Forward
      expect(pawnMoves).toContainEqual({ dx: -1, dy: -1, canCapture: true }); // Diagonal capture
      expect(pawnMoves).toContainEqual({ dx: 1, dy: -1, canCapture: true }); // Diagonal capture
    });
  });

  describe('isValidMove', () => {
    const boardSize = { width: 5, height: 5 };
    const hasEnemyAtPosition = (pos: Position): boolean => {
      // Mock enemy at position (2, 2)
      return pos.x === 2 && pos.y === 2;
    };

    it('should validate knight moves correctly', () => {
      const from: Position = { x: 2, y: 3 };
      
      // Valid L-shaped moves
      expect(isValidMove(from, { x: 4, y: 4 }, 'knight', boardSize, hasEnemyAtPosition)).toBe(true);
      expect(isValidMove(from, { x: 0, y: 4 }, 'knight', boardSize, hasEnemyAtPosition)).toBe(true);
      expect(isValidMove(from, { x: 1, y: 1 }, 'knight', boardSize, hasEnemyAtPosition)).toBe(true);
      
      // Invalid moves
      expect(isValidMove(from, { x: 3, y: 4 }, 'knight', boardSize, hasEnemyAtPosition)).toBe(false); // Not L-shaped
      expect(isValidMove(from, { x: 2, y: 4 }, 'knight', boardSize, hasEnemyAtPosition)).toBe(false); // Straight line
    });

    it('should validate pawn moves correctly', () => {
      const from: Position = { x: 2, y: 3 };
      
      // Forward move blocked by enemy
      expect(isValidMove(from, { x: 2, y: 2 }, 'pawn', boardSize, hasEnemyAtPosition)).toBe(false); // Enemy present
      
      // Test clear forward move
      const from2: Position = { x: 1, y: 3 };
      expect(isValidMove(from2, { x: 1, y: 2 }, 'pawn', boardSize, hasEnemyAtPosition)).toBe(true); // Clear forward
      
      // Diagonal capture - should work only when enemy is at target
      expect(isValidMove(from, { x: 1, y: 2 }, 'pawn', boardSize, hasEnemyAtPosition)).toBe(false); // No enemy to capture
      expect(isValidMove(from, { x: 3, y: 2 }, 'pawn', boardSize, hasEnemyAtPosition)).toBe(false); // No enemy to capture
      
      // Test diagonal capture with enemy present
      const from3: Position = { x: 1, y: 3 };
      expect(isValidMove(from3, { x: 2, y: 2 }, 'pawn', boardSize, hasEnemyAtPosition)).toBe(true); // Diagonal capture enemy
      
      // Test forward move to empty square (1 square only)
      const from4: Position = { x: 3, y: 3 };
      expect(isValidMove(from4, { x: 3, y: 2 }, 'pawn', boardSize, hasEnemyAtPosition)).toBe(true); // Move to clear square
    });

    it('should reject out-of-bounds moves', () => {
      const from: Position = { x: 0, y: 0 };
      
      // Out of bounds moves
      expect(isValidMove(from, { x: -1, y: 1 }, 'knight', boardSize, hasEnemyAtPosition)).toBe(false);
      expect(isValidMove(from, { x: 1, y: -1 }, 'knight', boardSize, hasEnemyAtPosition)).toBe(false);
      expect(isValidMove(from, { x: 5, y: 1 }, 'knight', boardSize, hasEnemyAtPosition)).toBe(false);
      expect(isValidMove(from, { x: 1, y: 5 }, 'knight', boardSize, hasEnemyAtPosition)).toBe(false);
    });
  });

  describe('getValidMoves', () => {
    const boardSize = { width: 4, height: 4 };
    const hasEnemyAtPosition = (pos: Position): boolean => {
      return pos.x === 2 && pos.y === 2;
    };

    it('should return all valid knight moves from center', () => {
      const from: Position = { x: 2, y: 2 };
      const validMoves = getValidMoves(from, 'knight', boardSize, hasEnemyAtPosition);
      
      // Knight at (2,2) should have several valid moves in a 4x4 board
      expect(validMoves.length).toBeGreaterThan(0);
      expect(validMoves.length).toBeLessThanOrEqual(8);
      
      // All returned moves should be within bounds
      validMoves.forEach(move => {
        expect(move.x).toBeGreaterThanOrEqual(0);
        expect(move.x).toBeLessThan(boardSize.width);
        expect(move.y).toBeGreaterThanOrEqual(0);
        expect(move.y).toBeLessThan(boardSize.height);
      });
    });

    it('should return limited valid moves from corner', () => {
      const from: Position = { x: 0, y: 0 };
      const validMoves = getValidMoves(from, 'knight', boardSize, hasEnemyAtPosition);
      
      // Knight in corner has fewer valid moves
      expect(validMoves.length).toBeLessThanOrEqual(2);
    });

    it('should return valid pawn moves', () => {
      const from: Position = { x: 1, y: 2 };
      const validMoves = getValidMoves(from, 'pawn', boardSize, hasEnemyAtPosition);
      
      // Pawn should be able to move forward (and potentially capture diagonally)
      expect(validMoves.length).toBeGreaterThanOrEqual(1);
      
      // Should include forward move if path is clear
      const forwardMove = validMoves.find(move => move.x === 1 && move.y === 1);
      expect(forwardMove).toBeDefined();
    });
  });
});
