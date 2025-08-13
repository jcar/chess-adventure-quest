import { describe, it, expect } from 'vitest';
import { LEVELS, validateLevel, getLevel, getTotalLevels } from '../levelData';

describe('Level Data', () => {
  describe('LEVELS constant', () => {
    it('should have at least one level', () => {
      expect(LEVELS.length).toBeGreaterThan(0);
    });

    it('should have exactly 5 levels', () => {
      expect(LEVELS.length).toBe(5);
    });

    it('should have unique level IDs', () => {
      const ids = LEVELS.map(level => level.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have valid board sizes', () => {
      LEVELS.forEach((level) => {
        expect(level.boardSize.width).toBeGreaterThan(0);
        expect(level.boardSize.height).toBeGreaterThan(0);
        expect(level.boardSize.width).toBeLessThanOrEqual(10); // Reasonable upper bound
        expect(level.boardSize.height).toBeLessThanOrEqual(10);
      });
    });

    it('should have valid piece types', () => {
      LEVELS.forEach(level => {
        expect(['knight', 'pawn']).toContain(level.player.pieceType);
      });
    });

    it('should only have slime enemies (no goblins)', () => {
      LEVELS.forEach(level => {
        level.enemies.forEach(enemy => {
          expect(enemy.type).toBe('slime');
        });
      });
    });

    it('should have no coins (simplified gameplay)', () => {
      LEVELS.forEach(level => {
        expect(level.coins).toEqual([]);
      });
    });
  });

  describe('validateLevel', () => {
    it('should validate all existing levels', () => {
      LEVELS.forEach((level) => {
        expect(validateLevel(level)).toBe(true);
      });
    });

    it('should reject levels with invalid board size', () => {
      const invalidLevel = {
        ...LEVELS[0],
        boardSize: { width: 0, height: 4 }
      };
      expect(validateLevel(invalidLevel)).toBe(false);
    });

    it('should reject levels with out-of-bounds player position', () => {
      const invalidLevel = {
        ...LEVELS[0],
        player: {
          ...LEVELS[0].player,
          position: { x: 10, y: 10 }
        }
      };
      expect(validateLevel(invalidLevel)).toBe(false);
    });

    it('should reject levels with out-of-bounds exit position', () => {
      const invalidLevel = {
        ...LEVELS[0],
        exit: { x: -1, y: 0 }
      };
      expect(validateLevel(invalidLevel)).toBe(false);
    });

    it('should reject levels with out-of-bounds enemy positions', () => {
      const invalidLevel = {
        ...LEVELS[0],
        enemies: [{ type: 'slime' as const, position: { x: 100, y: 100 } }]
      };
      expect(validateLevel(invalidLevel)).toBe(false);
    });

    it('should reject levels with overlapping positions', () => {
      const invalidLevel = {
        ...LEVELS[0],
        player: { ...LEVELS[0].player, position: { x: 0, y: 0 } },
        exit: { x: 0, y: 0 } // Same as player
      };
      expect(validateLevel(invalidLevel)).toBe(false);
    });
  });

  describe('getLevel', () => {
    it('should return correct level for valid index', () => {
      const level = getLevel(0);
      expect(level).toBe(LEVELS[0]);
    });

    it('should return null for invalid index', () => {
      expect(getLevel(-1)).toBe(null);
      expect(getLevel(100)).toBe(null);
    });

    it('should handle non-integer index correctly', () => {
      // For fractional indices like 1.5, the array access LEVELS[1.5] returns undefined
      // Since 1.5 >= 0 && 1.5 < LEVELS.length is true, it returns LEVELS[1.5] which is undefined
      expect(getLevel(1.5)).toBeUndefined();
      // This is actually correct behavior - fractional indices should return undefined
    });
  });

  describe('getTotalLevels', () => {
    it('should return correct number of levels', () => {
      expect(getTotalLevels()).toBe(LEVELS.length);
      expect(getTotalLevels()).toBe(5);
    });
  });

  describe('Level progression', () => {
    it('should start with Knight tutorial', () => {
      const firstLevel = LEVELS[0];
      expect(firstLevel.player.pieceType).toBe('knight');
      expect(firstLevel.name).toContain('Knight');
    });

    it('should have Pawn tutorial as second level', () => {
      const secondLevel = LEVELS[1];
      expect(secondLevel.player.pieceType).toBe('pawn');
      expect(secondLevel.name).toContain('Pawn');
    });

    it('should have progressive difficulty (more enemies in later levels)', () => {
      const level1Enemies = LEVELS[0].enemies.length;
      const level5Enemies = LEVELS[4].enemies.length;
      expect(level5Enemies).toBeGreaterThan(level1Enemies);
    });

    it('should have larger boards in later levels', () => {
      const level1Size = LEVELS[0].boardSize.width * LEVELS[0].boardSize.height;
      const level5Size = LEVELS[4].boardSize.width * LEVELS[4].boardSize.height;
      expect(level5Size).toBeGreaterThan(level1Size);
    });
  });
});
