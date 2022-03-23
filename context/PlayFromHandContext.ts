import { createContext } from 'react';
import { CardInterface } from '../classes/Card';

export interface PlayFromHand {
  playedCards: CardInterface[][];
  setPlayedCards: (cards: CardInterface[][]) => void;
}

export const PlayFromHandContext = createContext<PlayFromHand>({
  playedCards: [],
  setPlayedCards: () => {},
});
