import React from 'react';
import { useGameStore } from '../hooks/useGameStore';
import { getLevel } from '../data/curriculum';
import { getCharacter } from '../data/characters';
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

  // Use the comprehensive character system
  const character = getCharacter(playerPieceType);
  
  // Get world theme from level data
  const getWorldTheme = (): string => {
    if (!level) return '✨ Magical Realm';
    
    switch (level.worldId) {
      case 'meadow-tutorial': return '🌻 Sunny Meadows';
      case 'goblin-woods': return '🌲 Goblin Woods';
      case 'glow-caves': return '💎 Glow Caves';
      case 'royal-keep': return '🏰 Royal Keep';
      case 'tactic-town': return '⚔️ Tactic Town';
      case 'endgame-arena': return '🏆 Endgame Arena';
      case 'castle-siege': return '⚔️ Castle Siege';
      default: return '✨ Magical Realm';
    }
  };

  const worldTheme = getWorldTheme();

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
            <span className="character-icon">{character.emoji}</span>
            <div className="character-details">
              <h4 className="character-name">{character.name}</h4>
              <p className="character-power">✨ {character.ability}</p>
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
              {character.greeting}
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
