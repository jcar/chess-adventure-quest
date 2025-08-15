import React from 'react';
import { useGameStore } from '../hooks/useGameStore';
import { getTotalLevels } from '../data/curriculum';
import { getRandomVictoryQuote, getRandomEncouragement } from '../data/characters';
import './GameModal.css';

const GameModal: React.FC = () => {
  const {
    gameState,
    currentLevel,
    playerPieceType,
    resetLevel,
    nextLevel,
    setGameState
  } = useGameStore();

  // Use the comprehensive character system for messages
  const getVictoryMessage = (): string => {
    return getRandomVictoryQuote(playerPieceType);
  };

  const getEncouragementTip = (): string => {
    return getRandomEncouragement(playerPieceType);
  };

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
              <div className="modal-icon celebration">✨🎉✨</div>
              <h2 className="modal-title">🏆 Quest Complete! 🏆</h2>
              <p className="modal-message victory-message">
                🌟 Amazing job, brave hero! You're becoming a true Chess Master! 🌟
              </p>
              <div className="victory-details">
                <p className="hero-praise">
                  {getVictoryMessage()}
                </p>
              </div>
              {isLastLevel && (
                <div className="final-victory">
                  <div className="crown-animation">👑</div>
                  <p className="final-congratulations">
                    🎊 INCREDIBLE! You are now a Chess Adventure Master! 🎊<br/>
                    🦸‍♀️ You've saved all the chess lands and become a legend! 🦸‍♂️
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="modal-icon">🤗</div>
              <h2 className="modal-title">Keep Trying, Hero!</h2>
              <p className="modal-message encouraging-message">
                🌈 Every great hero faces challenges! You're learning and getting stronger! 🌈<br/>
                💪 Try a different path - I believe in you! 💪
              </p>
              <div className="encouragement-tip">
                <p>💡 {getEncouragementTip()}</p>
              </div>
            </>
          )}
        </div>

        <div className="modal-actions">
          {isWon ? (
            <>
              {!isLastLevel && (
                <button onClick={handleNextLevel} className="primary adventure-button">
                  🗡️ Next Adventure!
                </button>
              )}
              {isLastLevel && (
                <button onClick={handleMainMenu} className="primary adventure-button">
                  🏰 Return to Castle
                </button>
              )}
              <button onClick={handleRetry} className="secondary adventure-button">
                ⭐ Replay Quest
              </button>
            </>
          ) : (
            <>
              <button onClick={handleRetry} className="primary adventure-button">
                🌟 Try Again, Hero!
              </button>
              <button onClick={handleMainMenu} className="secondary adventure-button">
                🏰 Return to Castle
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameModal;
