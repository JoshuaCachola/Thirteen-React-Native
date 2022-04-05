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
    test('3 to 4 straight returns false', () => {});
  });

  describe('card combination of 7 cards creates a straight', () => {
    test('3 to 9 straight returns true', () => {});
  });

  describe('card combination of 3 cards does not create a straight', () => {
    test('3 to 6 straight returns true', () => {});
  });

  describe('card combination of triple does not satisfy a straight', () => {
    test('triple sevens returns false', () => {});
  });

  describe('three card straight with a "TWO" does not satisfy a straight', () => {
    test('king, ace, two straight returns false', () => {});
  });

  describe('incoming straight beats current', () => {
    test('7 to 9 straight beats a 6 high straight', () => {});
  });

  describe('incoming straight does not beat current', () => {
    test('7 to 9 straight does not beat a 9 high straight with a higher suit', () => {});
  });
});
