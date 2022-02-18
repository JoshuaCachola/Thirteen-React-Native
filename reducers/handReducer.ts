import { PLAY } from '../constants/Actions';
import { CardInterface, CardSuits } from '../helper/Card';

export interface HandState {
  cards: [];
}

interface CardAction {
  type: string;
  payload: {
    value: number;
    suit: CardSuits;
  };
}

// card reducer
export default function handReducer(
  state: HandState,
  action: CardAction
): HandState {
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
}
