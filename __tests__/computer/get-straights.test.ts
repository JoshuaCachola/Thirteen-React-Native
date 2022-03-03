import { describe, test, expect } from '@jest/globals';
import { CardInterface } from '../../classes/Card';
import { getStraights } from '../../helper/combinationHelpers';

describe('get straights', () => {
  describe('get an array of array with straights of length 3', () => {
    test('hand returns an array with two straights', () => {
      const hand: CardInterface[] = [
        { value: 3, suit: 0, selected: false, played: false },
        { value: 4, suit: 0, selected: false, played: false },
        { value: 5, suit: 0, selected: false, played: false },
        { value: 11, suit: 0, selected: false, played: false },
        { value: 12, suit: 0, selected: false, played: false },
        { value: 13, suit: 0, selected: false, played: false },
      ];
      expect(getStraights(hand, 3)).toEqual([
        [0, 1, 2],
        [3, 4, 5],
      ]);
    });
  });

  describe('get an array of array with straights of length 3', () => {
    test('hand returns an array with two straights', () => {
      const hand: CardInterface[] = [
        { value: 11, suit: 1, selected: false, played: false },
        { value: 12, suit: 2, selected: false, played: false },
        { value: 13, suit: 3, selected: false, played: false },
        { value: 11, suit: 0, selected: false, played: false },
        { value: 12, suit: 0, selected: false, played: false },
        { value: 13, suit: 0, selected: false, played: false },
      ];
      expect(getStraights(hand, 3)).toEqual([
        [3, 4, 5],
        [0, 1, 2],
      ]);
    });
  });
});
