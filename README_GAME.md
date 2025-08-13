# Chess Adventure Quest 🏰♞

## 🎮 [**PLAY NOW - Live Demo**](https://jcar.github.io/chess-adventure-quest/)

A kid-friendly browser-based chess learning game built with React, TypeScript, and Vite. Players control individual chess pieces (Knight and Pawn) on small boards, navigating obstacles to reach the exit while learning how each piece moves!

## 🎮 Game Features

- **Educational**: Learn chess piece movements through interactive gameplay
- **Kid-Friendly**: Colorful UI with emojis, animations, and simple controls
- **Progressive Difficulty**: Start with tutorials and advance through challenging levels
- **Multiple Pieces**: Master both Knight (L-shaped moves) and Pawn (forward + diagonal capture) movement patterns
- **Enemy AI**: Navigate around Slimes (stationary obstacles)
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16+ recommended)
- npm or yarn

### Installation & Setup

1. **Clone or navigate to the project directory**:
   ```bash
   cd chess-adventure-quest
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit the URL shown in the terminal (usually `http://localhost:5173`)

### Other Available Scripts

- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test` - Run unit tests
- `npm run lint` - Lint the codebase

## 🎯 How to Play

### Basic Controls
- **Mouse/Touch**: Click on highlighted squares to move your piece
- **Keyboard**: Use arrow keys to move (if it's a valid move for your piece)

### Game Objectives
1. **Reach the exit** (🚪) to complete the level
2. **Navigate around or capture enemies**:
   - **Slimes** (🟢): Stationary obstacles that can be captured or avoided

### Piece Movement Rules
- **Knight** (♘): Moves in an L-shape (2 squares in one direction, then 1 square perpendicular)
- **Pawn** (♙): Moves forward 1 square, or captures diagonally forward

### Levels
- **Level 1**: Knight Tutorial - Learn basic L-shaped movement
- **Level 2**: Pawn Tutorial - Learn forward movement and diagonal capture  
- **Level 3+**: Progressive challenges with enemies and strategic obstacles

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── MainMenu.tsx    # Level selection and instructions
│   ├── GameBoard.tsx   # Main game board with grid
│   ├── BoardCell.tsx   # Individual board squares
│   ├── GameUI.tsx      # Game info and controls
│   └── GameModal.tsx   # Win/lose modal dialogs
├── game/               # Game logic modules
│   ├── movement.ts     # Chess piece movement rules
│   └── enemyAI.ts      # Enemy behavior logic
├── hooks/              # React hooks
│   └── useGameStore.ts # Zustand game state management
├── levels/             # Level data and validation
│   └── levelData.ts    # JSON-like level definitions
├── types/              # TypeScript type definitions
│   └── game.ts         # Core game types
├── utils/              # Utility functions
│   └── keyboard.ts     # Keyboard input handling
└── test/               # Test configuration
    └── setup.ts        # Vitest setup
```

## 🧪 Testing

The project includes comprehensive unit tests for core game logic:

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

Tests cover:
- Chess piece movement validation
- Enemy AI behavior
- Game state management
- Level validation

## 🎨 Adding New Content

### Adding New Levels

Levels are defined in `src/levels/levelData.ts`. Each level requires:

```typescript
{
  id: 'unique-id',
  name: 'Display Name',
  description: 'Brief description for players',
  boardSize: { width: 4, height: 4 },
  player: {
    position: { x: 0, y: 3 },
    pieceType: 'knight' // or 'pawn'
  },
  coins: [{ x: 2, y: 1 }], // Array of coin positions
  exit: { x: 3, y: 0 },
  enemies: [
    { type: 'slime', position: { x: 1, y: 2 } },
    { type: 'slime', position: { x: 2, y: 3 } }
  ]
}
```

### Adding New Chess Pieces

1. Update the `PieceType` in `src/types/game.ts`
2. Add movement rules in `src/game/movement.ts`
3. Update the UI components to display the new piece
4. Add tests for the new movement logic

### Adding New Enemy Types

1. Update `EntityType` in `src/types/game.ts`
2. Implement AI logic in `src/game/enemyAI.ts`
3. Update rendering in `src/components/BoardCell.tsx`
4. Add corresponding tests

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Zustand** - Lightweight state management
- **Vitest** - Unit testing framework
- **CSS Grid** - Board layout (no external UI libraries)

## 📱 Browser Compatibility

- **Desktop**: All modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile**: iOS Safari, Android Chrome
- **Requirements**: ES2020+ support, CSS Grid support

## 🤝 Contributing

This project is designed to be easily extensible:

1. **Fork the repository**
2. **Create a feature branch**
3. **Add your changes** with tests
4. **Submit a pull request**

Contribution ideas:
- New chess pieces (Bishop, Rook, Queen, King)
- New enemy types with unique AI
- Power-ups and special abilities
- Sound effects and music
- Multiplayer support
- Level editor

## 📄 License

MIT License - feel free to use this project for educational purposes or as a foundation for your own chess learning games!

---

**Happy Chess Learning!** 🎉♟️
