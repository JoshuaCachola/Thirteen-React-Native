import { combinationConstants } from '../constants/CombinationConstants';
import { createHandMap } from '../helper/combinationHelpers';
import { CardType } from './Card';
import { ActionType, Combination } from './GameState';

export interface PlayerInterface {
  setReady: (r: boolean) => void;
  getName: () => string;
  play: (
    t: Combination,
    hi: CardType | null,
    h: CardType[],
    l: number
  ) => [ActionType, Set<number>];
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

  setReady() {
    this.ready = !this.ready;
  }

  isReady() {
    return this.ready;
  }

  getName() {
    return this.name;
  }

  play(
    t: Combination,
    high: CardType | null,
    hand: CardType[],
    length: number
  ): [ActionType, Set<number>] {
    let indicies: Set<number> = new Set();
    switch (t) {
      case null:
      case combinationConstants.SINGLE: {
        this.playLowest(high, hand, indicies);
        if (!indicies.has(-1)) {
          return [ActionType.PLAY, indicies];
        } else {
          return [ActionType.PASS, indicies];
        }
      }
      default:
        return [ActionType.PASS, indicies];
    }
  }

  playLowest(high: CardType | null, hand: CardType[], filterOut: Set<number>) {
    const handMap = createHandMap(hand);
    for (const [value, indicies] of Object.entries(handMap)) {
      if (high === null || parseInt(value) > high.value) {
        filterOut.add(indicies[0]);
        return;
      }
      if (parseInt(value) === high!.value) {
        for (let idx = 0; idx < indicies.length; idx++) {
          if (hand[idx].suit > high!.suit) {
            filterOut.add(idx);
            return;
          }
        }
      }
    }
    filterOut.add(-1);
  }
}
