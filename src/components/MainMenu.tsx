import React from 'react';
import { useGameStore } from '../hooks/useGameStore';
import { getTotalLevels } from '../data/curriculum';
import { WORLDS } from '../data/worlds';
import './MainMenu.css';

const MainMenu: React.FC = () => {
  const { initializeLevel, gameState } = useGameStore();

  const handleStartLevel = (levelIndex: number) => {
    console.log(`Starting level ${levelIndex}`);
    console.log('Current gameState before:', gameState);
    try {
      initializeLevel(levelIndex);
      console.log('initializeLevel called successfully');
    } catch (error) {
      console.error('Error starting level:', error);
    }
  };

  // Display available worlds from the curriculum
  const worldCards = [];
  let currentLevelIndex = 0;
  
  for (let i = 0; i < WORLDS.length; i++) {
    const world = WORLDS[i];
    const isUnlocked = world.unlocked || i === 0; // First world (index 0) is always unlocked
    const worldProgress = `${world.levelsCompleted}/${world.totalLevels}`;
    const worldStartLevelIndex = currentLevelIndex; // Store the starting level index for this world
    
    console.log(`World ${i}: ${world.name}, unlocked: ${isUnlocked}, levelIndex: ${worldStartLevelIndex}`);
    
    worldCards.push(
      <div key={world.id} className={`world-card ${!isUnlocked ? 'locked' : ''}`}>
        <div className="world-header">
          <div className="world-emoji">{world.emoji}</div>
          <div className="world-progress">{worldProgress}</div>
        </div>
        <button
          onClick={() => isUnlocked ? handleStartLevel(worldStartLevelIndex) : null}
          className={`world-button ${!isUnlocked ? 'disabled' : ''}`}
          disabled={!isUnlocked}
        >
          <h3>{world.name}</h3>
          <p>{world.description}</p>
          {!isUnlocked && (
            <div className="lock-overlay">
              <span className="lock-icon">🔒</span>
              <p>Complete previous world to unlock!</p>
            </div>
          )}
        </button>
        
        {isUnlocked && (
          <div className="level-preview">
            <p className="level-count">{world.totalLevels} levels of adventure!</p>
            {worldStartLevelIndex < getTotalLevels() && (
              <button 
                onClick={() => handleStartLevel(worldStartLevelIndex)}
                className="start-world-button"
              >
                ✨ Start Adventure
              </button>
            )}
          </div>
        )}
      </div>
    );
    
    currentLevelIndex += world.totalLevels;
  }

  
  // Debug info
  console.log('All WORLDS:', WORLDS);
  console.log('First world unlocked?', WORLDS[0].unlocked);
  console.log('Total levels:', getTotalLevels());
  
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
      
      <div className="world-selection">
        <h2>🗺️ Choose Your World Adventure!</h2>
        <div className="curriculum-progress">
          <p>🎆 Epic Journey: {getTotalLevels()} levels across {WORLDS.length} magical worlds! 🎆</p>
        </div>
        <div className="world-grid">
          {worldCards}
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
