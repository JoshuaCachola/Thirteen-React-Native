import { useReducer } from 'react';
import { PLAY } from '../constants/Actions';
import { CardInterface } from '../helper/Card';

export interface HandState {
  cards: CardInterface[];
}

export interface CardAction extends HandState {
  type: string;
  payload: CardInterface;
}

// card reducer
const reducer = (state: HandState, action: CardAction): HandState => {
  switch (action.type) {
    // case 'SELECT':
    //   const selectedCards = state.cards.map((card: Card) => {
    //     if (
    //       card.value === action.payload.value &&
    //       card.suit === action.payload.suit
    //     ) {
    //       return { ...card, selected: !card.selected };
    //     }
    //   });
    //   return { cards: selectedCards } as HandState;
    case PLAY:
      const filteredCards = state.cards.filter(
        (card: CardInterface) =>
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
