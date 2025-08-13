import React from 'react';
import { useGameStore } from '../hooks/useGameStore';
import { getTotalLevels } from '../levels/levelData';
import './MainMenu.css';

const MainMenu: React.FC = () => {
  const { initializeLevel } = useGameStore();

  const handleStartLevel = (levelIndex: number) => {
    initializeLevel(levelIndex);
  };

  const levelButtons = [];
  for (let i = 0; i < getTotalLevels(); i++) {
    levelButtons.push(
      <button
        key={i}
        onClick={() => handleStartLevel(i)}
        className="level-button"
      >
        Level {i + 1}
      </button>
    );
  }

  return (
    <div className="main-menu">
      <h1>Chess Adventure Quest</h1>
      <p className="subtitle">
        Learn chess piece movements while collecting coins and avoiding enemies!
      </p>
      
      <div className="level-selection">
        <h2>Choose Your Adventure</h2>
        <div className="level-grid">
          {levelButtons}
        </div>
      </div>

      <div className="instructions">
        <h3>How to Play</h3>
        <ul>
          <li>🏰 Move your chess piece using click/tap or arrow keys</li>
          <li>🪙 Collect all coins to unlock the exit</li>
          <li>🏃 Reach the exit to complete the level</li>
          <li>⚔️ Avoid or defeat enemies (slimes and goblins)</li>
          <li>🧠 Each piece has unique movement rules!</li>
        </ul>
      </div>
    </div>
  );
};

export default MainMenu;
