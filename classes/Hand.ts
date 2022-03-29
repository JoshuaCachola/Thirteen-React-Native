import { action, computed, makeObservable, observable } from 'mobx';
import { sortCards } from '../helper/combinationHelpers';
import { CardType } from './Card';

export interface HandInterface {
  hand: CardType[];
  updateHand: (h: CardType[]) => void;
  sort: (h: CardType[]) => void;
}

export class Hand {
  _hand: CardType[];

  constructor() {
    this._hand = [];
    makeObservable(this, {
      _hand: observable,
      hand: computed,
      updateHand: action,
      sort: action,
    });
  }
  public get hand() {
    return this._hand;
  }

  public set hand(hand: CardType[]) {
    this._hand = hand;
  }

  public updateHand(hand: CardType[]) {
    this.hand = hand;
  }

  public sort() {
    this.hand = sortCards(this.hand);
  }
}
