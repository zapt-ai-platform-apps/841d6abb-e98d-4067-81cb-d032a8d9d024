import React from 'react';

function Card({ card, onClick, isInTimeline, isSelected }) {
  const { suit, value, event, year } = card;
  
  // Determine card color based on suit
  const isRed = suit === 'hearts' || suit === 'diamonds';
  const textColor = isRed ? 'text-red-600' : 'text-black';
  
  // Get suit symbol
  const suitSymbol = {
    'hearts': '♥',
    'diamonds': '♦',
    'clubs': '♣',
    'spades': '♠'
  }[suit];
  
  return (
    <div 
      onClick={onClick} 
      className={`relative w-32 h-48 bg-white rounded-lg shadow-md m-1 flex flex-col p-2 cursor-pointer transition-transform transform ${
        isSelected ? 'scale-110 -translate-y-4 border-2 border-yellow-400' : 
        isInTimeline ? 'border-2 border-yellow-400' : 
        'hover:scale-105'
      }`}
    >
      <div className={`flex justify-between ${textColor}`}>
        <span className="text-xl font-bold">{value}</span>
        <span className="text-xl">{suitSymbol}</span>
      </div>
      
      <div className="flex-grow flex flex-col items-center justify-center text-center p-1">
        <div className="text-sm font-medium mb-2">{event}</div>
        {isInTimeline ? (
          <div className="text-lg font-bold">{year}</div>
        ) : (
          <div className="text-lg font-bold">????</div>
        )}
      </div>
      
      <div className={`flex justify-between ${textColor}`}>
        <span className="text-xl">{suitSymbol}</span>
        <span className="text-xl font-bold">{value}</span>
      </div>
    </div>
  );
}

export default Card;