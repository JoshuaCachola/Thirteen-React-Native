import { computed, makeObservable, observable } from 'mobx';
import { Hand, HandInterface } from './Hand';

export interface PlayerInterface {
  readonly _name: string;
  ready: boolean;
  playerHand: HandInterface;
}

export class Player implements PlayerInterface {
  readonly _name: string;
  playerHand: HandInterface;
  _ready: boolean;

  constructor(name: string, ready: boolean) {
    this._name = name;
    this.playerHand = new Hand();
    this._ready = ready;
    makeObservable(this, {
      playerHand: observable,
      _ready: observable,
      ready: computed,
    });
  }

  public set ready(ready: boolean) {
    this._ready = ready;
  }

  public get ready() {
    return this._ready;
  }
}
