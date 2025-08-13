import { describe, it, expect } from 'vitest';
import { calculateEnemyMoves, checkPlayerCaptured } from '../enemyAI';
import type { Entity, Position } from '../../types/game';

describe('Enemy AI', () => {
  const boardSize = { width: 5, height: 5 };
  
  describe('calculateEnemyMoves', () => {
    it('should not move slimes', () => {
      const enemies: Entity[] = [
        { id: 'slime-1', type: 'slime', position: { x: 2, y: 2 } },
        { id: 'slime-2', type: 'slime', position: { x: 3, y: 3 } }
      ];
      
      const playerPosition: Position = { x: 1, y: 1 };
      const getEntityAt = () => null;
      
      const moves = calculateEnemyMoves(enemies, playerPosition, boardSize, getEntityAt);
      
      expect(moves.get('slime-1')).toEqual({ x: 2, y: 2 });
      expect(moves.get('slime-2')).toEqual({ x: 3, y: 3 });
    });

    it('should move goblin toward player horizontally', () => {
      const enemies: Entity[] = [
        { id: 'goblin-1', type: 'goblin', position: { x: 0, y: 2 } }
      ];
      
      const playerPosition: Position = { x: 4, y: 2 };
      const getEntityAt = () => null;
      
      const moves = calculateEnemyMoves(enemies, playerPosition, boardSize, getEntityAt);
      
      // Goblin should move one square toward the player horizontally
      expect(moves.get('goblin-1')).toEqual({ x: 1, y: 2 });
    });

    it('should move goblin toward player vertically when horizontally aligned', () => {
      const enemies: Entity[] = [
        { id: 'goblin-1', type: 'goblin', position: { x: 2, y: 0 } }
      ];
      
      const playerPosition: Position = { x: 2, y: 3 };
      const getEntityAt = () => null;
      
      const moves = calculateEnemyMoves(enemies, playerPosition, boardSize, getEntityAt);
      
      // Goblin should move one square toward the player vertically
      expect(moves.get('goblin-1')).toEqual({ x: 2, y: 1 });
    });

    it('should not move goblin if path is blocked', () => {
      const enemies: Entity[] = [
        { id: 'goblin-1', type: 'goblin', position: { x: 2, y: 2 } }
      ];
      
      const playerPosition: Position = { x: 4, y: 2 };
      
      // Block the path with another entity
      const getEntityAt = (pos: Position): Entity | null => {
        if (pos.x === 3 && pos.y === 2) {
          return { id: 'obstacle', type: 'coin', position: pos } as Entity;
        }
        return null;
      };
      
      const moves = calculateEnemyMoves(enemies, playerPosition, boardSize, getEntityAt);
      
      // Goblin should stay in place since path is blocked
      expect(moves.get('goblin-1')).toEqual({ x: 2, y: 2 });
    });

    it('should allow goblin to move onto player position', () => {
      const enemies: Entity[] = [
        { id: 'goblin-1', type: 'goblin', position: { x: 2, y: 2 } }
      ];
      
      const playerPosition: Position = { x: 3, y: 2 };
      
      const getEntityAt = (pos: Position): Entity | null => {
        if (pos.x === playerPosition.x && pos.y === playerPosition.y) {
          return { id: 'player', type: 'player', position: pos, pieceType: 'knight' } as Entity;
        }
        return null;
      };
      
      const moves = calculateEnemyMoves(enemies, playerPosition, boardSize, getEntityAt);
      
      // Goblin should move onto the player to capture them
      expect(moves.get('goblin-1')).toEqual({ x: 3, y: 2 });
    });

    it('should handle goblins at board edges', () => {
      const enemies: Entity[] = [
        { id: 'goblin-1', type: 'goblin', position: { x: 4, y: 2 } }
      ];
      
      const playerPosition: Position = { x: 3, y: 2 };
      const getEntityAt = () => null;
      
      const moves = calculateEnemyMoves(enemies, playerPosition, boardSize, getEntityAt);
      
      // Goblin should move toward player
      expect(moves.get('goblin-1')).toEqual({ x: 3, y: 2 });
    });
  });

  describe('checkPlayerCaptured', () => {
    it('should return true when player is at same position as enemy', () => {
      const playerPosition: Position = { x: 2, y: 2 };
      const enemies: Entity[] = [
        { id: 'goblin-1', type: 'goblin', position: { x: 2, y: 2 } },
        { id: 'slime-1', type: 'slime', position: { x: 3, y: 3 } }
      ];
      
      expect(checkPlayerCaptured(playerPosition, enemies)).toBe(true);
    });

    it('should return false when player is not at same position as any enemy', () => {
      const playerPosition: Position = { x: 1, y: 1 };
      const enemies: Entity[] = [
        { id: 'goblin-1', type: 'goblin', position: { x: 2, y: 2 } },
        { id: 'slime-1', type: 'slime', position: { x: 3, y: 3 } }
      ];
      
      expect(checkPlayerCaptured(playerPosition, enemies)).toBe(false);
    });

    it('should return false with no enemies', () => {
      const playerPosition: Position = { x: 2, y: 2 };
      const enemies: Entity[] = [];
      
      expect(checkPlayerCaptured(playerPosition, enemies)).toBe(false);
    });
  });
});
