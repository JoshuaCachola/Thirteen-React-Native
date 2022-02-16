import { useReducer } from 'react';
import { Card } from '../components/PlayingCard';

export interface HandState {
  cards: Card[];
}

export interface CardAction extends HandState {
  type: string;
  payload: Card;
}

// card reducer
const reducer = (state: HandState, action: CardAction): HandState => {
  switch (action.type) {
    case 'SELECT':
      const selectedCards = state.cards.map((card: Card) => {
        if (
          card.value === action.payload.value &&
          card.suit === action.payload.suit
        ) {
          return { ...card, selected: !card.selected };
        }
      });
      return { cards: selectedCards } as HandState;
    case 'REMOVE':
      const filteredCards = state.cards.filter(
        (card: Card) =>
          card.value !== action.payload.value &&
          card.suit !== action.payload.suit
      );
      return { cards: filteredCards } as HandState;
    default:
      return state;
  }
};

// card reducer hook
export default function useCardReducer(state: HandState) {
  const [cardsInHand, dispatch] = useReducer(reducer, state);

  return [cardsInHand, dispatch];
}
