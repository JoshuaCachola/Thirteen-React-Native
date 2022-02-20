import { createContext } from 'react';
import { CardInterface } from '../helper/Card';

// context shared between hand and staged cards
// hand: cards that the user can play
// stagedCards: cards that are touched that the player is deciding to play
export interface Hand {
  stagedCards: CardInterface[];
  hand: CardInterface[];
  setHand: (cards: CardInterface[]) => void;
  setStagedCards: (cards: CardInterface[]) => void;
}

export const HandContext = createContext<Hand>({
  stagedCards: [],
  hand: [],
  setHand: () => {},
  setStagedCards: () => {},
});
