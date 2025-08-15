import type { World, WorldTheme } from '../types/game';

export const WORLDS: World[] = [
  {
    id: 'meadow-tutorial',
    name: '🌻 Meadow Tutorial',
    theme: 'meadow' as WorldTheme,
    description: 'Meet your new chess friends and learn how they move around the sunny meadows!',
    emoji: '🌻',
    unlocked: true,
    levelsCompleted: 0,
    totalLevels: 6
  },
  {
    id: 'goblin-woods',
    name: '🌲 Goblin Woods',
    theme: 'goblin-woods' as WorldTheme,
    description: 'Learn to capture silly goblins and protect the magical forest!',
    emoji: '🌲',
    unlocked: false,
    levelsCompleted: 0,
    totalLevels: 8
  },
  {
    id: 'glow-caves',
    name: '💎 Glow Caves',
    theme: 'glow-caves' as WorldTheme,
    description: 'Navigate dangerous glowing bridges and find safe paths through the caves!',
    emoji: '💎',
    unlocked: false,
    levelsCompleted: 0,
    totalLevels: 7
  },
  {
    id: 'royal-keep',
    name: '🏰 Royal Keep',
    theme: 'royal-keep' as WorldTheme,
    description: 'Learn to protect the king and master the art of checkmate!',
    emoji: '🏰',
    unlocked: false,
    levelsCompleted: 0,
    totalLevels: 6
  },
  {
    id: 'tactic-town',
    name: '⚔️ Tactic Town',
    theme: 'tactic-town' as WorldTheme,
    description: 'Master sneaky chess tricks like forks, pins, and skewers!',
    emoji: '⚔️',
    unlocked: false,
    levelsCompleted: 0,
    totalLevels: 7
  },
  {
    id: 'endgame-arena',
    name: '🏆 Endgame Arena',
    theme: 'endgame-arena' as WorldTheme,
    description: 'Learn the final skills to become a true chess champion!',
    emoji: '🏆',
    unlocked: false,
    levelsCompleted: 0,
    totalLevels: 6
  },
  {
    id: 'castle-siege',
    name: '⚔️ Castle Siege',
    theme: 'castle-siege' as WorldTheme,
    description: 'The ultimate adventure! Use all your skills to defend the realm!',
    emoji: '⚔️',
    unlocked: false,
    levelsCompleted: 0,
    totalLevels: 10
  }
];

export function getWorld(worldId: string): World | undefined {
  return WORLDS.find(world => world.id === worldId);
}

export function getWorldByTheme(theme: WorldTheme): World | undefined {
  return WORLDS.find(world => world.theme === theme);
}

export function getUnlockedWorlds(): World[] {
  return WORLDS.filter(world => world.unlocked);
}

export function getTotalWorlds(): number {
  return WORLDS.length;
}

export function getTotalLevelsInCurriculum(): number {
  return WORLDS.reduce((total, world) => total + world.totalLevels, 0);
}
