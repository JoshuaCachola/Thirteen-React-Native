import { createContext } from 'react';
import { CardInterface } from '../classes/Card';

export interface PlayFromHand {
  playedCards: string[][];
  setPlayedCards: (cards: string[][]) => void;
}

export const PlayFromHandContext = createContext<PlayFromHand>({
  playedCards: [],
  setPlayedCards: () => {},
});
