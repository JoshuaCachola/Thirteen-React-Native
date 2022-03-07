import { CardInterface } from './Card';

export class Player {
  name: string;
  hand: CardInterface[] | null;
  ready: boolean;

  constructor(name: string) {
    this.name = name;
    this.hand = null;
    this.ready = false;
  }

  setHand(hand: CardInterface[]) {
    this.hand = hand;
  }
}
