import { describe, test, expect } from '@jest/globals';
import { Card, CardType } from '../../classes/Card';
import { combinationConstants } from '../../constants/CombinationConstants';
import { isValidCombination } from '../../helper/combinationHelpers';

describe('four-of-a-kind bombs', () => {
  describe('checks for valid four-of-a-kind', () => {
    test('four nines returns true', () => {
      const incoming: CardType[] = [
        new Card(0, 9),
        new Card(1, 9),
        new Card(2, 9),
        new Card(3, 9),
      ];
      const [isValid, type] = isValidCombination(incoming, null, null);
      expect(isValid).toBeTruthy();
      expect(type).toBe('BOMB');
    });
  });

  describe('checks for invalid four-of-a-kind', () => {
    test('three nines and a 10 returns false', () => {
      const incoming: CardType[] = [
        new Card(0, 9),
        new Card(1, 9),
        new Card(2, 9),
        new Card(3, 10),
      ];
      const [isValid, _] = isValidCombination(incoming, null, null);
      expect(isValid).toBeFalsy();
    });
  });

  describe('checks for incoming four-of-a-kind beats current', () => {
    test('four nines beats four eights', () => {
      const incoming: CardType[] = [
        new Card(0, 9),
        new Card(1, 9),
        new Card(2, 9),
        new Card(3, 9),
      ];
      const current = new Card(3, 8);
      const [isValid, _] = isValidCombination(
        incoming,
        combinationConstants.BOMB,
        current,
        4
      );
      expect(isValid).toBeTruthy();
    });
  });

  describe('checks for incoming four-of-a-kind does not beat current', () => {
    test('four nines does not beat four tens', () => {
      const incoming: CardType[] = [
        new Card(0, 9),
        new Card(1, 9),
        new Card(2, 9),
        new Card(3, 9),
      ];
      const current = new Card(3, 10);
      const [isValid, _] = isValidCombination(
        incoming,
        combinationConstants.BOMB,
        current,
        4
      );
      expect(isValid).toBeFalsy();
    });
  });
});
