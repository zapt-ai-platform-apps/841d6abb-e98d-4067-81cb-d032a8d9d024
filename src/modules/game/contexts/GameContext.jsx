import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { initialState, gameReducer } from './gameReducer';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Initialize game on mount
  useEffect(() => {
    dispatch({ type: 'INITIALIZE_GAME' });
    console.log('Game initialized');
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}