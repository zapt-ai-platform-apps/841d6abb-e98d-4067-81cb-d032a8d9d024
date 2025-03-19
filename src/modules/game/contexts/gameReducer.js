import { 
  generateDeck, 
  shuffleDeck, 
  dealCards,
  evaluateTimeline
} from '../utils/gameLogic';

export const initialState = {
  deck: [],
  playerHand: [],
  timeline: [],
  chips: 1000,
  currentBet: 0,
  gameStatus: 'initializing', // 'initializing', 'betting', 'playing', 'evaluating', 'gameOver'
  message: 'Welcome to Timeline Poker!',
  roundNumber: 0
};

export function gameReducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      const deck = shuffleDeck(generateDeck());
      const playerHand = dealCards(deck, 5);
      
      return {
        ...state,
        deck: deck.slice(5), // Remove dealt cards
        playerHand,
        timeline: [],
        gameStatus: 'betting',
        message: 'Place your bet!',
        roundNumber: state.roundNumber + 1
      };
    
    case 'PLACE_BET':
      if (action.payload <= 0 || action.payload > state.chips) {
        return {
          ...state,
          message: 'Invalid bet amount!'
        };
      }
      
      return {
        ...state,
        currentBet: action.payload,
        chips: state.chips - action.payload,
        gameStatus: 'playing',
        message: 'Place your cards on the timeline!'
      };
    
    case 'PLACE_CARD':
      // Check if valid move
      if (state.gameStatus !== 'playing') {
        return state;
      }
      
      const card = state.playerHand[action.payload.cardIndex];
      let newTimeline = [...state.timeline];
      
      // Insert card at position
      newTimeline.splice(action.payload.position, 0, card);
      
      // Remove card from hand
      const newHand = state.playerHand.filter((_, index) => index !== action.payload.cardIndex);
      
      const newGameStatus = newHand.length === 0 ? 'evaluating' : 'playing';
      const newMessage = newHand.length === 0 ? 'Evaluating your timeline...' : 'Keep placing cards!';
      
      return {
        ...state,
        playerHand: newHand,
        timeline: newTimeline,
        gameStatus: newGameStatus,
        message: newMessage
      };
    
    case 'EVALUATE_TIMELINE':
      const { isCorrect, multiplier, reason } = evaluateTimeline(state.timeline);
      const winnings = isCorrect ? Math.floor(state.currentBet * multiplier) : 0;
      
      return {
        ...state,
        chips: state.chips + winnings,
        gameStatus: 'gameOver',
        message: isCorrect 
          ? `You won ${winnings} chips! ${reason}`
          : `You lost your bet. ${reason}`
      };
    
    case 'NEW_GAME':
      return {
        ...state,
        gameStatus: 'initializing',
        message: 'Starting new game...',
        currentBet: 0
      };
      
    default:
      return state;
  }
}