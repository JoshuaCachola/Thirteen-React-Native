import { Card, CardType } from './Card';

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
