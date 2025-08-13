import { useGameStore } from './hooks/useGameStore';
import MainMenu from './components/MainMenu';
import GameUI from './components/GameUI';
import GameBoard from './components/GameBoard';
import GameModal from './components/GameModal';
import './App.css';

function App() {
  const { gameState } = useGameStore();

  return (
    <div className="app">
      {gameState === 'menu' ? (
        <MainMenu />
      ) : (
        <div className="game-view">
          <GameUI />
          <GameBoard />
        </div>
      )}
      <GameModal />
    </div>
  );
}

export default App;
