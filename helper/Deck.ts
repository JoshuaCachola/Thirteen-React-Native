import { Card, CardInterface } from './Card';

const unShuffledDeck: CardInterface[] = [
  { value: 3, suit: 0, staged: true },
  { value: 3, suit: 1, staged: true },
  { value: 3, suit: 2, staged: false },
  { value: 3, suit: 3, staged: false },
  { value: 4, suit: 0, staged: false },
  { value: 4, suit: 1, staged: false },
  { value: 4, suit: 2, staged: false },
  { value: 4, suit: 3, staged: false },
  { value: 5, suit: 0, staged: false },
  { value: 5, suit: 1, staged: false },
  { value: 5, suit: 2, staged: false },
  { value: 5, suit: 3, staged: false },
  { value: 6, suit: 0, staged: false },
  { value: 6, suit: 1, staged: false },
  { value: 6, suit: 2, staged: false },
  { value: 6, suit: 3, staged: false },
  { value: 7, suit: 0, staged: false },
  { value: 7, suit: 1, staged: false },
  { value: 7, suit: 2, staged: false },
  { value: 7, suit: 3, staged: false },
  { value: 8, suit: 0, staged: false },
  { value: 8, suit: 1, staged: false },
  { value: 8, suit: 2, staged: false },
  { value: 8, suit: 3, staged: false },
  { value: 9, suit: 0, staged: false },
  { value: 9, suit: 1, staged: false },
  { value: 9, suit: 2, staged: false },
  { value: 9, suit: 3, staged: false },
  { value: 10, suit: 0, staged: false },
  { value: 10, suit: 1, staged: false },
  { value: 10, suit: 2, staged: false },
  { value: 10, suit: 3, staged: false },
  { value: 11, suit: 0, staged: false },
  { value: 11, suit: 1, staged: false },
  { value: 11, suit: 2, staged: false },
  { value: 11, suit: 3, staged: false },
  { value: 12, suit: 0, staged: false },
  { value: 12, suit: 1, staged: false },
  { value: 12, suit: 2, staged: false },
  { value: 12, suit: 3, staged: false },
  { value: 13, suit: 0, staged: false },
  { value: 13, suit: 1, staged: false },
  { value: 13, suit: 2, staged: false },
  { value: 13, suit: 3, staged: false },
  { value: 14, suit: 0, staged: false },
  { value: 14, suit: 1, staged: false },
  { value: 14, suit: 2, staged: false },
  { value: 14, suit: 3, staged: false },
  { value: 15, suit: 0, staged: false },
  { value: 15, suit: 1, staged: false },
  { value: 15, suit: 2, staged: false },
  { value: 15, suit: 3, staged: false },
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
