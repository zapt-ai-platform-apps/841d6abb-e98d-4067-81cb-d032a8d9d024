import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';

function Controls() {
  const { state, dispatch } = useGame();
  const { gameStatus, chips, currentBet, message } = state;
  const [betAmount, setBetAmount] = useState(10);
  
  const handleBet = () => {
    if (gameStatus !== 'betting') return;
    
    dispatch({
      type: 'PLACE_BET',
      payload: betAmount
    });
    console.log(`Bet placed: ${betAmount} chips`);
  };
  
  const handleNewGame = () => {
    dispatch({ type: 'NEW_GAME' });
    console.log('Starting new game');
    
    // Add small delay before initializing
    setTimeout(() => {
      dispatch({ type: 'INITIALIZE_GAME' });
    }, 500);
  };
  
  return (
    <div className="p-4 bg-black bg-opacity-30 rounded-lg mb-4">
      {/* Game info display */}
      <div className="mb-4 text-center">
        <div className="text-xl font-bold mb-2">{message}</div>
        <div className="flex flex-wrap justify-around gap-2">
          <div className="px-4 py-2 bg-yellow-800 rounded-lg">Chips: {chips}</div>
          {currentBet > 0 && (
            <div className="px-4 py-2 bg-green-800 rounded-lg">Bet: {currentBet}</div>
          )}
        </div>
      </div>
      
      {/* Betting controls */}
      {gameStatus === 'betting' && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-4">
          <div className="flex items-center">
            <button 
              className="px-3 py-1 bg-red-700 rounded-l cursor-pointer disabled:opacity-50"
              onClick={() => setBetAmount(Math.max(5, betAmount - 5))}
              disabled={betAmount <= 5}
            >
              -
            </button>
            <div className="px-4 py-1 bg-white text-black font-bold min-w-16 text-center">
              {betAmount}
            </div>
            <button 
              className="px-3 py-1 bg-green-700 rounded-r cursor-pointer disabled:opacity-50"
              onClick={() => setBetAmount(Math.min(chips, betAmount + 5))}
              disabled={betAmount >= chips}
            >
              +
            </button>
          </div>
          
          <button 
            className="px-6 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg font-bold cursor-pointer"
            onClick={handleBet}
          >
            Place Bet
          </button>
        </div>
      )}
      
      {/* New game button */}
      {gameStatus === 'gameOver' && (
        <div className="flex justify-center my-4">
          <button 
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold cursor-pointer"
            onClick={handleNewGame}
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
}

export default Controls;