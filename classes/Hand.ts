import { CardInterface } from './Card';
import { combinationConstants } from '../constants/CombinationConstants';
import {
  isIncomingHigherValue,
  isValidBomb,
  isValidSingle,
  isValidStraight,
} from '../helper/combinationHelpers';

type combinationTypes =
  | 'SINGLE'
  | 'DOUBLE'
  | 'TRIPLE'
  | 'STRAIGHT'
  | 'BOMB!'
  | 'BOMB!!'
  | null;

export class Hand {
  hand: CardInterface[];

  constructor(hand: CardInterface[]) {
    this.hand = hand;
  }

  checkCombinationByCardLength(card: CardInterface[]) {}

  // - checks if incoming card combination beats the current
  // card combination
  // - if there type === null, the playing can play any valid
  // card combination which we check by the length of the
  // incoming card combination
  isValidCombination(
    type: combinationTypes,
    incoming: CardInterface[],
    current?: CardInterface[]
  ) {
    if (!type) {
      this.checkCombinationByCardLength(incoming);
    }
    switch (type) {
      case combinationConstants.SINGLE:
        return isValidSingle(current!, incoming);
      case combinationConstants.DOUBLE:
        return isIncomingHigherValue(current!, incoming);
      case combinationConstants.TRIPLE:
        return isIncomingHigherValue(current!, incoming);
      case combinationConstants.STRAIGHT:
        return isValidStraight(current!, incoming);
      case combinationConstants.BOMB:
        return isValidBomb(current!, incoming);
    }
  }

  addCard(card: CardInterface) {
    this.hand.push(card);
  }
}
