import { Card, CardInterface } from './Card';

const unShuffledDeck: CardInterface[] = [
  { value: 3, suit: 0 },
  { value: 3, suit: 1 },
  { value: 3, suit: 2 },
  { value: 3, suit: 3 },
  { value: 4, suit: 0 },
  { value: 4, suit: 1 },
  { value: 4, suit: 2 },
  { value: 4, suit: 3 },
  { value: 5, suit: 0 },
  { value: 5, suit: 1 },
  { value: 5, suit: 2 },
  { value: 5, suit: 3 },
  { value: 6, suit: 0 },
  { value: 6, suit: 1 },
  { value: 6, suit: 2 },
  { value: 6, suit: 3 },
  { value: 7, suit: 0 },
  { value: 7, suit: 1 },
  { value: 7, suit: 2 },
  { value: 7, suit: 3 },
  { value: 8, suit: 0 },
  { value: 8, suit: 1 },
  { value: 8, suit: 2 },
  { value: 8, suit: 3 },
  { value: 9, suit: 0 },
  { value: 9, suit: 1 },
  { value: 9, suit: 2 },
  { value: 9, suit: 3 },
  { value: 10, suit: 0 },
  { value: 10, suit: 1 },
  { value: 10, suit: 2 },
  { value: 10, suit: 3 },
  { value: 11, suit: 0 },
  { value: 11, suit: 1 },
  { value: 11, suit: 2 },
  { value: 11, suit: 3 },
  { value: 12, suit: 0 },
  { value: 12, suit: 1 },
  { value: 12, suit: 2 },
  { value: 12, suit: 3 },
  { value: 13, suit: 0 },
  { value: 13, suit: 1 },
  { value: 13, suit: 2 },
  { value: 13, suit: 3 },
  { value: 14, suit: 0 },
  { value: 14, suit: 1 },
  { value: 14, suit: 2 },
  { value: 14, suit: 3 },
  { value: 15, suit: 0 },
  { value: 15, suit: 1 },
  { value: 15, suit: 2 },
  { value: 15, suit: 3 },
];

export class Deck {
  deck: CardInterface[];
  constructor() {
    // this.deck = this.createDeck();
    this.deck = unShuffledDeck;
  }

  createDeck() {
    let deck: CardInterface[] = [];
    for (let i = 3; 3 <= 15; i++) {
      for (let j = 0; j < 4; j++) {
        deck.push(new Card(i, j));
      }
    }
    return deck;
  }

  shuffle() {}
}
