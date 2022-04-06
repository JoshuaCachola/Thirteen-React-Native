import { action, computed, makeObservable, observable } from 'mobx';
import { Hand, HandInterface } from './Hand';

export interface PlayerInterface {
  readonly _name: string;
  ready: boolean;
  playerHand: HandInterface;
  clearHand: () => void;
  name: string;
}

export class Player implements PlayerInterface {
  readonly _name: string;
  playerHand: HandInterface;
  _ready: boolean;
  // _avatar: string;

  constructor(name: string, ready: boolean) {
    this._name = name;
    this.playerHand = new Hand();
    this._ready = ready;
    // this._avatar = '';
    makeObservable(this, {
      playerHand: observable,
      _ready: observable,
      ready: computed,
      clearHand: action,
    });
  }

  public get name() {
    return this._name;
  }

  public set ready(ready: boolean) {
    this._ready = ready;
  }

  public get ready() {
    return this._ready;
  }

  public clearHand() {
    this.playerHand = new Hand();
  }
}
