import { describe, test, expect } from '@jest/globals';
import { Card, CardType } from '../../../classes/Card';
import { combinationConstants } from '../../../constants/CombinationConstants';
import { isValidCombination } from '../../combinationHelpers';

describe('straights', () => {
  describe('card combination of 2 cards does not create a straight', () => {
    test('3 to 4 straight returns false', () => {
      const incoming: CardType[] = [new Card(0, 3), new Card(1, 4)];
      const [isValid, _] = isValidCombination(incoming, null, null);
      expect(isValid).toBeFalsy();
    });
  });

  describe('card combination of 3 cards does create a straight', () => {
    test('3 to 6 straight returns true', () => {
      const incoming: CardType[] = [
        new Card(0, 3),
        new Card(1, 4),
        new Card(2, 5),
        new Card(2, 6),
      ];
      const [isValid, type] = isValidCombination(incoming, null, null);
      expect(isValid).toBeTruthy();
      expect(type).toBe('STRAIGHT');
    });
  });

  describe('card combination of triple does not satisfy a straight', () => {
    test('triple sevens returns false', () => {
      const incoming: CardType[] = [
        new Card(0, 7),
        new Card(1, 7),
        new Card(2, 7),
      ];
      const current = new Card(0, 8);
      const [isValid, type] = isValidCombination(
        incoming,
        combinationConstants.STRAIGHT,
        current,
        3
      );
      expect(isValid).toBeFalsy();
      expect(type).toBe('STRAIGHT');
    });
  });

  describe('three card straight with a "TWO" does not satisfy a straight', () => {
    test('king, ace, two straight returns false', () => {
      const incoming: CardType[] = [
        new Card(0, 13),
        new Card(1, 14),
        new Card(2, 15),
      ];
      const [isValid, type] = isValidCombination(incoming, null, null);
      expect(isValid).toBeFalsy();
      expect(type).toBe(null);
    });
  });

  describe('incoming straight beats current', () => {
    test('7 to 9 straight beats a 6 high straight', () => {
      const incoming: CardType[] = [
        new Card(0, 7),
        new Card(1, 8),
        new Card(2, 9),
      ];
      const current = new Card(0, 6);
      const [isValid, _] = isValidCombination(
        incoming,
        combinationConstants.STRAIGHT,
        current,
        3
      );
      expect(isValid).toBeTruthy();
    });
  });

  describe('incoming straight does not beat current', () => {
    test('7 to 9 straight does not beat a 9 high straight with a higher suit', () => {
      const incoming: CardType[] = [
        new Card(0, 7),
        new Card(1, 8),
        new Card(2, 9),
      ];
      const current = new Card(3, 9);
      const [isValid, _] = isValidCombination(
        incoming,
        combinationConstants.STRAIGHT,
        current,
        3
      );
      expect(isValid).toBeFalsy();
    });
  });
});
