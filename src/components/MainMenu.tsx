import React from 'react';
import { useGameStore } from '../hooks/useGameStore';
import { getTotalLevels } from '../levels/levelData';
import './MainMenu.css';

const MainMenu: React.FC = () => {
  const { initializeLevel } = useGameStore();

  const handleStartLevel = (levelIndex: number) => {
    initializeLevel(levelIndex);
  };

  // Adventure-themed world names and descriptions
  const adventures = [
    { 
      name: "🌟 Knight's First Quest", 
      description: "Meet Sir Hopscotch and learn to jump like a brave knight!",
      emoji: "♘",
      world: "Sunny Meadows"
    },
    { 
      name: "⚡ Pawn's Big Adventure", 
      description: "Join Pawny the Brave and learn to march forward!",
      emoji: "♙", 
      world: "Rainbow Valley"
    },
    { 
      name: "🗡️ Knight vs. Silly Slimes", 
      description: "Help Sir Hopscotch outsmart the giggly green slimes!",
      emoji: "♘",
      world: "Giggle Forest"
    },
    { 
      name: "🏆 Pawn's Heroic Journey", 
      description: "Guide Pawny through the maze to rescue friends!",
      emoji: "♙",
      world: "Crystal Caves"
    },
    { 
      name: "👑 Chess Master Challenge", 
      description: "The ultimate quest! Can you become a Chess Hero?",
      emoji: "🏰",
      world: "Dragon's Lair"
    }
  ];

  const levelButtons = [];
  for (let i = 0; i < Math.min(getTotalLevels(), adventures.length); i++) {
    const adventure = adventures[i];
    levelButtons.push(
      <div key={i} className="adventure-card">
        <div className="world-badge">{adventure.world}</div>
        <button
          onClick={() => handleStartLevel(i)}
          className="adventure-button"
        >
          <div className="adventure-emoji">{adventure.emoji}</div>
          <h3>{adventure.name}</h3>
          <p>{adventure.description}</p>
        </button>
      </div>
    );
  }

  return (
    <div className="main-menu">
      <div className="hero-section">
        <h1 className="game-title">
          🏰 Chess Adventure Quest 🗡️
        </h1>
        <p className="hero-subtitle">
          🌟 Become a Chess Hero! Go on magical adventures and make friends with brave chess pieces! 🌟
        </p>
        <div className="hero-character">
          <span className="hero-emoji">🧙‍♂️</span>
          <p className="hero-message">"Welcome, young adventurer! Are you ready to learn the ancient magic of chess?"</p>
        </div>
      </div>
      
      <div className="level-selection">
        <h2>🗺️ Choose Your Next Adventure!</h2>
        <div className="adventure-grid">
          {levelButtons}
        </div>
      </div>

      <div className="how-to-play">
        <h3>🎮 How to Be a Chess Hero</h3>
        <div className="instruction-cards">
          <div className="instruction-card">
            <span className="instruction-emoji">✨</span>
            <p><strong>Click to Move!</strong><br/>Tap the glowing squares to move your hero!</p>
          </div>
          <div className="instruction-card">
            <span className="instruction-emoji">🚪</span>
            <p><strong>Find the Exit!</strong><br/>Reach the magical door to complete your quest!</p>
          </div>
          <div className="instruction-card">
            <span className="instruction-emoji">👾</span>
            <p><strong>Outsmart Enemies!</strong><br/>Avoid silly monsters or capture them like a hero!</p>
          </div>
          <div className="instruction-card">
            <span className="instruction-emoji">🏆</span>
            <p><strong>Collect Treasures!</strong><br/>Gather coins and rescue friends on your journey!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
