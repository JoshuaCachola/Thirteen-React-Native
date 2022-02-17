export enum CardSuits {
  'heart',
  'diamond',
  'spade',
  'club',
}

export interface CardInterface {
  value: number;
  suit: CardSuits;
}

export class Card implements CardInterface {
  suit: CardSuits;
  value: number;
  constructor(suit: CardSuits, value: number) {
    this.suit = suit;
    this.value = value;
  }
}
