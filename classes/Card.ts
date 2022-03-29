import { action, computed, makeObservable, observable } from 'mobx';

export enum CardSuits {
  'SPADE',
  'CLUB',
  'DIAMOND',
  'HEART',
}

export type CardType = {
  suit: CardSuits;
  value: number;
  selected: boolean;
  handleSelected: () => void;
};

export class Card {
  readonly suit: CardSuits;
  readonly value: number;
  _selected: boolean;

  constructor(suit: CardSuits, value: number) {
    this.suit = suit;
    this.value = value;
    this._selected = false;
    makeObservable(this, {
      _selected: observable,
      selected: computed,
      handleSelected: action,
    });
  }

  public get selected() {
    return this._selected;
  }

  public set selected(selected: boolean) {
    this._selected = selected;
  }

  public handleSelected() {
    this.selected = !this.selected;
  }
}
