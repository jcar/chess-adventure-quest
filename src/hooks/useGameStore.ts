import { create } from 'zustand';
import type { GameStore, Entity, Position, GameState } from '../types/game';
import { getLevel, getTotalLevels } from '../levels/levelData';
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
    const level = getLevel(levelIndex);
    if (!level) {
      console.error(`Level ${levelIndex} not found`);
      return;
    }

    const board: Entity[] = [];
    
    // Add player
    board.push({
      id: 'player',
      type: 'player',
      position: { ...level.player.position },
      pieceType: level.player.pieceType
    });

    // Add coins
    level.coins.forEach((coinPos, index) => {
      board.push({
        id: `coin-${index}`,
        type: 'coin',
        position: { ...coinPos }
      });
    });

    // Add exit
    board.push({
      id: 'exit',
      type: 'exit',
      position: { ...level.exit }
    });

    // Add enemies
    level.enemies.forEach((enemy, index) => {
      board.push({
        id: `${enemy.type}-${index}`,
        type: enemy.type as 'slime' | 'goblin',
        position: { ...enemy.position }
      });
    });

    set({
      currentLevel: levelIndex,
      board,
      boardSize: { ...level.boardSize },
      playerPosition: { ...level.player.position },
      playerPieceType: level.player.pieceType,
      coinsCollected: 0,
      totalCoins: level.coins.length,
      gameState: 'playing'
    });
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
      return entity !== null && (entity.type === 'slime' || entity.type === 'goblin');
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

    // Check for coin collection
    const coinAtPosition = newBoard.find(entity => 
      entity.type === 'coin' && 
      entity.position.x === newPosition.x && 
      entity.position.y === newPosition.y
    );
    
    if (coinAtPosition) {
      newBoard = newBoard.filter(entity => entity.id !== coinAtPosition.id);
      newCoinsCollected++;
    }

    // Check for enemy capture (if player moved to enemy position)
    const enemyAtPosition = newBoard.find(entity => 
      (entity.type === 'slime' || entity.type === 'goblin') &&
      entity.position.x === newPosition.x && 
      entity.position.y === newPosition.y
    );
    
    if (enemyAtPosition) {
      newBoard = newBoard.filter(entity => entity.id !== enemyAtPosition.id);
    }

    // Move enemies
    const enemies = newBoard.filter(entity => entity.type === 'slime' || entity.type === 'goblin');
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
      newBoard.filter(entity => entity.type === 'slime' || entity.type === 'goblin')
    );

    // Check win condition (all coins collected and at exit)
    const atExit = newBoard.some(entity => 
      entity.type === 'exit' && 
      entity.position.x === newPosition.x && 
      entity.position.y === newPosition.y
    );
    
    const allCoinsCollected = newCoinsCollected === state.totalCoins;
    const hasWon = atExit && allCoinsCollected;

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
