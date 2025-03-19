export function evaluatePokerHand(cards) {
  // Extract just suit and value for poker hand evaluation
  const pokerCards = cards.map(card => ({
    suit: card.suit,
    value: card.value
  }));
  
  // Check for various poker hands
  if (hasRoyalFlush(pokerCards)) {
    return { name: 'Royal Flush', multiplier: 10 };
  } else if (hasStraightFlush(pokerCards)) {
    return { name: 'Straight Flush', multiplier: 8 };
  } else if (hasFourOfAKind(pokerCards)) {
    return { name: 'Four of a Kind', multiplier: 7 };
  } else if (hasFullHouse(pokerCards)) {
    return { name: 'Full House', multiplier: 6 };
  } else if (hasFlush(pokerCards)) {
    return { name: 'Flush', multiplier: 5 };
  } else if (hasStraight(pokerCards)) {
    return { name: 'Straight', multiplier: 4 };
  } else if (hasThreeOfAKind(pokerCards)) {
    return { name: 'Three of a Kind', multiplier: 3 };
  } else if (hasTwoPair(pokerCards)) {
    return { name: 'Two Pair', multiplier: 2 };
  } else if (hasOnePair(pokerCards)) {
    return { name: 'One Pair', multiplier: 1.5 };
  } else {
    return { name: 'High Card', multiplier: 1 };
  }
}

function hasRoyalFlush(cards) {
  if (!hasFlush(cards)) return false;
  
  const values = ['10', 'J', 'Q', 'K', 'A'];
  return values.every(value => 
    cards.some(card => card.value === value)
  );
}

function hasStraightFlush(cards) {
  return hasFlush(cards) && hasStraight(cards);
}

function hasFourOfAKind(cards) {
  const valueCounts = getValueCounts(cards);
  return Object.values(valueCounts).some(count => count === 4);
}

function hasFullHouse(cards) {
  const valueCounts = getValueCounts(cards);
  const counts = Object.values(valueCounts);
  return counts.includes(3) && counts.includes(2);
}

function hasFlush(cards) {
  const suits = cards.map(card => card.suit);
  return new Set(suits).size === 1;
}

function hasStraight(cards) {
  const order = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const values = cards.map(card => card.value);
  
  // Check for A-2-3-4-5 straight
  if (values.includes('A') && values.includes('2') && values.includes('3') &&
      values.includes('4') && values.includes('5')) {
    return true;
  }
  
  // Convert card values to their numeric positions in the order array
  const positions = values.map(v => order.indexOf(v)).sort((a, b) => a - b);
  
  // Check if positions form a sequence
  for (let i = 1; i < positions.length; i++) {
    if (positions[i] !== positions[i-1] + 1) {
      return false;
    }
  }
  
  return true;
}

function hasThreeOfAKind(cards) {
  const valueCounts = getValueCounts(cards);
  return Object.values(valueCounts).some(count => count === 3);
}

function hasTwoPair(cards) {
  const valueCounts = getValueCounts(cards);
  const pairs = Object.values(valueCounts).filter(count => count === 2);
  return pairs.length === 2;
}

function hasOnePair(cards) {
  const valueCounts = getValueCounts(cards);
  return Object.values(valueCounts).some(count => count === 2);
}

function getValueCounts(cards) {
  const counts = {};
  cards.forEach(card => {
    counts[card.value] = (counts[card.value] || 0) + 1;
  });
  return counts;
}