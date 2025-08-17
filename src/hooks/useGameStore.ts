import { create } from 'zustand';
import type { GameStore, Entity, Position, GameState } from '../types/game';
import { getLevel, getTotalLevels } from '../data/curriculum';
import { calculateEnemyMoves, checkPlayerCaptured } from '../game/enemyAI';
import { isValidMove } from '../game/movement';

export const useGameStore = create<GameStore>((set, get) => ({
  currentLevel: 0,
  gameState: 'menu' as GameState,
  board: [],
  boardSize: { width: 4, height: 4 },
  playerPosition: { x: 0, y: 0 },
  playerPieceType: 'knight',
  coinsCollected: 0,
  totalCoins: 0,

  initializeLevel: (levelIndex: number) => {
    try {
      console.log(`Initializing level ${levelIndex}...`);
      const level = getLevel(levelIndex);
      if (!level) {
        console.error(`Level ${levelIndex} not found`);
        return;
      }
      
      console.log(`Found level:`, level);

    const board: Entity[] = [];
    
    // Add player
    board.push({
      id: 'player',
      type: 'player',
      position: { ...level.player.position },
      pieceType: level.player.pieceType
    });

    // Add coins (legacy support)
    level.coins?.forEach((coinPos, index) => {
      board.push({
        id: `coin-${index}`,
        type: 'coin',
        position: { ...coinPos }
      });
    });
    
    // Add treasures (new system)
    level.treasures?.forEach((treasurePos, index) => {
      board.push({
        id: `treasure-${index}`,
        type: 'treasure',
        position: { ...treasurePos }
      });
    });
    
    // Add friends (new system)
    level.friends?.forEach((friendPos, index) => {
      board.push({
        id: `friend-${index}`,
        type: 'friend',
        position: { ...friendPos }
      });
    });

    // Add exit
    board.push({
      id: 'exit',
      type: 'exit',
      position: { ...level.exit }
    });

    // Add enemies - handle both old and new enemy structure
    level.enemies?.forEach((enemy, index) => {
      board.push({
        id: `${enemy.type}-${index}`,
        type: enemy.type as 'slime' | 'goblin',
        position: { ...enemy.position }
      });
    });

    const totalCollectibles = (level.coins?.length || 0) + (level.treasures?.length || 0);
    
    console.log(`Board initialized with ${board.length} entities`);

    set({
      currentLevel: levelIndex,
      board,
      boardSize: { ...level.boardSize },
      playerPosition: { ...level.player.position },
      playerPieceType: level.player.pieceType,
      coinsCollected: 0,
      totalCoins: totalCollectibles,
      gameState: 'playing'
    });
    
    console.log(`Game state set to 'playing'`);
    } catch (error) {
      console.error('Error in initializeLevel:', error);
      throw error;
    }
  },

  movePlayer: (newPosition: Position): boolean => {
    const state = get();
    if (state.gameState !== 'playing') return false;

    const getEntityAt = (pos: Position): Entity | null => {
      return state.board.find(entity => 
        entity.position.x === pos.x && entity.position.y === pos.y
      ) || null;
    };

    const hasEnemyAtPosition = (pos: Position): boolean => {
      const entity = getEntityAt(pos);
      return entity !== null && entity.type === 'slime';
    };

    // Validate the move
    if (!isValidMove(
      state.playerPosition,
      newPosition,
      state.playerPieceType,
      state.boardSize,
      hasEnemyAtPosition
    )) {
      return false;
    }

    // Create new board state
    let newBoard = [...state.board];
    let newCoinsCollected = state.coinsCollected;

    // Update player position
    const playerEntity = newBoard.find(e => e.id === 'player')!;
    playerEntity.position = { ...newPosition };

    // Check for collectible collection (coins, treasures, friends)
    const collectibleAtPosition = newBoard.find(entity => 
      (entity.type === 'coin' || entity.type === 'treasure' || entity.type === 'friend') && 
      entity.position.x === newPosition.x && 
      entity.position.y === newPosition.y
    );
    
    if (collectibleAtPosition) {
      newBoard = newBoard.filter(entity => entity.id !== collectibleAtPosition.id);
      newCoinsCollected++;
      console.log(`Collected ${collectibleAtPosition.type} at (${newPosition.x}, ${newPosition.y})`);
    }

    // Check for enemy capture (if player moved to enemy position)
    const enemyAtPosition = newBoard.find(entity => 
      entity.type === 'slime' &&
      entity.position.x === newPosition.x && 
      entity.position.y === newPosition.y
    );
    
    if (enemyAtPosition) {
      newBoard = newBoard.filter(entity => entity.id !== enemyAtPosition.id);
    }

    // Move enemies
    const enemies = newBoard.filter(entity => entity.type === 'slime');
    const enemyMoves = calculateEnemyMoves(
      enemies,
      newPosition,
      state.boardSize,
      (pos: Position) => newBoard.find(entity => 
        entity.position.x === pos.x && entity.position.y === pos.y
      ) || null
    );

    // Update enemy positions
    enemyMoves.forEach((newPos, enemyId) => {
      const enemy = newBoard.find(e => e.id === enemyId);
      if (enemy) {
        enemy.position = { ...newPos };
      }
    });

    // Check if player was captured after enemy moves
    const playerCaptured = checkPlayerCaptured(
      newPosition,
      newBoard.filter(entity => entity.type === 'slime')
    );

    // Check win condition (just reach the exit)
    const atExit = newBoard.some(entity => 
      entity.type === 'exit' && 
      entity.position.x === newPosition.x && 
      entity.position.y === newPosition.y
    );
    
    const hasWon = atExit;

    // Update state
    set({
      board: newBoard,
      playerPosition: { ...newPosition },
      coinsCollected: newCoinsCollected,
      gameState: playerCaptured ? 'lost' : (hasWon ? 'won' : 'playing')
    });

    return true;
  },

  resetLevel: () => {
    const { currentLevel } = get();
    get().initializeLevel(currentLevel);
  },

  nextLevel: () => {
    const state = get();
    const nextLevelIndex = state.currentLevel + 1;
    
    if (nextLevelIndex < getTotalLevels()) {
      get().initializeLevel(nextLevelIndex);
    } else {
      // All levels completed
      set({ gameState: 'menu' });
    }
  },

  setGameState: (gameState: GameState) => {
    set({ gameState });
  }
}));
