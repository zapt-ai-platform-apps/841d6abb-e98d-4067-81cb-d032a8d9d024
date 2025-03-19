import React, { useState, useEffect } from 'react';
import Card from './Card';
import { useGame } from '../contexts/GameContext';

function Timeline() {
  const { state, dispatch } = useGame();
  const { timeline, gameStatus, playerHand } = state;
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  
  // Function to handle selecting a card from hand
  const selectCard = (index) => {
    if (gameStatus !== 'playing') return;
    setSelectedCardIndex(index === selectedCardIndex ? null : index);
  };
  
  // Function to handle placing a card on the timeline
  const placeCardAt = (position) => {
    if (selectedCardIndex === null) return;
    
    dispatch({
      type: 'PLACE_CARD',
      payload: {
        cardIndex: selectedCardIndex,
        position
      }
    });
    
    setSelectedCardIndex(null);
  };
  
  // Auto-evaluate the timeline if no cards left in hand
  useEffect(() => {
    if (gameStatus === 'evaluating') {
      const timer = setTimeout(() => {
        dispatch({ type: 'EVALUATE_TIMELINE' });
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [gameStatus, dispatch]);
  
  return (
    <div className="flex flex-col items-center my-6">
      <h2 className="text-2xl mb-4">Timeline</h2>
      
      {/* Card selection from hand */}
      {gameStatus === 'playing' && playerHand.length > 0 && (
        <div className="mb-4">
          <p className="text-center mb-2">
            {selectedCardIndex !== null 
              ? "Now click where to place it on the timeline" 
              : "Select a card from your hand"}
          </p>
          <div className="flex flex-wrap justify-center">
            {playerHand.map((card, index) => (
              <div
                key={card.id}
                className="transform transition-transform"
              >
                <Card 
                  card={card}
                  onClick={() => selectCard(index)}
                  isInTimeline={false}
                  isSelected={selectedCardIndex === index}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {timeline.length === 0 ? (
        <div 
          className="bg-black bg-opacity-20 rounded-lg p-8 text-center w-full"
          onClick={() => selectedCardIndex !== null && placeCardAt(0)}
        >
          <p>Place your first card here</p>
          {selectedCardIndex !== null && (
            <div className="mt-4 animate-pulse text-yellow-300">
              Click to place your card
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center bg-black bg-opacity-20 rounded-lg p-4 max-w-full overflow-x-auto">
          {/* First position */}
          <div 
            className={`w-4 h-48 flex items-center justify-center mx-1 ${
              selectedCardIndex !== null ? 'bg-yellow-300 bg-opacity-30 hover:bg-opacity-60 rounded cursor-pointer' : ''
            }`}
            onClick={() => selectedCardIndex !== null && placeCardAt(0)}
          >
            {selectedCardIndex !== null && (
              <div className="text-yellow-300 text-2xl">⟸</div>
            )}
          </div>
          
          {/* Timeline cards with insertion points between them */}
          {timeline.map((card, index) => (
            <React.Fragment key={card.id || index}>
              <Card 
                card={card} 
                isInTimeline={true} 
              />
              
              <div 
                className={`w-4 h-48 flex items-center justify-center mx-1 ${
                  selectedCardIndex !== null ? 'bg-yellow-300 bg-opacity-30 hover:bg-opacity-60 rounded cursor-pointer' : ''
                }`}
                onClick={() => selectedCardIndex !== null && placeCardAt(index + 1)}
              >
                {selectedCardIndex !== null && (
                  <div className="text-yellow-300 text-2xl">⟸</div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default Timeline;