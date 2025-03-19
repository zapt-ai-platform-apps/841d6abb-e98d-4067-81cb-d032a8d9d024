import { describe, it, expect } from 'vitest';
import { evaluateTimeline, generateDeck, shuffleDeck, dealCards } from './gameLogic';

describe('Game Logic', () => {
  describe('generateDeck', () => {
    it('should generate a deck with 52 cards', () => {
      const deck = generateDeck();
      expect(deck.length).toBe(52);
    });

    it('each card should have required properties', () => {
      const deck = generateDeck();
      const card = deck[0];
      expect(card).toHaveProperty('suit');
      expect(card).toHaveProperty('value');
      expect(card).toHaveProperty('event');
      expect(card).toHaveProperty('year');
      expect(card).toHaveProperty('id');
    });
  });

  describe('shuffleDeck', () => {
    it('should return a shuffled deck with the same cards', () => {
      const deck = generateDeck();
      const shuffled = shuffleDeck(deck);
      expect(shuffled.length).toBe(deck.length);
      
      // Check that the decks aren't in the same order
      // Note: This has a very small chance of failing if the shuffle
      // happens to result in the same order
      let isDifferent = false;
      for (let i = 0; i < deck.length; i++) {
        if (deck[i].id !== shuffled[i].id) {
          isDifferent = true;
          break;
        }
      }
      expect(isDifferent).toBe(true);
    });
  });

  describe('dealCards', () => {
    it('should deal the specified number of cards', () => {
      const deck = generateDeck();
      const hand = dealCards(deck, 5);
      expect(hand.length).toBe(5);
    });
  });

  describe('evaluateTimeline', () => {
    it('should identify a correct timeline', () => {
      const timeline = [
        { event: 'Event 1', year: 1900, suit: 'hearts', value: 'A' },
        { event: 'Event 2', year: 1950, suit: 'diamonds', value: 'K' },
        { event: 'Event 3', year: 2000, suit: 'clubs', value: 'Q' }
      ];
      
      const result = evaluateTimeline(timeline);
      expect(result.isCorrect).toBe(true);
    });

    it('should identify an incorrect timeline', () => {
      const timeline = [
        { event: 'Event 1', year: 1900, suit: 'hearts', value: 'A' },
        { event: 'Event 3', year: 2000, suit: 'clubs', value: 'Q' },
        { event: 'Event 2', year: 1950, suit: 'diamonds', value: 'K' }
      ];
      
      const result = evaluateTimeline(timeline);
      expect(result.isCorrect).toBe(false);
    });
  });
});