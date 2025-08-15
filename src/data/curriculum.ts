import type { Level, LevelObjective } from '../types/game';
import { WORLD1_MEADOW_LEVELS } from './levels/world1-meadow';
import { WORLD2_GOBLIN_WOODS_LEVELS } from './levels/world2-goblin-woods';
import { WORLDS } from './worlds';

// Comprehensive 50-level curriculum
export const ALL_LEVELS: Level[] = [
  ...WORLD1_MEADOW_LEVELS,
  ...WORLD2_GOBLIN_WOODS_LEVELS,
  
  // World 3 - Glow Caves (7 levels) - Placeholder structure for now
  // We'll implement these levels next
  ...(Array.from({ length: 7 }, (_, i) => ({
    id: `glow-caves-${i + 15}`,
    name: `💎 Cave Level ${i + 1}`,
    description: 'Navigate dangerous glowing paths and avoid danger squares!',
    worldId: 'glow-caves',
    levelNumber: i + 15,
    boardSize: { width: 5, height: 5 },
    player: { position: { x: 0, y: 4 }, pieceType: 'pawn' as const },
    objectives: ['avoid-danger', 'reach-exit'] as LevelObjective[],
    coins: [],
    treasures: [],
    friends: [],
    exit: { x: 4, y: 0 },
    exitLocked: false,
    enemies: [],
    dangerSquares: []
  }))),
  
  // World 4 - Royal Keep (6 levels) - Placeholder structure for now
  ...(Array.from({ length: 6 }, (_, i) => ({
    id: `royal-keep-${i + 22}`,
    name: `🏰 Royal Level ${i + 1}`,
    description: 'Learn about check, checkmate, and protecting the king!',
    worldId: 'royal-keep',
    levelNumber: i + 22,
    boardSize: { width: 5, height: 5 },
    player: { position: { x: 0, y: 4 }, pieceType: 'king' as const },
    objectives: ['avoid-danger', 'checkmate'] as LevelObjective[],
    coins: [],
    treasures: [],
    friends: [],
    exit: { x: 4, y: 0 },
    exitLocked: false,
    enemies: [],
    dangerSquares: []
  }))),
  
  // World 5 - Tactic Town (7 levels) - Placeholder structure for now
  ...(Array.from({ length: 7 }, (_, i) => ({
    id: `tactic-town-${i + 28}`,
    name: `⚔️ Tactic Level ${i + 1}`,
    description: 'Master advanced chess tactics like forks, pins, and skewers!',
    worldId: 'tactic-town',
    levelNumber: i + 28,
    boardSize: { width: 6, height: 6 },
    player: { position: { x: 0, y: 5 }, pieceType: 'knight' as const },
    objectives: ['create-tactic', 'reach-exit'] as LevelObjective[],
    coins: [],
    treasures: [],
    friends: [],
    exit: { x: 5, y: 0 },
    exitLocked: false,
    enemies: [],
    dangerSquares: []
  }))),
  
  // World 6 - Endgame Arena (6 levels) - Placeholder structure for now
  ...(Array.from({ length: 6 }, (_, i) => ({
    id: `endgame-arena-${i + 35}`,
    name: `🏆 Endgame Level ${i + 1}`,
    description: 'Master endgame techniques and become a chess champion!',
    worldId: 'endgame-arena',
    levelNumber: i + 35,
    boardSize: { width: 6, height: 6 },
    player: { position: { x: 0, y: 5 }, pieceType: 'queen' as const },
    objectives: ['checkmate'] as LevelObjective[],
    coins: [],
    treasures: [],
    friends: [],
    exit: { x: 5, y: 0 },
    exitLocked: false,
    enemies: [],
    dangerSquares: []
  }))),
  
  // World 7 - Castle Siege (10 levels) - Placeholder structure for now
  ...(Array.from({ length: 10 }, (_, i) => ({
    id: `castle-siege-${i + 41}`,
    name: `⚔️ Siege Level ${i + 1}`,
    description: 'The ultimate chess adventure challenge!',
    worldId: 'castle-siege',
    levelNumber: i + 41,
    boardSize: { width: 7, height: 7 },
    player: { position: { x: 0, y: 6 }, pieceType: 'queen' as const },
    objectives: ['collect-treasures', 'rescue-friends', 'checkmate'] as LevelObjective[],
    coins: [],
    treasures: [],
    friends: [],
    exit: { x: 6, y: 0 },
    exitLocked: false,
    enemies: [],
    dangerSquares: []
  })))
];

// Validate that we have exactly 50 levels
if (ALL_LEVELS.length !== 50) {
  console.warn(`Expected 50 levels, but found ${ALL_LEVELS.length}`);
}

// Utility functions for accessing curriculum data
export function getLevel(index: number): Level | null {
  return index >= 0 && index < ALL_LEVELS.length ? ALL_LEVELS[index] : null;
}

export function getLevelById(id: string): Level | null {
  return ALL_LEVELS.find(level => level.id === id) || null;
}

export function getLevelsByWorld(worldId: string): Level[] {
  return ALL_LEVELS.filter(level => level.worldId === worldId);
}

export function getTotalLevels(): number {
  return ALL_LEVELS.length;
}

export function getWorldProgress(worldId: string): { completed: number; total: number } {
  const worldLevels = getLevelsByWorld(worldId);
  return {
    completed: 0, // This will be tracked by game state
    total: worldLevels.length
  };
}

export function getLevelProgress(levelIndex: number): { current: number; total: number } {
  return {
    current: Math.min(levelIndex + 1, ALL_LEVELS.length),
    total: ALL_LEVELS.length
  };
}

export function getNextLevel(currentIndex: number): Level | null {
  return getLevel(currentIndex + 1);
}

export function getPreviousLevel(currentIndex: number): Level | null {
  return getLevel(currentIndex - 1);
}

export function isLastLevel(levelIndex: number): boolean {
  return levelIndex >= ALL_LEVELS.length - 1;
}

export function isFirstLevel(levelIndex: number): boolean {
  return levelIndex <= 0;
}

export function getWorldByLevel(levelIndex: number): typeof WORLDS[0] | null {
  const level = getLevel(levelIndex);
  if (!level) return null;
  
  return WORLDS.find(world => world.id === level.worldId) || null;
}

// Character progression tracking
export function getIntroducedCharacters(throughLevel: number): string[] {
  const characters = new Set<string>();
  
  for (let i = 0; i <= throughLevel && i < ALL_LEVELS.length; i++) {
    const level = ALL_LEVELS[i];
    if (level.characterIntro) {
      characters.add(level.characterIntro.piece);
    }
  }
  
  return Array.from(characters);
}

// Learning objective tracking
export function getMasteredObjectives(throughLevel: number): string[] {
  const objectives = new Set<string>();
  
  for (let i = 0; i <= throughLevel && i < ALL_LEVELS.length; i++) {
    const level = ALL_LEVELS[i];
    level.objectives.forEach(objective => objectives.add(objective));
  }
  
  return Array.from(objectives);
}
