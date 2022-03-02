import { createObj } from '../helper/combinationHelpers';
import { CardInterface } from './Card';

export class Computer {
  hand: CardInterface[];

  constructor(hand: CardInterface[]) {
    this.hand = hand;
  }

  play(type?: string) {
    if (!type) {
      this.playLowest();
    }
  }

  playLowest() {}
}
