import { CardType } from './Card';
import { ActionType, Combination } from './GameState';

export interface PlayerInterface {
  setReady: (r: boolean) => void;
  getName: () => string;
}

export type ActionPayload = {
  action: ActionType;
  type: Combination;
  played: CardType[];
  newHand: CardType[];
};

export class Player implements PlayerInterface {
  name: string;
  hand: CardType[];
  ready: boolean;

  constructor(name: string, ready: boolean) {
    this.name = name;
    this.hand = [];
    this.ready = ready;
  }

  public setReady() {
    this.ready = !this.ready;
  }

  public isReady() {
    return this.ready;
  }

  public getName() {
    return this.name;
  }
}
