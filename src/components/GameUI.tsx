import React from 'react';
import { useGameStore } from '../hooks/useGameStore';
import { getLevel } from '../levels/levelData';
import './GameUI.css';

const GameUI: React.FC = () => {
  const {
    currentLevel,
    playerPieceType,
    gameState,
    resetLevel,
    setGameState
  } = useGameStore();

  const level = getLevel(currentLevel);
  
  if (!level) {
    return null;
  }

  const handleBackToMenu = () => {
    setGameState('menu');
  };

  const getPieceIcon = (pieceType: string): string => {
    return pieceType === 'knight' ? '♘' : '♙';
  };

  const getPieceDescription = (pieceType: string): string => {
    if (pieceType === 'knight') {
      return 'Knight moves in an L-shape: 2 squares in one direction, then 1 square perpendicular.';
    } else {
      return 'Pawn moves forward 1 square, or diagonally forward to capture enemies.';
    }
  };

  return (
    <div className="game-ui">
      <div className="game-header">
        <div className="level-info">
          <h2>{level.name}</h2>
          <p className="level-description">{level.description}</p>
        </div>
        
        <div className="game-stats">
          <div className="piece-info">
            <span className="piece-icon">{getPieceIcon(playerPieceType)}</span>
            <span className="piece-name">{playerPieceType.toUpperCase()}</span>
          </div>
          
          <div className="objective-info">
            <span className="objective-emoji">🚪</span>
            <span className="objective-text">Reach the Exit!</span>
          </div>
        </div>
      </div>

      {gameState === 'playing' && (
        <div className="movement-hint">
          <p className="hint-text">
            <strong>How your {playerPieceType} moves:</strong><br />
            {getPieceDescription(playerPieceType)}
          </p>
          <p className="controls-hint">
            💡 Click on highlighted squares or use arrow keys to move!
          </p>
        </div>
      )}

      <div className="game-controls">
        <button onClick={resetLevel} className="secondary">
          🔄 Restart Level
        </button>
        <button onClick={handleBackToMenu} className="warning">
          🏠 Main Menu
        </button>
      </div>
    </div>
  );
};

export default GameUI;
