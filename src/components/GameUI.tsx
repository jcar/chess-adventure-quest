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

  const getCharacterInfo = (pieceType: string) => {
    if (pieceType === 'knight') {
      return {
        icon: '♘',
        name: 'Sir Hopscotch',
        description: '🐴 "I jump in L-shapes to hop over obstacles! Follow my hoofsteps!"',
        power: 'L-shaped Leap Power'
      };
    } else {
      return {
        icon: '♙',
        name: 'Pawny the Brave',
        description: '⚡ "I march forward bravely and can capture enemies diagonally!"',
        power: 'Forward March & Diagonal Strike'
      };
    }
  };

  const getWorldTheme = (levelIndex: number): string => {
    const worlds = ['🌻 Sunny Meadows', '🌈 Rainbow Valley', '🌲 Giggle Forest', '💎 Crystal Caves', '🏔️ Dragon\'s Lair'];
    return worlds[levelIndex] || '✨ Magical Realm';
  };

  const character = getCharacterInfo(playerPieceType);
  const worldTheme = getWorldTheme(currentLevel);

  return (
    <div className="game-ui">
      <div className="adventure-header">
        <div className="world-info">
          <h2 className="adventure-title">🌍 {worldTheme}</h2>
          <h3 className="quest-name">{level.name}</h3>
          <p className="quest-description">{level.description}</p>
        </div>
        
        <div className="hero-info">
          <div className="character-card">
            <span className="character-icon">{character.icon}</span>
            <div className="character-details">
              <h4 className="character-name">{character.name}</h4>
              <p className="character-power">✨ {character.power}</p>
            </div>
          </div>
          
          <div className="quest-objective">
            <span className="objective-emoji">🏁</span>
            <span className="objective-text">Find the Magic Door!</span>
          </div>
        </div>
      </div>

      {gameState === 'playing' && (
        <div className="character-guidance">
          <div className="speech-bubble">
            <p className="character-speech">
              {character.description}
            </p>
          </div>
          <p className="helpful-hint">
            ✨ Tap the sparkling squares to move, brave hero! ✨
          </p>
        </div>
      )}

      <div className="adventure-controls">
        <button onClick={resetLevel} className="magic-button secondary">
          🔄 Restart Quest
        </button>
        <button onClick={handleBackToMenu} className="magic-button castle">
          🏰 Return to Castle
        </button>
      </div>
    </div>
  );
};

export default GameUI;
