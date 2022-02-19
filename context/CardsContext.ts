import { createContext } from 'react';
import { CardInterface } from '../helper/Card';

export interface CardsContext {
  playedCards: CardInterface[][];
  stagedCards: CardInterface[];
  hand: CardInterface[];
  setHand: (cards: CardInterface[]) => void;
}

export const CardsContext = createContext<CardsContext>({
  playedCards: [[]],
  stagedCards: [],
  hand: [],
  setHand: () => {},
});
