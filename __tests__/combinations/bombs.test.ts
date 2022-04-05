import { describe, test, expect } from '@jest/globals';
import { Card, CardType } from '../../classes/Card';
import { combinationConstants } from '../../constants/CombinationConstants';
import { isValidCombination } from '../../helper/combinationHelpers';

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

  describe('bomb beats a 2 "TWOs"', () => {
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
});
