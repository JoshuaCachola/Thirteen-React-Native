import { describe, test, expect } from '@jest/globals';
import { Card, CardType } from '../../../classes/Card';
import { combinationConstants } from '../../../constants/CombinationConstants';
import { isValidCombination } from '../../combinationHelpers';

describe('bombs', () => {
  describe('bomb beats a "TWO"', () => {
    test('four-of-a-kind bomb returns true', () => {
      const incoming: CardType[] = [
        new Card(0, 3),
        new Card(1, 3),
        new Card(2, 3),
        new Card(3, 3),
      ];
      const current = new Card(0, 15);
      const [isValid, type] = isValidCombination(
        incoming,
        combinationConstants.SINGLE,
        current,
        1
      );
      expect(isValid).toBeTruthy();
      expect(type).toBe('BOMB');
    });
  });
  describe('bomb beats a "TWO"', () => {
    test('three consecutive pair bomb returns true', () => {
      const incoming: CardType[] = [
        new Card(0, 3),
        new Card(1, 3),
        new Card(2, 4),
        new Card(3, 4),
        new Card(2, 5),
        new Card(3, 5),
      ];
      const current = new Card(0, 15);
      const [isValid, type] = isValidCombination(
        incoming,
        combinationConstants.SINGLE,
        current,
        1
      );
      expect(isValid).toBeTruthy();
      expect(type).toBe('BOMB');
    });
  });

  describe('double bomb beats a 2 "TWOs"', () => {
    test('four consecutive pair bomb returns true', () => {
      const incoming: CardType[] = [
        new Card(0, 3),
        new Card(1, 3),
        new Card(2, 4),
        new Card(3, 4),
        new Card(2, 5),
        new Card(3, 5),
        new Card(2, 6),
        new Card(3, 6),
      ];
      const current = new Card(1, 15);
      const [isValid, type] = isValidCombination(
        incoming,
        combinationConstants.DOUBLE,
        current,
        2
      );
      expect(isValid).toBeTruthy();
      expect(type).toBe('DOUBLE_BOMB');
    });
  });

  describe('triple bomb beats a 3 "TWOs"', () => {
    test('five consecutive pair bomb returns true', () => {
      const incoming: CardType[] = [
        new Card(0, 3),
        new Card(1, 3),
        new Card(2, 4),
        new Card(3, 4),
        new Card(2, 5),
        new Card(3, 5),
        new Card(2, 6),
        new Card(3, 6),
        new Card(2, 7),
        new Card(3, 7),
      ];
      const current = new Card(1, 15);
      const [isValid, type] = isValidCombination(
        incoming,
        combinationConstants.TRIPLE,
        current,
        3
      );
      expect(isValid).toBeTruthy();
      expect(type).toBe('TRIPLE_BOMB');
    });
  });

  describe('bomb does not beat a non-TWO card', () => {
    test('bomb returns false', () => {
      const incoming: CardType[] = [
        new Card(0, 3),
        new Card(1, 3),
        new Card(2, 4),
        new Card(3, 4),
        new Card(2, 5),
        new Card(3, 5),
      ];
      const current = new Card(1, 14);
      const [isValid, type] = isValidCombination(
        incoming,
        combinationConstants.SINGLE,
        current,
        1
      );
      expect(isValid).toBeFalsy();
      expect(type).toBe('SINGLE');
    });
  });
});
