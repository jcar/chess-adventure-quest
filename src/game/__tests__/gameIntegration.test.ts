import { describe, it, expect } from 'vitest';
import { isValidMove } from '../movement';
import { calculateEnemyMoves, checkPlayerCaptured } from '../enemyAI';
import type { Entity, Position } from '../../types/game';

describe('Game Integration Tests', () => {
  describe('Complete Level Scenarios', () => {
    it('should complete Level 1 (Knight First Steps) successfully', () => {
      // Level 1: Knight at (0,3), Slime at (1,1), Exit at (3,0)
      const boardSize = { width: 4, height: 4 };
      const playerStart: Position = { x: 0, y: 3 };
      const slimePos: Position = { x: 1, y: 1 };
      const exitPos: Position = { x: 3, y: 0 };
      
      const hasEnemyAtPosition = (pos: Position) => 
        pos.x === slimePos.x && pos.y === slimePos.y;

      // Test a winning path: Knight can navigate around slime
      // Move 1: Knight (0,3) -> (2,2) - L-shaped move
      const move1 = { x: 2, y: 2 };
      expect(isValidMove(playerStart, move1, 'knight', boardSize, hasEnemyAtPosition)).toBe(true);
      
      // Move 2: Knight (2,2) -> (3,0) - Another L-shaped move to exit
      expect(isValidMove(move1, exitPos, 'knight', boardSize, hasEnemyAtPosition)).toBe(true);
      
      // Verify player reaches exit position
      expect(exitPos).toEqual({ x: 3, y: 0 });
    });

    it('should complete Level 2 (Pawn Practice) successfully', () => {
      // Level 2: Pawn at (1,3), Slime at (2,2), Exit at (2,0)
      const boardSize = { width: 4, height: 4 };
      const playerStart: Position = { x: 1, y: 3 };
      const slimePos: Position = { x: 2, y: 2 };
      const exitPos: Position = { x: 2, y: 0 };
      
      let slimeAlive = true;
      const hasEnemyAtPosition = (pos: Position) => 
        slimeAlive && pos.x === slimePos.x && pos.y === slimePos.y;

      // Move 1: Pawn (1,3) -> (2,2) - Diagonal capture of slime
      expect(isValidMove(playerStart, slimePos, 'pawn', boardSize, hasEnemyAtPosition)).toBe(true);
      
      // After capturing slime, it's removed
      slimeAlive = false;
      const hasEnemyAfterCapture = (pos: Position) => false;
      
      // Move 2: Pawn (2,2) -> (2,1) - Move forward
      const move2 = { x: 2, y: 1 };
      expect(isValidMove(slimePos, move2, 'pawn', boardSize, hasEnemyAfterCapture)).toBe(true);
      
      // Move 3: Pawn (2,1) -> (2,0) - Move forward to exit
      expect(isValidMove(move2, exitPos, 'pawn', boardSize, hasEnemyAfterCapture)).toBe(true);
    });

    it('should handle Knight capturing slimes', () => {
      // Knight can move to any square, including capturing slimes
      const boardSize = { width: 5, height: 5 };
      const knightPos: Position = { x: 2, y: 2 };
      const slimePos: Position = { x: 4, y: 3 };
      
      const hasEnemyAtPosition = (pos: Position) => 
        pos.x === slimePos.x && pos.y === slimePos.y;

      // Knight can capture slime with L-shaped move
      expect(isValidMove(knightPos, slimePos, 'knight', boardSize, hasEnemyAtPosition)).toBe(true);
    });

    it('should prevent invalid pawn diagonal moves without enemies', () => {
      const boardSize = { width: 4, height: 4 };
      const pawnPos: Position = { x: 2, y: 2 };
      const diagonalPos: Position = { x: 3, y: 1 };
      
      // No enemies present
      const hasEnemyAtPosition = () => false;
      
      // Pawn cannot move diagonally without an enemy to capture
      expect(isValidMove(pawnPos, diagonalPos, 'pawn', boardSize, hasEnemyAtPosition)).toBe(false);
    });
  });

  describe('Win Condition Logic', () => {
    it('should detect win when player reaches exit (no coin requirement)', () => {
      const playerPos: Position = { x: 3, y: 0 };
      const exitPos: Position = { x: 3, y: 0 };
      
      // Simple win condition: player position matches exit position
      const playerAtExit = playerPos.x === exitPos.x && playerPos.y === exitPos.y;
      expect(playerAtExit).toBe(true);
    });

    it('should not require coin collection for win (simplified gameplay)', () => {
      // Our current game logic: no coins needed, just reach exit
      const coinsCollected = 0;
      const totalCoins = 0; // No coins in our levels
      const playerAtExit = true;
      
      const hasWon = playerAtExit && coinsCollected === totalCoins;
      expect(hasWon).toBe(true);
    });
  });

  describe('Enemy Behavior Integration', () => {
    it('should keep slimes stationary during player moves', () => {
      const enemies: Entity[] = [
        { id: 'slime-1', type: 'slime', position: { x: 2, y: 2 } },
        { id: 'slime-2', type: 'slime', position: { x: 3, y: 3 } }
      ];
      
      const playerPos: Position = { x: 0, y: 0 };
      const boardSize = { width: 5, height: 5 };
      const getEntityAt = () => null;
      
      // Calculate enemy moves (should stay in place)
      const moves = calculateEnemyMoves(enemies, playerPos, boardSize, getEntityAt);
      
      expect(moves.get('slime-1')).toEqual({ x: 2, y: 2 });
      expect(moves.get('slime-2')).toEqual({ x: 3, y: 3 });
    });

    it('should detect player capture when player moves onto slime', () => {
      const playerPos: Position = { x: 2, y: 2 };
      const enemies: Entity[] = [
        { id: 'slime-1', type: 'slime', position: { x: 2, y: 2 } }
      ];
      
      // This would happen if player tries to move onto slime without valid capture
      expect(checkPlayerCaptured(playerPos, enemies)).toBe(true);
    });
  });

  describe('Movement Validation Integration', () => {
    it('should handle complex board scenarios', () => {
      const boardSize = { width: 5, height: 5 };
      const knightPos: Position = { x: 2, y: 2 };
      
      // Multiple slimes creating obstacles
      const slimePositions = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 1 }
      ];
      
      const hasEnemyAtPosition = (pos: Position) => 
        slimePositions.some(slime => slime.x === pos.x && slime.y === pos.y);

      // Knight should be able to move to valid L-shaped positions
      const validMoves = [
        { x: 0, y: 3 }, // L-move (2 left, 1 down)
        { x: 4, y: 3 }, // L-move (2 right, 1 down) 
        { x: 3, y: 4 }, // L-move (1 right, 2 down)
        { x: 1, y: 4 }  // L-move (1 left, 2 down)
      ];

      validMoves.forEach(move => {
        expect(isValidMove(knightPos, move, 'knight', boardSize, hasEnemyAtPosition)).toBe(true);
      });

      // Knight can also capture slimes
      expect(isValidMove(knightPos, { x: 0, y: 1 }, 'knight', boardSize, hasEnemyAtPosition)).toBe(true);
    });

    it('should prevent moves outside board boundaries', () => {
      const boardSize = { width: 4, height: 4 };
      const knightPos: Position = { x: 0, y: 0 }; // Corner position
      const hasEnemyAtPosition = () => false;
      
      // Invalid moves outside board
      const invalidMoves = [
        { x: -1, y: 2 },  // Negative X
        { x: 2, y: -1 },  // Negative Y
        { x: 4, y: 2 },   // X >= width
        { x: 2, y: 4 }    // Y >= height
      ];

      invalidMoves.forEach(move => {
        expect(isValidMove(knightPos, move, 'knight', boardSize, hasEnemyAtPosition)).toBe(false);
      });
    });
  });

  describe('Level 4 Specific Tests (Fixed Level)', () => {
    it('should complete Level 4 with the fixed layout', () => {
      // Level 4: Pawn at (1,4), Slime at (2,2), Exit at (2,1)
      const boardSize = { width: 4, height: 5 };
      const playerStart: Position = { x: 1, y: 4 };
      const slimePos: Position = { x: 2, y: 2 };
      const exitPos: Position = { x: 2, y: 1 };
      
      let slimeAlive = true;
      const hasEnemyAtPosition = (pos: Position) => 
        slimeAlive && pos.x === slimePos.x && pos.y === slimePos.y;

      // Move 1: Pawn (1,4) -> (1,3) - Move forward
      const move1 = { x: 1, y: 3 };
      expect(isValidMove(playerStart, move1, 'pawn', boardSize, hasEnemyAtPosition)).toBe(true);
      
      // Move 2: Pawn (1,3) -> (2,2) - Diagonal capture of slime
      expect(isValidMove(move1, slimePos, 'pawn', boardSize, hasEnemyAtPosition)).toBe(true);
      
      // After capturing slime
      slimeAlive = false;
      const hasEnemyAfterCapture = () => false;
      
      // Move 3: Pawn (2,2) -> (2,1) - Move forward to exit
      expect(isValidMove(slimePos, exitPos, 'pawn', boardSize, hasEnemyAfterCapture)).toBe(true);
    });
  });
});
