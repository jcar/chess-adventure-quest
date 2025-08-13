import React from 'react';
import { useGameStore } from '../hooks/useGameStore';
import { getTotalLevels } from '../levels/levelData';
import './GameModal.css';

const GameModal: React.FC = () => {
  const {
    gameState,
    currentLevel,
    resetLevel,
    nextLevel,
    setGameState
  } = useGameStore();

  if (gameState !== 'won' && gameState !== 'lost') {
    return null;
  }

  const isWon = gameState === 'won';
  const isLastLevel = currentLevel >= getTotalLevels() - 1;

  const handleNextLevel = () => {
    if (isLastLevel) {
      setGameState('menu');
    } else {
      nextLevel();
    }
  };

  const handleRetry = () => {
    resetLevel();
  };

  const handleMainMenu = () => {
    setGameState('menu');
  };

  return (
    <div className="modal-overlay">
      <div className={`game-modal ${isWon ? 'victory' : 'defeat'}`}>
        <div className="modal-content">
          {isWon ? (
            <>
              <div className="modal-icon">🎉</div>
              <h2 className="modal-title">Level Complete!</h2>
              <p className="modal-message">
                Excellent work! You've mastered this chess challenge.
              </p>
              {isLastLevel && (
                <p className="congratulations">
                  🏆 Congratulations! You've completed all levels in Chess Adventure Quest! 🏆
                </p>
              )}
            </>
          ) : (
            <>
              <div className="modal-icon">💥</div>
              <h2 className="modal-title">Oops!</h2>
              <p className="modal-message">
                Don't worry! Learning chess takes practice. Try again!
              </p>
            </>
          )}
        </div>

        <div className="modal-actions">
          {isWon ? (
            <>
              {!isLastLevel && (
                <button onClick={handleNextLevel} className="primary">
                  ➡️ Next Level
                </button>
              )}
              {isLastLevel && (
                <button onClick={handleMainMenu} className="primary">
                  🏠 Back to Menu
                </button>
              )}
              <button onClick={handleRetry} className="secondary">
                🔄 Play Again
              </button>
            </>
          ) : (
            <>
              <button onClick={handleRetry} className="primary">
                🔄 Try Again
              </button>
              <button onClick={handleMainMenu} className="secondary">
                🏠 Main Menu
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameModal;
