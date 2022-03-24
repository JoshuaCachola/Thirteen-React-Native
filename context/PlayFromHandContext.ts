import { createContext } from 'react';
import { CardType } from '../classes/Card';

export interface PlayFromHand {
  playedCards: CardType[][];
  setPlayedCards: (cards: CardType[][]) => void;
}

export const PlayFromHandContext = createContext<PlayFromHand>({
  playedCards: [],
  setPlayedCards: () => {},
});
