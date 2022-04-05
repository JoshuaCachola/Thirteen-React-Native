import { describe, test, expect } from '@jest/globals';
import { CardType } from '../../classes/Card';
import { combinationConstants } from '../../constants/CombinationConstants';
import { isValidCombination } from '../../helper/combinationHelpers';

describe('four-of-a-kind bombs', () => {
  describe('checks for valid four-of-a-kind', () => {
    test('four nines returns true', () => {});
  });

  describe('checks for invalid four-of-a-kind', () => {
    test('three nines and a 10 returns false', () => {});
  });

  describe('checks for incoming four-of-a-kind beats current', () => {
    test('four nines beats four eights', () => {});
  });

  describe('checks for incoming four-of-a-kind does not beat current', () => {
    test('four nines does not beat four tens', () => {});
  });
});
