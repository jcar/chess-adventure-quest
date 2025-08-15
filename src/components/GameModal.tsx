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

  const getVictoryMessage = (level: number): string => {
    const messages = [
      "🐴 Sir Hopscotch is so proud! You mastered the Knight's L-shaped leap!",
      "⚡ Pawny the Brave cheers for you! You learned to march like a true warrior!",
      "🎭 The Silly Slimes are impressed by your clever moves!",
      "🏔️ You navigated the Crystal Caves like a true adventurer!",
      "🐉 Even the Dragon bows to your incredible chess mastery!"
    ];
    return messages[level] || "🌟 You're an amazing Chess Hero! 🌟";
  };

  const getEncouragementTip = (level: number): string => {
    const tips = [
      "Remember: Knights jump in an L-shape - 2 squares, then 1 square to the side!",
      "Tip: Pawns can capture diagonally - use this power to defeat enemies!",
      "Strategy: Think about which slimes to avoid and which ones to capture!",
      "Hint: Plan your path carefully - sometimes the longest route is the safest!",
      "Remember: Great heroes use all their chess powers together!"
    ];
    return tips[level] || "Every chess master started as a beginner - you've got this!";
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
                  {getVictoryMessage(currentLevel)}
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
                <p>💡 {getEncouragementTip(currentLevel)}</p>
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
