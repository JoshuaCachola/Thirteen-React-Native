import { describe, test, expect } from '@jest/globals';
import { CardInterface } from '../../classes/Card';
import { combinationConstants } from '../../constants/CombinationConstants';
import { isValidCombination } from '../../helper/combinationHelpers';

describe('four-of-a-kind bombs', () => {
  describe('checks for valid four-of-a-kind', () => {
    test('four nines returns true', () => {
      const incoming: CardInterface[] = [
        { value: 9, suit: 0, selected: true, played: false },
        { value: 9, suit: 1, selected: true, played: false },
        { value: 9, suit: 2, selected: true, played: false },
        { value: 9, suit: 3, selected: true, played: false },
      ];
      expect(isValidCombination(incoming)).toBeTruthy();
    });
  });

  describe('checks for invalid four-of-a-kind', () => {
    test('three nines and a 10 returns false', () => {
      const incoming: CardInterface[] = [
        { value: 9, suit: 0, selected: true, played: false },
        { value: 9, suit: 1, selected: true, played: false },
        { value: 9, suit: 2, selected: true, played: false },
        { value: 10, suit: 3, selected: true, played: false },
      ];
      expect(isValidCombination(incoming)).toBeFalsy();
    });
  });

  describe('checks for incoming four-of-a-kind beats current', () => {
    test('four nines beats four eights', () => {
      const incoming: CardInterface[] = [
        { value: 9, suit: 0, selected: true, played: false },
        { value: 9, suit: 1, selected: true, played: false },
        { value: 9, suit: 2, selected: true, played: false },
        { value: 9, suit: 3, selected: true, played: false },
      ];
      const current: CardInterface = {
        value: 8,
        suit: 3,
        selected: true,
        played: false,
      };
      expect(
        isValidCombination(incoming, current, combinationConstants.BOMB)
      ).toBeTruthy();
    });
  });

  describe('checks for incoming four-of-a-kind does not beat current', () => {
    test('four nines does not beat four tens', () => {
      const incoming: CardInterface[] = [
        { value: 9, suit: 0, selected: true, played: false },
        { value: 9, suit: 1, selected: true, played: false },
        { value: 9, suit: 2, selected: true, played: false },
        { value: 9, suit: 3, selected: true, played: false },
      ];
      const current: CardInterface = {
        value: 10,
        suit: 3,
        selected: true,
        played: false,
      };
      expect(
        isValidCombination(incoming, current, combinationConstants.BOMB)
      ).toBeFalsy();
    });
  });
});
