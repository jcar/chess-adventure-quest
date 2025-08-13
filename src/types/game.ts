export type PieceType = 'knight' | 'pawn';

export type EntityType = 'player' | 'coin' | 'exit' | 'slime' | 'goblin';

export interface Position {
  x: number;
  y: number;
}

export interface Entity {
  id: string;
  type: EntityType;
  position: Position;
  pieceType?: PieceType; // Only for player entities
}

export interface Level {
  id: string;
  name: string;
  description: string;
  boardSize: { width: number; height: number };
  player: {
    position: Position;
    pieceType: PieceType;
  };
  coins: Position[];
  exit: Position;
  enemies: Array<{
    type: 'slime' | 'goblin';
    position: Position;
  }>;
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
