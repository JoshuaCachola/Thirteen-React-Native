import { describe, test, expect } from '@jest/globals';
import { CardInterface } from '../../classes/Card';
import { combinationConstants } from '../../constants/CombinationConstants';
import { isValidCombination } from '../../helper/combinationHelpers';

// Doubles
describe('double combinations', () => {
  describe('checks for valid double combination by value of card', () => {
    test('double fives beats double fours', () => {
      const current: CardInterface = {
        value: 4,
        suit: 0,
        selected: true,
        played: false,
      };
      const incoming: CardInterface[] = [
        { value: 5, suit: 0, selected: true, played: false },
        { value: 5, suit: 1, selected: true, played: false },
      ];
      expect(
        isValidCombination(incoming, current, combinationConstants.DOUBLE)
      ).toBeTruthy();
    });
  });

  describe('checks for invalid double combination by value of card', () => {
    test('double sevens does not beat double jacks', () => {
      const current: CardInterface = {
        value: 11,
        suit: 0,
        selected: true,
        played: false,
      };
      const incoming: CardInterface[] = [
        { value: 7, suit: 0, selected: true, played: false },
        { value: 7, suit: 1, selected: true, played: false },
      ];
      expect(
        isValidCombination(incoming, current, combinationConstants.DOUBLE)
      ).toBeFalsy();
    });
  });

  describe('checks for valid incoming double with same value, but better suit than current', () => {
    test('jack of diamonds beats jack of clubs', () => {
      const incoming: CardInterface[] = [
        { value: 11, suit: 3, selected: true, played: false },
        { value: 11, suit: 1, selected: true, played: false },
      ];
      const current: CardInterface = {
        value: 11,
        suit: 0,
        selected: true,
        played: false,
      };
      expect(
        isValidCombination(incoming, current, combinationConstants.DOUBLE)
      ).toBeTruthy();
    });
  });

  describe('checks for double with same value, but worse suit than current', () => {
    test('jack of spades does not beat jack of hearts', () => {
      const incoming: CardInterface[] = [
        { value: 11, suit: 0, selected: true, played: false },
        { value: 11, suit: 1, selected: true, played: false },
      ];
      const current: CardInterface = {
        value: 11,
        suit: 4,
        selected: true,
        played: false,
      };
      expect(
        isValidCombination(incoming, current, combinationConstants.DOUBLE)
      ).toBeFalsy();
    });
  });

  describe('checks for invalid double by length', () => {
    test('combination of ten and jack returns false', () => {
      const incoming: CardInterface[] = [
        { value: 11, suit: 3, selected: true, played: false },
        { value: 10, suit: 1, selected: true, played: false },
      ];
      expect(isValidCombination(incoming)).toBeFalsy();
    });
  });
});
