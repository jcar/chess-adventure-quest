import React, { useEffect, useCallback } from 'react';
import { useGameStore } from '../hooks/useGameStore';
import { getValidMoves } from '../game/movement';
import type { Position } from '../types/game';
import { isArrowKey, getPositionFromArrowKey } from '../utils/keyboard';
import BoardCell from './BoardCell';
import './GameBoard.css';

const GameBoard: React.FC = () => {
  const {
    board,
    boardSize,
    playerPosition,
    playerPieceType,
    gameState,
    movePlayer
  } = useGameStore();
  
  // Don't render if board is not initialized
  if (!board || board.length === 0 || !boardSize || !playerPosition) {
    return <div className="game-board-container">Loading...</div>;
  }

  const getEntityAt = useCallback((pos: Position) => {
    return board.find(entity => 
      entity.position.x === pos.x && entity.position.y === pos.y
    ) || null;
  }, [board]);

  const hasEnemyAtPosition = useCallback((pos: Position): boolean => {
    const entity = getEntityAt(pos);
    return entity !== null && entity.type === 'slime';
  }, [getEntityAt]);

  const validMoves = getValidMoves(
    playerPosition,
    playerPieceType,
    boardSize,
    hasEnemyAtPosition
  );

  const handleCellClick = (position: Position) => {
    if (gameState !== 'playing') return;
    
    // Check if this is a valid move
    const isValidMove = validMoves.some(move => 
      move.x === position.x && move.y === position.y
    );
    
    if (isValidMove) {
      movePlayer(position);
    }
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState !== 'playing') return;
    
    if (isArrowKey(event.key)) {
      event.preventDefault();
      const newPosition = getPositionFromArrowKey(playerPosition, event.key);
      
      if (newPosition) {
        // Check if this is a valid move
        const isValidMove = validMoves.some(move => 
          move.x === newPosition.x && move.y === newPosition.y
        );
        
        if (isValidMove) {
          movePlayer(newPosition);
        }
      }
    }
  }, [gameState, playerPosition, validMoves, movePlayer]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const isValidMovePosition = (pos: Position): boolean => {
    return validMoves.some(move => move.x === pos.x && move.y === pos.y);
  };

  // Create grid cells
  const cells = [];
  for (let y = 0; y < boardSize.height; y++) {
    for (let x = 0; x < boardSize.width; x++) {
      const position = { x, y };
      const entity = getEntityAt(position);
      const isPlayerPosition = playerPosition.x === x && playerPosition.y === y;
      const isValidMove = isValidMovePosition(position);
      
      cells.push(
        <BoardCell
          key={`${x}-${y}`}
          position={position}
          entity={entity}
          isPlayerPosition={isPlayerPosition}
          isValidMove={isValidMove}
          onClick={handleCellClick}
        />
      );
    }
  }

  return (
    <div className="game-board-container">
      <div 
        className="game-board"
        style={{
          gridTemplateColumns: `repeat(${boardSize.width}, 1fr)`,
          gridTemplateRows: `repeat(${boardSize.height}, 1fr)`
        }}
      >
        {cells}
      </div>
    </div>
  );
};

export default GameBoard;
