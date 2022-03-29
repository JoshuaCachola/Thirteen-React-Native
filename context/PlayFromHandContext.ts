import { createContext } from 'react';
import { CardType } from '../classes/Card';

export interface PlayFromHand {
  PlayerActions: CardType[][];
  setPlayerActions: (cards: CardType[][]) => void;
}

export const PlayFromHandContext = createContext<PlayFromHand>({
  PlayerActions: [],
  setPlayerActions: () => {},
});
