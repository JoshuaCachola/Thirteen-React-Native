import { createContext } from 'react';
import { CardInterface } from '../helper/Card';

export interface PlayedCards {
  playedCards: CardInterface[][];
}

export const PlayedCardsContext = createContext<PlayedCards>({
  playedCards: [],
});
