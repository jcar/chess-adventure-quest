export type PieceType = 'pawn' | 'knight' | 'rook' | 'bishop' | 'queen' | 'king';

export type EntityType = 'player' | 'coin' | 'exit' | 'slime' | 'goblin' | 'danger' | 'treasure' | 'friend' | 'boss';

export type WorldTheme = 'meadow' | 'goblin-woods' | 'glow-caves' | 'royal-keep' | 'tactic-town' | 'endgame-arena' | 'castle-siege';

export type LevelObjective = 'reach-exit' | 'capture-all' | 'capture-specific' | 'collect-treasures' | 'rescue-friends' | 'avoid-danger' | 'checkmate' | 'create-tactic' | 'timed-challenge';

export interface Position {
  x: number;
  y: number;
}

export interface Entity {
  id: string;
  type: EntityType;
  position: Position;
  pieceType?: PieceType; // Only for player entities
  health?: number; // For boss enemies
  patrolPath?: Position[]; // For moving enemies
  coverageType?: PieceType; // For danger squares (what piece type creates the danger)
}

export interface World {
  id: string;
  name: string;
  theme: WorldTheme;
  description: string;
  emoji: string;
  unlocked: boolean;
  levelsCompleted: number;
  totalLevels: number;
}

export interface Level {
  id: string;
  name: string;
  description: string;
  worldId: string;
  levelNumber: number; // 1-50 overall progression
  boardSize: { width: number; height: number };
  player: {
    position: Position;
    pieceType: PieceType;
    canDoublePawnMove?: boolean; // For pawn levels
  };
  objectives: LevelObjective[];
  coins: Position[];
  treasures: Position[]; // Special collectibles
  friends: Position[]; // Characters to rescue
  exit: Position;
  exitLocked?: boolean; // Exit requires completing objectives first
  enemies: Array<{
    type: 'slime' | 'goblin' | 'boss';
    position: Position;
    pieceType?: PieceType; // What piece type this enemy represents
    health?: number; // For bosses
    name?: string; // For boss characters
  }>;
  dangerSquares: Array<{
    position: Position;
    coverageType: PieceType; // What piece creates this danger
    sourcePosition?: Position; // Where the danger originates from
  }>;
  timeLimit?: number; // For timed challenges
  minMoves?: number; // Minimum moves required
  maxMoves?: number; // Maximum moves allowed
  tutorialText?: string; // Special instructions for tutorial levels
  characterIntro?: {
    piece: PieceType;
    name: string;
    greeting: string;
    ability: string;
  };
}

export type GameState = 'playing' | 'won' | 'lost' | 'menu';

export interface GameStore {
  currentLevel: number;
  gameState: GameState;
  board: Entity[];
  boardSize: { width: number; height: number };
  playerPosition: Position;
  playerPieceType: PieceType;
  coinsCollected: number;
  totalCoins: number;
  
  // Actions
  initializeLevel: (levelIndex: number) => void;
  movePlayer: (newPosition: Position) => boolean;
  resetLevel: () => void;
  nextLevel: () => void;
  setGameState: (state: GameState) => void;
}

export interface MoveRule {
  dx: number;
  dy: number;
  canCapture?: boolean;
  firstMoveOnly?: boolean;
}
