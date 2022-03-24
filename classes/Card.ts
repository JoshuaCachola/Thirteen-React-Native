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
};

export class Card {
  suit: CardSuits;
  value: number;
  selected: boolean;

  constructor(suit: CardSuits, value: number) {
    this.suit = suit;
    this.value = value;
    this.selected = false;
  }
}
