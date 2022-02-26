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

type combination = { [key: number]: number[] };

export const createObj = (cards: CardInterface[]) => {
  const obj: combination = {};
  cards.forEach((card) => {
    if (card.value in obj) {
      obj[card.value].push(card.suit);
    } else {
      obj[card.value] = [card.suit];
    }
  });

  return obj;
};

export const isStraight = (combinationObj: combination) => {
  const keys = Object.keys(combinationObj).sort();

  if (parseInt(keys[keys.length - 1]) === 15) return false;
  for (let i = 1; i < keys.length; i++) {
    if (parseInt(keys[i - 1]) !== parseInt(keys[i]) + 1) {
      return false;
    }
  }

  return true;
};

// will check valid combination at the beginning of the round
export const isValidCombination = (combination: CardInterface[]) => {
  const combinationObj = createObj(combination);

  switch (combination.length) {
    case 1:
      return true;
    case 2:
      return Object.keys(combinationObj).length === 1;
    case 3 && 4:
      return (
        Object.keys(combinationObj).length === 1 || isStraight(combinationObj)
      );
  }
};

export const isValidSingle = (
  current: CardInterface[],
  incoming: CardInterface[]
) => {
  if (
    (current[0].value === CardValues['TWO'] && incoming.length === 4) ||
    incoming.length === 6
  ) {
    return isValidBomb(current, incoming);
  } else if (
    incoming[0].value > current[0].value ||
    (incoming[0].value === current[0].value &&
      incoming[0].suit > current[0].suit)
  ) {
    return true;
  }
  return false;
};

export const isIncomingHigherValue = (
  current: CardInterface[],
  incoming: CardInterface[]
) => {
  if (incoming[0].value > current[0].value) {
    return true;
  } else if (incoming[0].value === current[0].value) {
    return doesCurrentHaveHigherSuit(current, incoming);
  }
  return false;
};

const doesCurrentHaveHigherSuit = (
  current: CardInterface[],
  incoming: CardInterface[]
) => {
  const currentSuits = current.map((card) => card.suit);
  const incomingSuits = incoming.map((card) => card.suit);
  if (Math.max(...incomingSuits) > Math.max(...currentSuits)) {
    return true;
  }
  return false;
};

export const isValidStraight = (
  current: CardInterface[],
  incoming: CardInterface[]
) => {
  const straightLength = current.length;
  if (incoming[straightLength - 1].value === CardValues['TWO']) {
    return false;
  }
  return isIncomingHigherValue(
    [current[straightLength - 1]],
    [incoming[straightLength - 1]]
  );
};

export const isValidBomb = (
  current: CardInterface[],
  incoming: CardInterface[]
) => {
  if (current.length === 4) {
    return isIncomingHigherValue(current, incoming);
  }

  const currentObj = createObj(current);
  const incomingObj = createObj(incoming);
};

export const isIncomingHigher = (
  current: CardInterface,
  incoming: CardInterface
) => {
  if (
    incoming.value > current.value ||
    (incoming.value === current.value && incoming.suit > current.suit)
  ) {
    return true;
  }
  return false;
};

export const getHighestCard = (cards: CardInterface[]) => {
  const cardValues = cards.map((card) => card.value);
  const maxValue = Math.max(...cardValues);
  // return maxValue + Math.max(cards[maxValue]);
};

export const sortByCombination = (cards: CardInterface[]) => {};

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
