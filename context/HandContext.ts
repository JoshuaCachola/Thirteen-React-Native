import { createContext } from 'react';
import { CardType } from '../classes/Card';

// context shared between hand and selected cards
// hand: cards that the user can play
// selectedCards: cards that are touched that the player is deciding to play
interface Hand {
  hand: CardType[] | null;
  setHand: (cards: CardType[]) => void;
}

export const HandContext = createContext<Hand>({
  hand: [],
  setHand: () => {},
});
