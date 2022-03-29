import { Card, CardType } from './Card';
import { PlayerInterface } from './Player';

// const unShuffledDeck: CardType[] = [
//   { value: 3, suit: 0, selected: false },
//   { value: 3, suit: 1, selected: false },
//   { value: 3, suit: 2, selected: false },
//   { value: 3, suit: 3, selected: false },
//   { value: 4, suit: 0, selected: false },
//   { value: 4, suit: 1, selected: false },
//   { value: 4, suit: 2, selected: false },
//   { value: 4, suit: 3, selected: false },
//   { value: 5, suit: 0, selected: false },
//   { value: 5, suit: 1, selected: false },
//   { value: 5, suit: 2, selected: false },
//   { value: 5, suit: 3, selected: false },
//   { value: 6, suit: 0, selected: false },
//   { value: 6, suit: 1, selected: false },
//   { value: 6, suit: 2, selected: false },
//   { value: 6, suit: 3, selected: false },
//   { value: 7, suit: 0, selected: false },
//   { value: 7, suit: 1, selected: false },
//   { value: 7, suit: 2, selected: false },
//   { value: 7, suit: 3, selected: false },
//   { value: 8, suit: 0, selected: false },
//   { value: 8, suit: 1, selected: false },
//   { value: 8, suit: 2, selected: false },
//   { value: 8, suit: 3, selected: false },
//   { value: 9, suit: 0, selected: false },
//   { value: 9, suit: 1, selected: false },
//   { value: 9, suit: 2, selected: false },
//   { value: 9, suit: 3, selected: false },
//   { value: 10, suit: 0, selected: false },
//   { value: 10, suit: 1, selected: false },
//   { value: 10, suit: 2, selected: false },
//   { value: 10, suit: 3, selected: false },
//   { value: 11, suit: 0, selected: false },
//   { value: 11, suit: 1, selected: false },
//   { value: 11, suit: 2, selected: false },
//   { value: 11, suit: 3, selected: false },
//   { value: 12, suit: 0, selected: false },
//   { value: 12, suit: 1, selected: false },
//   { value: 12, suit: 2, selected: false },
//   { value: 12, suit: 3, selected: false },
//   { value: 13, suit: 0, selected: false },
//   { value: 13, suit: 1, selected: false },
//   { value: 13, suit: 2, selected: false },
//   { value: 13, suit: 3, selected: false },
//   { value: 14, suit: 0, selected: false },
//   { value: 14, suit: 1, selected: false },
//   { value: 14, suit: 2, selected: false },
//   { value: 14, suit: 3, selected: false },
//   { value: 15, suit: 0, selected: false },
//   { value: 15, suit: 1, selected: false },
//   { value: 15, suit: 2, selected: false },
//   { value: 15, suit: 3, selected: false },
// ];

export class Deck {
  deck: CardType[];
  constructor() {
    this.deck = this.createDeck();
  }

  public deal() {
    this.shuffle();
    const hands: CardType[][] = [[], [], [], []];

    this.deck.forEach((card: CardType, idx) => {
      hands[idx % 4].push(card);
    });
    return hands;
  }

  private createDeck() {
    const deck: CardType[] = [];
    for (let i = 3; i <= 15; i++) {
      for (let j = 0; j <= 3; j++) {
        deck.push(new Card(j, i));
      }
    }

    return deck;
  }

  // shuffles deck by iterating over the deck by idx
  // with a random number between 0 and 51
  private shuffle() {
    const deckLength = this.deck.length;
    for (let idx = 0; idx < deckLength; idx++) {
      const newIdx = Math.floor(Math.random() * deckLength);
      this.swap(idx, newIdx);
    }
  }

  private swap(i: number, j: number) {
    const temp = this.deck[i];
    this.deck[i] = this.deck[j];
    this.deck[j] = temp;
  }
}
