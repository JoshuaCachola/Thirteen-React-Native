export enum CardSuits {
  'heart',
  'diamond',
  'spade',
  'club',
}

export interface CardInterface {
  value: number;
  suit: CardSuits;
  staged: boolean;
}

export class Card implements CardInterface {
  suit: CardSuits;
  value: number;
  staged: boolean;

  constructor(suit: CardSuits, value: number) {
    this.suit = suit;
    this.value = value;
    this.staged = false;
  }
}
