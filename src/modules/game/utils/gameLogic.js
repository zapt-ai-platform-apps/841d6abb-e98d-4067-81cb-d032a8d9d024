export function generateDeck() {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  
  // Generate an array of historical events with years (for the timeline feature)
  const historicalEvents = [
    { event: "First Telephone Call", year: 1876 },
    { event: "Wright Brothers' First Flight", year: 1903 },
    { event: "Titanic Sinks", year: 1912 },
    { event: "First World War Begins", year: 1914 },
    { event: "First World War Ends", year: 1918 },
    { event: "Wall Street Crash", year: 1929 },
    { event: "World War II Begins", year: 1939 },
    { event: "World War II Ends", year: 1945 },
    { event: "First Man in Space", year: 1961 },
    { event: "First Man on the Moon", year: 1969 },
    { event: "Berlin Wall Falls", year: 1989 },
    { event: "World Wide Web Invented", year: 1989 },
    { event: "Apple's iPhone Released", year: 2007 },
    { event: "COVID-19 Pandemic", year: 2020 },
    { event: "First Commercial Steam Locomotive", year: 1804 },
    { event: "Declaration of Independence", year: 1776 },
    { event: "Napoleon's Defeat at Waterloo", year: 1815 },
    { event: "Albert Einstein's Theory of Relativity", year: 1905 },
    { event: "Founding of Rome", year: -753 },
    { event: "Construction of the Great Wall of China Begins", year: -700 },
    { event: "Building of the Pyramids of Giza", year: -2560 },
    { event: "The Renaissance Begins", year: 1300 },
    { event: "Columbus Reaches America", year: 1492 },
    { event: "American Civil War Begins", year: 1861 },
    { event: "First Modern Olympic Games", year: 1896 },
    { event: "Television Invented", year: 1925 },
    { event: "First Computer Built", year: 1945 },
    { event: "Invention of the Internet", year: 1969 },
    { event: "Fall of the Roman Empire", year: 476 },
    { event: "Beginning of the Industrial Revolution", year: 1760 },
    { event: "French Revolution Begins", year: 1789 },
    { event: "Treaty of Versailles", year: 1919 },
    { event: "Hiroshima Atomic Bombing", year: 1945 },
    { event: "Cuban Missile Crisis", year: 1962 },
    { event: "First Cloned Sheep", year: 1996 },
    { event: "Invention of the Printing Press", year: 1440 },
    { event: "Discovery of Penicillin", year: 1928 },
    { event: "Signing of the Magna Carta", year: 1215 },
    { event: "Battle of Hastings", year: 1066 },
    { event: "First Cell Phone Call", year: 1973 },
    { event: "First Automobile", year: 1886 },
    { event: "First Heart Transplant", year: 1967 },
    { event: "First Email Sent", year: 1971 },
    { event: "First Commercial Airline Flight", year: 1914 },
    { event: "The Great Depression", year: 1929 },
    { event: "Facebook Launched", year: 2004 },
    { event: "Twitter Founded", year: 2006 },
    { event: "Google Founded", year: 1998 },
    { event: "9/11 Terrorist Attacks", year: 2001 },
    { event: "Black Death in Europe", year: 1347 },
    { event: "Invention of Photography", year: 1839 },
    { event: "First Olympic Games in Ancient Greece", year: -776 }
  ];
  
  let deck = [];
  
  // Assign historical events to cards
  let eventIndex = 0;
  for (let suit of suits) {
    for (let value of values) {
      if (eventIndex >= historicalEvents.length) {
        eventIndex = 0; // Cycle back if we run out of events
      }
      
      const { event, year } = historicalEvents[eventIndex];
      
      deck.push({
        suit,
        value,
        event,
        year,
        id: `${value}_of_${suit}`
      });
      
      eventIndex++;
    }
  }
  
  return deck;
}

export function shuffleDeck(deck) {
  // Fisher-Yates shuffle algorithm
  let shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function dealCards(deck, count) {
  return deck.slice(0, count);
}

export function evaluateTimeline(timeline) {
  // Check if timeline is in chronological order
  for (let i = 1; i < timeline.length; i++) {
    if (timeline[i].year < timeline[i-1].year) {
      return { 
        isCorrect: false, 
        multiplier: 0, 
        reason: `The timeline is incorrect! ${timeline[i].event} (${timeline[i].year}) happened before ${timeline[i-1].event} (${timeline[i-1].year}).` 
      };
    }
  }
  
  // Check for poker hands in the timeline
  const pokerHand = evaluatePokerHand(timeline);
  
  return {
    isCorrect: true,
    multiplier: pokerHand.multiplier,
    reason: `You created a correct timeline and got a ${pokerHand.name}!`
  };
}