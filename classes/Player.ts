import { CardInterface } from './Card';

export interface PlayerActions {
  setHand: (h: CardInterface[]) => void;
  setReady: (r: boolean) => void;
  getName: () => string;
  getHand: () => CardInterface[] | null;
}

export class Player implements PlayerActions {
  name: string;
  hand: CardInterface[] | null;
  ready: boolean;

  constructor(name: string, ready: boolean = false) {
    this.name = name;
    this.hand = null;
    this.ready = ready;
  }

  setHand(hand: CardInterface[]) {
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
