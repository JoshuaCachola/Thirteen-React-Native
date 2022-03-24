import { describe, test, expect } from '@jest/globals';
import { CardType } from '../../classes/Card';
import { getMultiples } from '../../helper/combinationHelpers';

describe('get multiples', () => {
  describe('get an object of doubles card', () => {
    test('return object with a key of 3 and an array of [0, 1]', () => {
      const hand: CardType[] = [
        { value: 3, suit: 0, selected: false, played: false },
        { value: 3, suit: 1, selected: false, played: false },
        { value: 4, suit: 0, selected: false, played: false },
        { value: 3, suit: 3, selected: false, played: false },
      ];
      const doubles = getMultiples(hand, 'DOUBLE');
      expect(doubles).toEqual({ '3': [[0, 1]] });
    });
  });

  describe('get an object of triples', () => {
    test('return object with a key of 3 and an array of [0, 1, 3]', () => {
      const hand: CardType[] = [
        { value: 3, suit: 0, selected: false, played: false },
        { value: 3, suit: 1, selected: false, played: false },
        { value: 4, suit: 0, selected: false, played: false },
        { value: 3, suit: 3, selected: false, played: false },
      ];
      const triples = getMultiples(hand, 'TRIPLE');
      expect(triples).toEqual({ '3': [[0, 1, 3]] });
    });
  });

  describe('get an object of quads', () => {
    test('return object with a key of 3 and an array of [0, 1, 2, 3]', () => {
      const hand: CardType[] = [
        { value: 3, suit: 0, selected: false, played: false },
        { value: 3, suit: 1, selected: false, played: false },
        { value: 3, suit: 2, selected: false, played: false },
        { value: 3, suit: 3, selected: false, played: false },
      ];
      const quads = getMultiples(hand, 'QUAD');
      expect(quads).toEqual({ '3': [[0, 1, 2, 3]] });
    });
  });
});
