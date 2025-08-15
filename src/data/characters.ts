import type { PieceType } from '../types/game';

export interface ChessCharacter {
  piece: PieceType;
  name: string;
  emoji: string;
  personality: string;
  greeting: string;
  ability: string;
  movementDescription: string;
  encouragement: string[];
  victoryQuotes: string[];
}

export const CHESS_CHARACTERS: Record<PieceType, ChessCharacter> = {
  pawn: {
    piece: 'pawn',
    name: 'Pawn Pete',
    emoji: '♙',
    personality: 'Brave and determined, always moving forward!',
    greeting: '⚡ "Hi there! I\'m Pawn Pete, and I never give up! I march forward to victory!"',
    ability: 'Forward March & Diagonal Strike',
    movementDescription: 'I move forward one square (or two from my starting spot), and I capture diagonally!',
    encouragement: [
      '💪 "Keep moving forward, just like me!"',
      '🎯 "Remember, I can capture diagonally!"',
      '⚡ "You\'ve got this, brave friend!"',
      '🏃‍♂️ "One step at a time, that\'s how we win!"'
    ],
    victoryQuotes: [
      '🎉 "Amazing! You marched to victory like a true hero!"',
      '⚡ "Forward march worked perfectly! I\'m so proud!"',
      '💪 "That\'s the spirit! Never give up, just like a pawn!"',
      '🏆 "You used my diagonal power perfectly!"'
    ]
  },
  knight: {
    piece: 'knight',
    name: 'Knight Nelly',
    emoji: '♘',
    personality: 'Playful and acrobatic, loves to hop and jump!',
    greeting: '🐴 "Neighhhh! I\'m Knight Nelly, and I love to jump in L-shapes! Let\'s hop to it!"',
    ability: 'L-shaped Leap Power',
    movementDescription: 'I jump in an L-shape: 2 squares one way, then 1 square sideways! I can hop over anything!',
    encouragement: [
      '🐴 "Think L-shaped! Two squares, then one!"',
      '🦘 "I can jump over obstacles, use my power!"',
      '⭐ "Every great knight started with small hops!"',
      '🎪 "Jump like an acrobat - L-shapes are fun!"'
    ],
    victoryQuotes: [
      '🐴 "Neighhhh! That was an amazing L-shaped adventure!"',
      '🦘 "You hopped to victory! I\'m so proud!"',
      '⭐ "That L-shaped thinking was brilliant!"',
      '🎪 "What a spectacular jumping performance!"'
    ]
  },
  rook: {
    piece: 'rook',
    name: 'Rook Ruby',
    emoji: '♖',
    personality: 'Fast and determined, loves racing in straight lines!',
    greeting: '🚗 "Vroom! I\'m Rook Ruby, and I race super fast in straight lines! Ready to zoom?"',
    ability: 'Straight Line Speed',
    movementDescription: 'I zoom along ranks and files - that\'s straight up, down, left, or right as far as I want!',
    encouragement: [
      '🚗 "Think straight lines! Up, down, left, or right!"',
      '💨 "I go fast and far in straight directions!"',
      '🏁 "Race to the finish line with me!"',
      '⚡ "Straight paths are the fastest way!"'
    ],
    victoryQuotes: [
      '🚗 "Vroom vroom! That was a fantastic race!"',
      '💨 "You used my speed perfectly! What a rush!"',
      '🏁 "We crossed the finish line together!"',
      '⚡ "Straight-line strategy for the win!"'
    ]
  },
  bishop: {
    piece: 'bishop',
    name: 'Bishop Barry',
    emoji: '♗',
    personality: 'Wise and graceful, glides diagonally with elegance!',
    greeting: '✨ "Greetings! I\'m Bishop Barry, and I glide gracefully along diagonal paths! Shall we dance?"',
    ability: 'Diagonal Glide Magic',
    movementDescription: 'I glide diagonally across the board - that\'s the slanted lines that go corner to corner!',
    encouragement: [
      '✨ "Think diagonally! Like drawing a line from corner to corner!"',
      '🎭 "Grace and elegance in every diagonal move!"',
      '💫 "Follow the diagonal paths to wisdom!"',
      '🌟 "Diagonal thinking opens new possibilities!"'
    ],
    victoryQuotes: [
      '✨ "Magnificent! That diagonal strategy was elegant!"',
      '🎭 "A graceful victory worthy of applause!"',
      '💫 "You\'ve mastered the art of diagonal movement!"',
      '🌟 "Brilliant diagonal thinking brought us victory!"'
    ]
  },
  queen: {
    piece: 'queen',
    name: 'Queen Quinn',
    emoji: '♕',
    personality: 'Confident and powerful, can do anything her friends can do!',
    greeting: '👑 "Hello, brave adventurer! I\'m Queen Quinn, and I have ALL the powers of my friends combined!"',
    ability: 'Ultimate Royal Power',
    movementDescription: 'I can move like a rook (straight lines) AND like a bishop (diagonals) - I\'m super versatile!',
    encouragement: [
      '👑 "I have all the powers! Use them wisely!"',
      '💎 "Think like a rook AND a bishop combined!"',
      '⚡ "With great power comes great possibility!"',
      '🌟 "You have royal support in your quest!"'
    ],
    victoryQuotes: [
      '👑 "Majestic! You used my royal powers perfectly!"',
      '💎 "A victory worthy of the crown!"',
      '⚡ "You wielded ultimate power with wisdom!"',
      '🌟 "Royal strategy leads to royal victory!"'
    ]
  },
  king: {
    piece: 'king',
    name: 'King Kevin',
    emoji: '♔',
    personality: 'Wise and careful, moves slowly but thinks deeply!',
    greeting: '👑 "Greetings, noble friend! I\'m King Kevin. I move carefully, one square at a time, but I think big!"',
    ability: 'Royal Wisdom',
    movementDescription: 'I move just one square in any direction, but I must stay safe from danger at all times!',
    encouragement: [
      '👑 "Slow and steady wins the race!"',
      '🛡️ "Safety first! Think before you move!"',
      '💭 "One careful step at a time!"',
      '⚖️ "Wisdom is knowing when to move and when to wait!"'
    ],
    victoryQuotes: [
      '👑 "Wisely done! Careful planning leads to victory!"',
      '🛡️ "You kept me safe and found the way to win!"',
      '💭 "Thoughtful moves create thoughtful victories!"',
      '⚖️ "A wise king and a wise player make a perfect team!"'
    ]
  }
};

export function getCharacter(piece: PieceType): ChessCharacter {
  return CHESS_CHARACTERS[piece];
}

export function getRandomEncouragement(piece: PieceType): string {
  const character = CHESS_CHARACTERS[piece];
  const randomIndex = Math.floor(Math.random() * character.encouragement.length);
  return character.encouragement[randomIndex];
}

export function getRandomVictoryQuote(piece: PieceType): string {
  const character = CHESS_CHARACTERS[piece];
  const randomIndex = Math.floor(Math.random() * character.victoryQuotes.length);
  return character.victoryQuotes[randomIndex];
}
