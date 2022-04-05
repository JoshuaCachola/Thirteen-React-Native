import { describe, test, expect } from '@jest/globals';
import { CardType } from '../../classes/Card';
import { combinationConstants } from '../../constants/CombinationConstants';
import { isValidCombination } from '../../helper/combinationHelpers';

// triples
describe('triple combinations', () => {
  describe('checks for valid triple combination by value of card', () => {
    test('triple fives beat triple fours', () => {});
  });

  describe('checks for invalid triple combinations by value of card', () => {
    test('triple fours does not beat triple fives', () => {});
  });

  describe('checks for ', () => {
    test('triple fours does not beat triple fives', () => {});
  });

  describe('checks for triple with invalid triple', () => {
    test('2 fours and 1 five returns false', () => {});
  });
});
