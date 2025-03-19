import React from 'react';
import Timeline from './Timeline';
import Controls from './Controls';
import { useGame } from '../contexts/GameContext';

function GameBoard() {
  const { state } = useGame();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Timeline Poker</h1>
        <p className="text-lg">Place your cards in chronological order to win!</p>
      </header>
      
      <Controls />
      <Timeline />
      
      <footer className="text-center text-sm text-white text-opacity-70 mt-8">
        <p>Round {state.roundNumber}</p>
        <p className="text-xs mt-2">The year is revealed when you place a card on the timeline.</p>
        <p className="text-xs">Create poker hands while maintaining correct chronological order!</p>
      </footer>
    </div>
  );
}

export default GameBoard;