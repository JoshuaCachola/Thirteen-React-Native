import { CardType } from './Card';

export interface PlayerInterface {
  setHand: (h: CardType[]) => void;
  setReady: (r: boolean) => void;
  getName: () => string;
  getHand: () => CardType[] | null;
  isReady: () => boolean;
}

export class Player implements PlayerInterface {
  name: string;
  hand: CardType[];
  ready: boolean;

  constructor(name: string, ready: boolean = false) {
    this.name = name;
    this.hand = [];
    this.ready = ready;
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
}
