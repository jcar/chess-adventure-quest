import type { Position } from '../types/game';

export function getPositionFromArrowKey(
  currentPosition: Position,
  key: string
): Position | null {
  const { x, y } = currentPosition;
  
  switch (key) {
    case 'ArrowUp':
      return { x, y: y - 1 };
    case 'ArrowDown':
      return { x, y: y + 1 };
    case 'ArrowLeft':
      return { x: x - 1, y };
    case 'ArrowRight':
      return { x: x + 1, y };
    default:
      return null;
  }
}

export function isArrowKey(key: string): boolean {
  return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key);
}
