import { createContext } from 'react';
import { CardInterface } from '../classes/Card';

// context shared between hand and selected cards
// hand: cards that the user can play
// selectedCards: cards that are touched that the player is deciding to play
export interface Hand {
  selectedCards: CardInterface[];
  hand: CardInterface[];
  setHand: (cards: CardInterface[]) => void;
  setSelectedCards: (cards: CardInterface[]) => void;
}

export const HandContext = createContext<Hand>({
  selectedCards: [],
  hand: [],
  setHand: () => {},
  setSelectedCards: () => {},
});
