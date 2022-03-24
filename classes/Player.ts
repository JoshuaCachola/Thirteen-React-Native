import { CardType } from './Card';

export interface PlayerInterface {
  setHand: (h: CardType[]) => void;
  setReady: (r: boolean) => void;
  getName: () => string;
  getHand: () => CardType[] | null;
}

export class Player implements PlayerInterface {
  name: string;
  hand: CardType[] | null;
  ready: boolean;

  constructor(name: string, ready: boolean = false) {
    this.name = name;
    this.hand = null;
    this.ready = ready;
  }

  setHand(hand: CardType[]) {
    this.hand = hand;
  }

  setReady(ready: boolean) {
    this.ready = ready;
  }

  getName() {
    return this.name;
  }

  getHand() {
    return this.hand;
  }
}
