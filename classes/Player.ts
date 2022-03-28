import { computed, makeObservable, observable } from 'mobx';
import { CardType } from './Card';
import { ActionType, Combination } from './GameState';

export type ActionPayload = {
  action: ActionType;
  type: Combination;
  played: CardType[];
  newHand: CardType[];
};

export interface PlayerInterface {
  readonly _name: string;
  ready: boolean;
  hand: CardType[];
  play: () => void;
}

export class Player implements PlayerInterface {
  readonly _name: string;
  _hand: CardType[];
  _ready: boolean;

  constructor(name: string, ready: boolean) {
    this._name = name;
    this._hand = [];
    this._ready = ready;
    makeObservable(this, {
      _hand: observable,
      _ready: observable,
      hand: computed,
      ready: computed,
    });
  }

  public set ready(ready: boolean) {
    this._ready = ready;
  }

  public get ready() {
    return this._ready;
  }

  public get hand() {
    return this._hand;
  }

  public set hand(hand: CardType[]) {
    this._hand = hand;
  }

  public play() {}
}
