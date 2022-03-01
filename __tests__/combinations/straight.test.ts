import { describe, test, expect } from '@jest/globals';
import { CardInterface } from '../../classes/Card';
import { combinationConstants } from '../../constants/CombinationConstants';
import { isValidCombination } from '../../helper/combinationHelpers';

describe('straights', () => {
  describe('card combination of 2 cards does not create a straight', () => {
    test('3 to 4 straight returns false', () => {
      const incoming: CardInterface[] = [
        { value: 3, suit: 0, selected: true, played: false },
        { value: 4, suit: 0, selected: true, played: false },
      ];
      expect(isValidCombination(incoming)).toBeFalsy();
    });
  });

  describe('card combination of 7 cards creates a straight', () => {
    test('3 to 9 straight returns true', () => {
      const incoming: CardInterface[] = [
        { value: 3, suit: 0, selected: true, played: false },
        { value: 4, suit: 0, selected: true, played: false },
        { value: 5, suit: 0, selected: true, played: false },
        { value: 6, suit: 0, selected: true, played: false },
        { value: 7, suit: 0, selected: true, played: false },
        { value: 8, suit: 0, selected: true, played: false },
        { value: 9, suit: 0, selected: true, played: false },
      ];
      expect(isValidCombination(incoming)).toBeTruthy();
    });
  });

  describe('card combination of 3 cards does not create a straight', () => {
    test('3 to 6 straight returns true', () => {
      const incoming: CardInterface[] = [
        { value: 3, suit: 0, selected: true, played: false },
        { value: 4, suit: 0, selected: true, played: false },
        { value: 6, suit: 0, selected: true, played: false },
      ];
      expect(isValidCombination(incoming)).toBeFalsy();
    });
  });

  describe('card combination of triple does not satisfy a straight', () => {
    test('triple sevens returns false', () => {
      const incoming: CardInterface[] = [
        { value: 7, suit: 0, selected: true, played: false },
        { value: 7, suit: 1, selected: true, played: false },
        { value: 7, suit: 2, selected: true, played: false },
      ];
      const current: CardInterface = {
        value: 7,
        suit: 2,
        selected: true,
        played: false,
      };
      expect(
        isValidCombination(incoming, current, combinationConstants.STRAIGHT)
      ).toBeFalsy();
    });
  });

  describe('three card straight with a "TWO" does not satisfy a straight', () => {
    test('king, ace, two straight returns false', () => {
      const incoming: CardInterface[] = [
        { value: 13, suit: 0, selected: true, played: false },
        { value: 14, suit: 1, selected: true, played: false },
        { value: 15, suit: 2, selected: true, played: false },
      ];
      expect(isValidCombination(incoming)).toBeFalsy();
    });
  });

  describe('incoming straight beats current', () => {
    test('7 to 9 straight beats a 6 high straight', () => {
      const incoming: CardInterface[] = [
        { value: 7, suit: 0, selected: true, played: false },
        { value: 8, suit: 1, selected: true, played: false },
        { value: 9, suit: 2, selected: true, played: false },
      ];
      const current: CardInterface = {
        value: 6,
        suit: 2,
        selected: true,
        played: false,
      };
      expect(
        isValidCombination(incoming, current, combinationConstants.STRAIGHT)
      ).toBeTruthy();
    });

    describe('incoming straight does not beat current', () => {
      test('7 to 9 straight does not beat a 9 high straight with a higher suit', () => {
        const incoming: CardInterface[] = [
          { value: 7, suit: 0, selected: true, played: false },
          { value: 8, suit: 1, selected: true, played: false },
          { value: 9, suit: 2, selected: true, played: false },
        ];
        const current: CardInterface = {
          value: 9,
          suit: 3,
          selected: true,
          played: false,
        };
        expect(
          isValidCombination(incoming, current, combinationConstants.STRAIGHT)
        ).toBeFalsy();
      });
    });
  });
});
