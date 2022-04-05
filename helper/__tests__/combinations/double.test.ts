import { describe, test, expect } from '@jest/globals';
import { Card, CardType } from '../../../classes/Card';
import { combinationConstants } from '../../../constants/CombinationConstants';
import { isValidCombination } from '../../combinationHelpers';

// Doubles
describe('double combinations', () => {
  describe('checks for valid double combination by value of card', () => {
    test('double fives beats double fours', () => {
      const incoming: CardType[] = [new Card(0, 5), new Card(1, 5)];
      const current = new Card(1, 4);
      const [isValid, _] = isValidCombination(
        incoming,
        combinationConstants.DOUBLE,
        current,
        2
      );
      expect(isValid).toBeTruthy();
    });
  });

  describe('checks for invalid double combination by value of card', () => {
    test('double sevens does not beat double jacks', () => {
      const incoming: CardType[] = [new Card(0, 7), new Card(1, 7)];
      const current = new Card(1, 11);
      const [isValid, _] = isValidCombination(
        incoming,
        combinationConstants.DOUBLE,
        current,
        2
      );
      expect(isValid).toBeFalsy();
    });
  });

  describe('checks for valid incoming double with same value, but better suit than current', () => {
    test('jack of diamonds beats jack of clubs', () => {
      const incoming: CardType[] = [new Card(0, 11), new Card(3, 11)];
      const current = new Card(1, 11);
      const [isValid, _] = isValidCombination(
        incoming,
        combinationConstants.DOUBLE,
        current,
        2
      );
      expect(isValid).toBeTruthy();
    });
  });

  describe('checks for double with same value, but worse suit than current', () => {
    test('jack of clubs does not beat jack of hearts', () => {
      const incoming: CardType[] = [new Card(0, 11), new Card(1, 11)];
      const current = new Card(3, 11);
      const [isValid, _] = isValidCombination(
        incoming,
        combinationConstants.DOUBLE,
        current,
        2
      );
      expect(isValid).toBeFalsy();
    });
  });

  describe('checks for invalid double by length', () => {
    test('combination of ten and jack returns false', () => {
      const incoming: CardType[] = [new Card(0, 10), new Card(1, 11)];
      const [isValid, _] = isValidCombination(incoming, null, null);
      expect(isValid).toBeFalsy();
    });
  });
});
