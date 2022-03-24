import { describe, test, expect } from '@jest/globals';
import { CardType } from '../../classes/Card';
import { combinationConstants } from '../../constants/CombinationConstants';
import { isValidCombination } from '../../helper/combinationHelpers';

// triples
describe('triple combinations', () => {
  describe('checks for valid triple combination by value of card', () => {
    test('triple fives beat triple fours', () => {
      const current: CardType = {
        value: 4,
        suit: 0,
        selected: true,
        played: false,
      };
      const incoming: CardType[] = [
        { value: 5, suit: 0, selected: true, played: false },
        { value: 5, suit: 1, selected: true, played: false },
        { value: 5, suit: 2, selected: true, played: false },
      ];
      expect(
        isValidCombination(incoming, current, combinationConstants.TRIPLE)
      ).toBeTruthy();
    });
  });

  describe('checks for invalid triple combinations by value of card', () => {
    test('triple fours does not beat triple fives', () => {
      const incoming: CardType[] = [
        { value: 4, suit: 0, selected: true, played: false },
        { value: 4, suit: 1, selected: true, played: false },
        { value: 4, suit: 2, selected: true, played: false },
      ];
      const current: CardType = {
        value: 5,
        suit: 0,
        selected: true,
        played: false,
      };
      expect(
        isValidCombination(incoming, current, combinationConstants.TRIPLE)
      ).toBeFalsy();
    });
  });

  describe('checks for ', () => {
    test('triple fours does not beat triple fives', () => {
      const incoming: CardType[] = [
        { value: 4, suit: 0, selected: true, played: false },
        { value: 4, suit: 1, selected: true, played: false },
        { value: 4, suit: 2, selected: true, played: false },
      ];
      const current: CardType = {
        value: 5,
        suit: 0,
        selected: true,
        played: false,
      };
      expect(
        isValidCombination(incoming, current, combinationConstants.TRIPLE)
      ).toBeFalsy();
    });
  });

  describe('checks for triple with invalid triple', () => {
    test('2 fours and 1 five returns false', () => {
      const incoming: CardType[] = [
        { value: 4, suit: 0, selected: true, played: false },
        { value: 4, suit: 1, selected: true, played: false },
        { value: 5, suit: 2, selected: true, played: false },
      ];
      expect(isValidCombination(incoming)).toBeFalsy();
    });
  });
});
