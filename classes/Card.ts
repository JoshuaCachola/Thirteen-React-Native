export enum CardSuits {
  'HEART',
  'DIAMOND',
  'SPADE',
  'CLUB',
}

export interface CardInterface {
  value: number;
  suit: CardSuits;
  selected: boolean;
}

export class Card implements CardInterface {
  suit: CardSuits;
  value: number;
  selected: boolean;

  constructor(suit: CardSuits, value: number) {
    this.suit = suit;
    this.value = value;
    this.selected = false;
  }
}
