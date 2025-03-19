import React from 'react';
import GameBoard from './modules/game/components/GameBoard';
import { GameProvider } from './modules/game/contexts/GameContext';

export default function App() {
  return (
    <div className="min-h-screen bg-green-800 text-white">
      <GameProvider>
        <GameBoard />
        <div className="fixed bottom-2 right-2 text-xs text-white/70">
          <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            Made on ZAPT
          </a>
        </div>
      </GameProvider>
    </div>
  );
}