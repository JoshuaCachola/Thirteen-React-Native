import { describe, test, expect, beforeAll } from '@jest/globals';
import { CardType } from '../../classes/Card';
import { Game } from '../../classes/Game';
import { GameState, GameStateInterface } from '../../classes/GameState';
import { combinationConstants } from '../../constants/CombinationConstants';
import { isValidCombination } from '../../helper/combinationHelpers';

let game: GameStateInterface;

beforeAll(() => {
  game = new GameState('test');
});

describe('straights', () => {
  describe('card combination of 2 cards does not create a straight', () => {
    test('3 to 4 straight returns false', () => {
      const incoming: CardType[] = [
        { value: 3, suit: 0, selected: true, played: false },
        { value: 4, suit: 0, selected: true, played: false },
      ];
      expect(isValidCombination(incoming, game)).toBeFalsy();
    });
  });

  describe('card combination of 7 cards creates a straight', () => {
    test('3 to 9 straight returns true', () => {
      const incoming: CardType[] = [
        { value: 3, suit: 0, selected: true, played: false },
        { value: 4, suit: 0, selected: true, played: false },
        { value: 5, suit: 0, selected: true, played: false },
        { value: 6, suit: 0, selected: true, played: false },
        { value: 7, suit: 0, selected: true, played: false },
        { value: 8, suit: 0, selected: true, played: false },
        { value: 9, suit: 0, selected: true, played: false },
      ];
      expect(isValidCombination(incoming, game)).toBeTruthy();
    });
  });

  describe('card combination of 3 cards does not create a straight', () => {
    test('3 to 6 straight returns true', () => {
      const incoming: CardType[] = [
        { value: 3, suit: 0, selected: true, played: false },
        { value: 4, suit: 0, selected: true, played: false },
        { value: 6, suit: 0, selected: true, played: false },
      ];
      expect(isValidCombination(incoming, game)).toBeFalsy();
    });
  });

  describe('card combination of triple does not satisfy a straight', () => {
    game.setCombinationType('STRAIGHT');
    game.setLength(3);
    test('triple sevens returns false', () => {
      const incoming: CardType[] = [
        { value: 7, suit: 0, selected: true, played: false },
        { value: 7, suit: 1, selected: true, played: false },
        { value: 7, suit: 2, selected: true, played: false },
      ];
      expect(isValidCombination(incoming, game)).toBeFalsy();
    });
  });

  describe('three card straight with a "TWO" does not satisfy a straight', () => {
    test('king, ace, two straight returns false', () => {
      const incoming: CardType[] = [
        { value: 13, suit: 0, selected: true, played: false },
        { value: 14, suit: 1, selected: true, played: false },
        { value: 15, suit: 2, selected: true, played: false },
      ];
      expect(isValidCombination(incoming, game)).toBeFalsy();
    });
  });

  describe('incoming straight beats current', () => {
    test('7 to 9 straight beats a 6 high straight', () => {
      const incoming: CardType[] = [
        { value: 7, suit: 0, selected: true, played: false },
        { value: 8, suit: 1, selected: true, played: false },
        { value: 9, suit: 2, selected: true, played: false },
      ];
      expect(isValidCombination(incoming, game)).toBeTruthy();
    });

    describe('incoming straight does not beat current', () => {
      test('7 to 9 straight does not beat a 9 high straight with a higher suit', () => {
        const incoming: CardType[] = [
          { value: 7, suit: 0, selected: true, played: false },
          { value: 8, suit: 1, selected: true, played: false },
          { value: 9, suit: 2, selected: true, played: false },
        ];
        expect(isValidCombination(incoming, game)).toBeFalsy();
      });
    });
  });
});
