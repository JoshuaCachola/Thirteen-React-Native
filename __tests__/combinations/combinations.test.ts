import { describe, test, expect } from '@jest/globals';
import { CardInterface } from '../../classes/Card';
import { combinationConstants } from '../../constants/CombinationConstants';
import { isValidCombination } from '../../helper/combinationHelpers';

describe('checks for valid card combinations', () => {
  describe('checks for valid double combination by value of card', () => {
    test('double fives beats double fours', () => {
      const current: CardInterface[] = [
        { value: 4, suit: 0, selected: true, played: false },
        { value: 4, suit: 1, selected: true, played: false },
      ];
      const incoming: CardInterface[] = [
        { value: 5, suit: 0, selected: true, played: false },
        { value: 5, suit: 1, selected: true, played: false },
      ];
      expect(
        isValidCombination(combinationConstants.DOUBLE, incoming, current)
      ).toBeTruthy();
    });
  });

  describe('checks for invalid double combination by value of card', () => {
    test('double sevens does not beat double jacks', () => {
      const current: CardInterface[] = [
        { value: 11, suit: 0, selected: true, played: false },
        { value: 11, suit: 1, selected: true, played: false },
      ];
      const incoming: CardInterface[] = [
        { value: 7, suit: 0, selected: true, played: false },
        { value: 7, suit: 1, selected: true, played: false },
      ];
      expect(
        isValidCombination(combinationConstants.DOUBLE, incoming, current)
      ).toBeFalsy();
    });
  });

  describe('checks for valid triple combination by value of card', () => {
    test('triple fives beat triple fours', () => {
      const current: CardInterface[] = [
        { value: 4, suit: 0, selected: true, played: false },
        { value: 4, suit: 1, selected: true, played: false },
        { value: 4, suit: 2, selected: true, played: false },
      ];
      const incoming: CardInterface[] = [
        { value: 5, suit: 0, selected: true, played: false },
        { value: 5, suit: 1, selected: true, played: false },
        { value: 5, suit: 2, selected: true, played: false },
      ];
      expect(
        isValidCombination(combinationConstants.TRIPLE, incoming, current)
      ).toBeTruthy();
    });
  });

  describe('checks for invalid triple combinations by value of card', () => {
    test('triple fours does not beat triple fives', () => {
      const incoming: CardInterface[] = [
        { value: 4, suit: 0, selected: true, played: false },
        { value: 4, suit: 1, selected: true, played: false },
        { value: 4, suit: 2, selected: true, played: false },
      ];
      const current: CardInterface[] = [
        { value: 5, suit: 0, selected: true, played: false },
        { value: 5, suit: 1, selected: true, played: false },
        { value: 5, suit: 2, selected: true, played: false },
      ];
      expect(
        isValidCombination(combinationConstants.TRIPLE, incoming, current)
      ).toBeFalsy();
    });
  });

  describe('checks for', () => {
    test('triple fours does not beat triple fives', () => {
      const incoming: CardInterface[] = [
        { value: 4, suit: 0, selected: true, played: false },
        { value: 4, suit: 1, selected: true, played: false },
        { value: 4, suit: 2, selected: true, played: false },
      ];
      const current: CardInterface[] = [
        { value: 5, suit: 0, selected: true, played: false },
        { value: 5, suit: 1, selected: true, played: false },
        { value: 5, suit: 2, selected: true, played: false },
      ];
      expect(
        isValidCombination(combinationConstants.TRIPLE, incoming, current)
      ).toBeFalsy();
    });
  });
});
