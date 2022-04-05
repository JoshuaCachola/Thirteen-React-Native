import { describe, test, expect, beforeAll } from '@jest/globals';
import { Card, CardType } from '../../classes/Card';
import { GameState, GameStateInterface } from '../../classes/GameState';
import { combinationConstants } from '../../constants/CombinationConstants';
import { isValidCombination } from '../../helper/combinationHelpers';

// Doubles
describe('double combinations', () => {
  describe('checks for valid double combination by value of card', () => {
    test('double fives beats double fours', () => {
      const incoming: CardType[] = [new Card(0, 5), new Card(1, 5)];
      const current = new Card(1, 4);
      expect(
        isValidCombination(incoming, combinationConstants.DOUBLE, current, 2)
      ).toBeTruthy();
    });
  });

  describe('checks for invalid double combination by value of card', () => {
    test('double sevens does not beat double jacks', () => {});
  });

  describe('checks for valid incoming double with same value, but better suit than current', () => {
    test('jack of diamonds beats jack of clubs', () => {});
  });

  describe('checks for double with same value, but worse suit than current', () => {
    test('jack of spades does not beat jack of hearts', () => {});
  });

  describe('checks for invalid double by length', () => {
    test('combination of ten and jack returns false', () => {});
  });
});
