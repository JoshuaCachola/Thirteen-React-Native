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
  played: boolean;
}

export class Card implements CardInterface {
  suit: CardSuits;
  value: number;
  selected: boolean;
  played: boolean;

  constructor(suit: CardSuits, value: number) {
    this.suit = suit;
    this.value = value;
    this.selected = false;
    this.played = false;
  }
}
