import { CardInterface } from './Card';

const unShuffledDeck: CardInterface[] = [
  { value: 3, suit: 0, selected: false, played: false },
  { value: 3, suit: 1, selected: false, played: false },
  { value: 3, suit: 2, selected: false, played: false },
  { value: 3, suit: 3, selected: false, played: false },
  { value: 4, suit: 0, selected: false, played: false },
  { value: 4, suit: 1, selected: false, played: false },
  { value: 4, suit: 2, selected: false, played: false },
  { value: 4, suit: 3, selected: false, played: false },
  { value: 5, suit: 0, selected: false, played: false },
  { value: 5, suit: 1, selected: false, played: false },
  { value: 5, suit: 2, selected: false, played: false },
  { value: 5, suit: 3, selected: false, played: false },
  { value: 6, suit: 0, selected: false, played: false },
  { value: 6, suit: 1, selected: false, played: false },
  { value: 6, suit: 2, selected: false, played: false },
  { value: 6, suit: 3, selected: false, played: false },
  { value: 7, suit: 0, selected: false, played: false },
  { value: 7, suit: 1, selected: false, played: false },
  { value: 7, suit: 2, selected: false, played: false },
  { value: 7, suit: 3, selected: false, played: false },
  { value: 8, suit: 0, selected: false, played: false },
  { value: 8, suit: 1, selected: false, played: false },
  { value: 8, suit: 2, selected: false, played: false },
  { value: 8, suit: 3, selected: false, played: false },
  { value: 9, suit: 0, selected: false, played: false },
  { value: 9, suit: 1, selected: false, played: false },
  { value: 9, suit: 2, selected: false, played: false },
  { value: 9, suit: 3, selected: false, played: false },
  { value: 10, suit: 0, selected: false, played: false },
  { value: 10, suit: 1, selected: false, played: false },
  { value: 10, suit: 2, selected: false, played: false },
  { value: 10, suit: 3, selected: false, played: false },
  { value: 11, suit: 0, selected: false, played: false },
  { value: 11, suit: 1, selected: false, played: false },
  { value: 11, suit: 2, selected: false, played: false },
  { value: 11, suit: 3, selected: false, played: false },
  { value: 12, suit: 0, selected: false, played: false },
  { value: 12, suit: 1, selected: false, played: false },
  { value: 12, suit: 2, selected: false, played: false },
  { value: 12, suit: 3, selected: false, played: false },
  { value: 13, suit: 0, selected: false, played: false },
  { value: 13, suit: 1, selected: false, played: false },
  { value: 13, suit: 2, selected: false, played: false },
  { value: 13, suit: 3, selected: false, played: false },
  { value: 14, suit: 0, selected: false, played: false },
  { value: 14, suit: 1, selected: false, played: false },
  { value: 14, suit: 2, selected: false, played: false },
  { value: 14, suit: 3, selected: false, played: false },
  { value: 15, suit: 0, selected: false, played: false },
  { value: 15, suit: 1, selected: false, played: false },
  { value: 15, suit: 2, selected: false, played: false },
  { value: 15, suit: 3, selected: false, played: false },
];

export class Deck {
  deck: CardInterface[];
  constructor() {
    // this.deck = this.createDeck();
    this.deck = this.shuffle(unShuffledDeck);
  }

  // shuffles deck by iterating over the deck by idx
  // with a random number between 0 and 51
  shuffle(deck: CardInterface[]) {
    const deckLength = deck.length;
    for (let idx = 0; idx < deckLength; idx++) {
      const newIdx = Math.floor(Math.random() * deckLength);
      this.swap(idx, newIdx, deck);
    }

    return deck;
  }

  swap(i: number, j: number, deck: CardInterface[]) {
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}
