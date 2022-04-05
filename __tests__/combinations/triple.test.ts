import { describe, test, expect } from '@jest/globals';
import { Card, CardType } from '../../classes/Card';
import { combinationConstants } from '../../constants/CombinationConstants';
import { isValidCombination } from '../../helper/combinationHelpers';

// triples
describe('triple combinations', () => {
  describe('checks for valid triple combination by value of card', () => {
    test('triple fives beat triple fours', () => {
      const incoming: CardType[] = [
        new Card(0, 5),
        new Card(1, 5),
        new Card(2, 5),
      ];
      const current = new Card(2, 4);
      const [isValid, _] = isValidCombination(
        incoming,
        combinationConstants.TRIPLE,
        current,
        3
      );
      expect(isValid).toBeTruthy();
    });
  });

  describe('checks for invalid triple combinations by value of card', () => {
    test('triple fours does not beat triple fives', () => {
      const incoming: CardType[] = [
        new Card(0, 4),
        new Card(1, 4),
        new Card(2, 4),
      ];
      const current = new Card(2, 5);
      const [isValid, _] = isValidCombination(
        incoming,
        combinationConstants.TRIPLE,
        current,
        3
      );
      expect(isValid).toBeFalsy();
    });
  });

  describe('checks for triple with invalid triple', () => {
    test('2 fours and 1 five returns false', () => {
      const incoming: CardType[] = [
        new Card(0, 4),
        new Card(1, 4),
        new Card(2, 5),
      ];
      const [isValid, _] = isValidCombination(incoming, null, null);
      expect(isValid).toBeFalsy();
    });
  });

  describe('identifies valid triple', () => {
    test('3 fours returns valid and "TRIPLE" combination type', () => {
      const incoming: CardType[] = [
        new Card(0, 4),
        new Card(1, 4),
        new Card(2, 4),
      ];
      const [isValid, type] = isValidCombination(incoming, null, null);
      expect(isValid).toBeTruthy();
      expect(type).toBe('TRIPLE');
    });
  });
});
