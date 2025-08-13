import { describe, it, expect } from 'vitest';
import { calculateEnemyMoves, checkPlayerCaptured } from '../enemyAI';
import type { Entity, Position } from '../../types/game';

describe('Enemy AI', () => {
  const boardSize = { width: 5, height: 5 };
  
  describe('calculateEnemyMoves', () => {
    it('should not move slimes (stationary obstacles)', () => {
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

  });

  describe('checkPlayerCaptured', () => {
    it('should return true when player is at same position as slime', () => {
      const playerPosition: Position = { x: 2, y: 2 };
      const enemies: Entity[] = [
        { id: 'slime-1', type: 'slime', position: { x: 2, y: 2 } },
        { id: 'slime-2', type: 'slime', position: { x: 3, y: 3 } }
      ];
      
      expect(checkPlayerCaptured(playerPosition, enemies)).toBe(true);
    });

    it('should return false when player is not at same position as any enemy', () => {
      const playerPosition: Position = { x: 1, y: 1 };
      const enemies: Entity[] = [
        { id: 'slime-1', type: 'slime', position: { x: 2, y: 2 } },
        { id: 'slime-2', type: 'slime', position: { x: 3, y: 3 } }
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
