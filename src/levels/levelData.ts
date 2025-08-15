// This file now serves as a bridge to the comprehensive curriculum system
// All level data is managed through the curriculum system in /data/

import { getLevel, getTotalLevels, ALL_LEVELS } from '../data/curriculum';
import type { Level } from '../types/game';

// Legacy export for backward compatibility
export const LEVELS: Level[] = ALL_LEVELS;

// Re-export the curriculum functions for backward compatibility
export { getLevel, getTotalLevels };

// Keep the old functions but route them to the new system
export function validateLevel(level: Level): boolean {
  // Enhanced validation for the new comprehensive level structure
  if (!level || typeof level !== 'object') {
    return false;
  }

  // Check required fields
  const requiredFields = ['id', 'name', 'description', 'worldId', 'levelNumber', 'boardSize', 'player', 'objectives', 'exit'];
  for (const field of requiredFields) {
    if (!(field in level)) {
      console.warn(`Level validation failed: missing field '${field}'`);
      return false;
    }
  }

  // Check board size
  if (level.boardSize.width <= 0 || level.boardSize.height <= 0) {
    console.warn('Level validation failed: invalid board size');
    return false;
  }

  // Check player position is within bounds
  if (!isPositionInBounds(level.player.position, level.boardSize)) {
    console.warn('Level validation failed: player position out of bounds');
    return false;
  }

  // Check exit position is within bounds
  if (!isPositionInBounds(level.exit, level.boardSize)) {
    console.warn('Level validation failed: exit position out of bounds');
    return false;
  }

  // Check all treasure positions are within bounds
  for (const treasure of level.treasures || []) {
    if (!isPositionInBounds(treasure, level.boardSize)) {
      console.warn('Level validation failed: treasure position out of bounds');
      return false;
    }
  }

  // Check all friend positions are within bounds
  for (const friend of level.friends || []) {
    if (!isPositionInBounds(friend, level.boardSize)) {
      console.warn('Level validation failed: friend position out of bounds');
      return false;
    }
  }

  // Check all coin positions are within bounds (legacy support)
  for (const coin of level.coins || []) {
    if (!isPositionInBounds(coin, level.boardSize)) {
      console.warn('Level validation failed: coin position out of bounds');
      return false;
    }
  }

  // Check all enemy positions are within bounds
  for (const enemy of level.enemies || []) {
    if (!isPositionInBounds(enemy.position, level.boardSize)) {
      console.warn('Level validation failed: enemy position out of bounds');
      return false;
    }
  }

  // Check all danger square positions are within bounds
  for (const danger of level.dangerSquares || []) {
    if (!isPositionInBounds(danger.position, level.boardSize)) {
      console.warn('Level validation failed: danger square position out of bounds');
      return false;
    }
  }

  // Check for overlapping positions (optional - might be valid in some cases)
  // This is more lenient than the original implementation
  const positions = new Set<string>();
  const addPosition = (pos: { x: number; y: number }, name: string): boolean => {
    const key = `${pos.x},${pos.y}`;
    if (positions.has(key)) {
      console.info(`Position overlap at ${key} for ${name} - this might be intentional`);
    }
    positions.add(key);
    return true;
  };

  addPosition(level.player.position, 'player');
  addPosition(level.exit, 'exit');
  
  level.treasures?.forEach((treasure, i) => addPosition(treasure, `treasure ${i}`));
  level.friends?.forEach((friend, i) => addPosition(friend, `friend ${i}`));
  level.coins?.forEach((coin, i) => addPosition(coin, `coin ${i}`));
  level.enemies?.forEach((enemy, i) => addPosition(enemy.position, `enemy ${i}`));
  level.dangerSquares?.forEach((danger, i) => addPosition(danger.position, `danger ${i}`));

  return true;
}

// Utility function for position bounds checking
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
