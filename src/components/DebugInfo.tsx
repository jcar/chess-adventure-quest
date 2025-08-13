import React from 'react';
import { useGameStore } from '../hooks/useGameStore';
import { getValidMoves } from '../game/movement';

const DebugInfo: React.FC = () => {
  const {
    gameState,
    playerPosition,
    playerPieceType,
    boardSize,
    board
  } = useGameStore();

  if (gameState !== 'playing') {
    return null;
  }

  const getEntityAt = (pos: { x: number; y: number }) => {
    return board.find(entity => 
      entity.position.x === pos.x && entity.position.y === pos.y
    ) || null;
  };

  const hasEnemyAtPosition = (pos: { x: number; y: number }): boolean => {
    const entity = getEntityAt(pos);
    return entity !== null && (entity.type === 'slime' || entity.type === 'goblin');
  };

  const validMoves = getValidMoves(
    playerPosition,
    playerPieceType,
    boardSize,
    hasEnemyAtPosition
  );

  const totalCells = boardSize.width * boardSize.height;

  return (
    <div style={{ 
      position: 'fixed', 
      top: 10, 
      left: 10, 
      background: 'white', 
      border: '1px solid black', 
      padding: '10px',
      fontSize: '12px',
      zIndex: 1000
    }}>
      <div><strong>Debug Info:</strong></div>
      <div>Game State: {gameState}</div>
      <div>Player Position: ({playerPosition.x}, {playerPosition.y})</div>
      <div>Player Piece: {playerPieceType}</div>
      <div>Board Size: {boardSize.width}x{boardSize.height}</div>
      <div>Total Cells Expected: {totalCells}</div>
      <div>Board Entities: {board.length}</div>
      <div>Valid Moves: {validMoves.length}</div>
      {validMoves.length > 0 && (
        <div>
          Valid Positions: {validMoves.map(m => `(${m.x},${m.y})`).join(', ')}
        </div>
      )}
      <div style={{ marginTop: '10px' }}>
        <strong>Board Entities:</strong>
        {board.map(entity => (
          <div key={entity.id} style={{ fontSize: '10px' }}>
            {entity.type} at ({entity.position.x},{entity.position.y})
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebugInfo;
