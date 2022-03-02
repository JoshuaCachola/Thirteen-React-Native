import { describe, test, expect } from '@jest/globals';
import { Card, CardInterface } from '../../classes/Card';
import { combinationConstants } from '../../constants/CombinationConstants';
import { isValidCombination } from '../../helper/combinationHelpers';

describe('bombs', () => {
  describe('bomb beats a "TWO"', () => {
    test('four-of-a-kind bomb returns true', () => {
      const incoming: CardInterface[] = [
        { value: 4, suit: 0, selected: true, played: false },
        { value: 4, suit: 1, selected: true, played: false },
        { value: 4, suit: 2, selected: true, played: false },
        { value: 4, suit: 3, selected: true, played: false },
      ];
      const current: CardInterface = {
        value: 2,
        suit: 0,
        selected: true,
        played: false,
      };

      expect(
        isValidCombination(incoming, current, combinationConstants.BOMB)
      ).toBeTruthy();
    });
  });
  describe('bomb beats a "TWO"', () => {
    test('three consecutive pair bomb returns true', () => {
      const incoming: CardInterface[] = [
        { value: 4, suit: 0, selected: true, played: false },
        { value: 4, suit: 1, selected: true, played: false },
        { value: 5, suit: 2, selected: true, played: false },
        { value: 5, suit: 3, selected: true, played: false },
        { value: 6, suit: 2, selected: true, played: false },
        { value: 6, suit: 3, selected: true, played: false },
      ];
      const current: CardInterface = {
        value: 2,
        suit: 0,
        selected: true,
        played: false,
      };

      expect(
        isValidCombination(incoming, current, combinationConstants.BOMB)
      ).toBeTruthy();
    });
  });
});
