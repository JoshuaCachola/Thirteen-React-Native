import { combinationConstants } from '../constants/CombinationConstants';
import { createHandMap } from '../helper/combinationHelpers';
import { CardType } from './Card';
import { Combination, pass, playCards } from './GameState';

export interface PlayerInterface {
  setReady: (r: boolean) => void;
  getName: () => string;
  play: (t: Combination, hi: CardType | null, h: CardType[]) => void;
}

// 0 for human
// 1 for computer
export enum PlayerType {
  HUMAN,
  COMPUTER,
}

export class Player implements PlayerInterface {
  name: string;
  hand: CardType[];
  ready: boolean;
  type: PlayerType;

  constructor(name: string, ready: boolean, type: PlayerType) {
    this.name = name;
    this.hand = [];
    this.ready = ready;
    this.type = type;
  }

  setHand(hand: CardType[]) {
    this.hand = hand;
  }

  setReady() {
    this.ready = !this.ready;
  }

  isReady() {
    return this.ready;
  }

  getName() {
    return this.name;
  }

  getHand() {
    return this.hand;
  }

  play(t: Combination, high: CardType | null, hand: CardType[]) {
    switch (t) {
      case null:
      case combinationConstants.SINGLE: {
        const indicies: Set<number> = this.playLowest(high!);
        if (!indicies.has(-1)) {
          this.updateCards(indicies);
          playCards(hand, t);
        } else {
          pass();
        }
      }
    }
  }

  playLowest(high: CardType) {
    const handMap = createHandMap(this.hand);
    const filterOut: Set<number> = new Set();
    for (const [value, indicies] of Object.entries(handMap)) {
      if (high === null || parseInt(value) > high.value) {
        filterOut.add(indicies[0]);
        return filterOut;
      }
      if (parseInt(value) === high.value) {
        for (let idx = 0; idx < indicies.length; idx++) {
          if (this.hand![idx].suit > high.suit) {
            filterOut.add(idx);
            return filterOut;
          }
        }
      }
    }
    filterOut.add(-1);
    return filterOut;
  }

  updateCards(indicies: Set<number>) {
    const filtered = this.hand?.filter((_, idx) => !indicies.has(idx));
    this.setHand(filtered!);
  }
}
