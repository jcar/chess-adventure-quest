import React from 'react';
import type { Position, Entity } from '../types/game';
import './BoardCell.css';

interface BoardCellProps {
  position: Position;
  entity: Entity | null;
  isPlayerPosition: boolean;
  isValidMove: boolean;
  onClick: (position: Position) => void;
}

const BoardCell: React.FC<BoardCellProps> = ({
  position,
  entity,
  isPlayerPosition,
  isValidMove,
  onClick
}) => {
  const handleClick = () => {
    onClick(position);
  };

  const getEntityEmoji = (entity: Entity): string => {
    switch (entity.type) {
      case 'player':
        // Return correct emoji for each chess piece
        switch (entity.pieceType) {
          case 'pawn': return '♙';
          case 'knight': return '♘';
          case 'rook': return '♖';
          case 'bishop': return '♗';
          case 'queen': return '♕';
          case 'king': return '♔';
          default: return '♙';
        }
      case 'coin':
        return '🪙';
      case 'treasure':
        return '💎';
      case 'friend':
        return '🧙‍♀️'; // Friendly character to rescue
      case 'exit':
        return '🚪';
      case 'slime':
        return '🟢';
      case 'goblin':
        return '👹';
      case 'boss':
        return '🐉';
      case 'danger':
        return '⚡';
      default:
        return '';
    }
  };

  const getCellClass = (): string => {
    const classes = ['board-cell'];
    
    // Checkerboard pattern
    if ((position.x + position.y) % 2 === 0) {
      classes.push('light');
    } else {
      classes.push('dark');
    }
    
    if (isPlayerPosition) {
      classes.push('player-position');
    }
    
    if (isValidMove) {
      classes.push('valid-move');
    }
    
    if (entity) {
      classes.push(`entity-${entity.type}`);
    }
    
    return classes.join(' ');
  };

  return (
    <div
      className={getCellClass()}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="cell-content">
        {entity && (
          <span className="entity-emoji">
            {getEntityEmoji(entity)}
          </span>
        )}
        {isValidMove && !entity && (
          <div className="move-indicator" />
        )}
      </div>
    </div>
  );
};

export default BoardCell;
