import { Card, CardInterface } from '../classes/Card';

export enum CardValues {
  'THREE' = 3,
  'FOUR',
  'FIVE',
  'SIX',
  'SEVEN',
  'EIGHT',
  'NINE',
  'TEN',
  'JACK',
  'QUEEN',
  'KING',
  'ACE',
  'TWO',
}

export const cardValues = [
  null,
  null,
  null,
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
  '2',
];

export enum Sequences {
  'SINGLE',
  'DOUBLE',
  'TRIPLE',
  'QUAD',
  'STRAIGHT',
  'SINGLE-BOMB',
  'DOUBLE-BOMB',
  'TRIPLE-BOMB',
}

// const isSingleHigherCB = (highest: Card | null, incomingCard: Card) => {
//   if (!highest || incomingCard.value > highest.value) {
//     return true;
//   } else if (
//     incomingCard.value < highest.value ||
//     (highest.value === incomingCard.value && incomingCard.suit < highest.suit)
//   ) {
//     return false;
//   }
// };

// const SequenceCBMap = {
//   1: [isSingleHigherCB],
// };

// checks for sequence of cards played
// const getSequence = (...cards: CardInterface[]) => {
//   if (cards.length === 1) {
//     return 'SINGLE';
//   } else if (cards.length === 2) {
//     if (cards[0].value === cards[1].value) {
//       return 'DOUBLE';
//     } else {
//       return null;
//     }
//   }

//   cards.sort((a, b) => a.value - b.value);
// };
