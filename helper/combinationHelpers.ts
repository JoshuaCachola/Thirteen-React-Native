import { Card, CardInterface, CardSuits } from '../classes/Card';
import { combinationConstants } from '../constants/CombinationConstants';

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

// checks if incoming single value is higher than
// if current card is a "TWO" a bomb can be played
//
export const isValidSingle = (
  current: CardInterface,
  incoming: CardInterface[]
) => {
  if (current.value !== CardValues['TWO']) {
    return (
      incoming[0].value > current.value ||
      (incoming[0].value === current.value && incoming[0].suit > current.suit)
    );
  }
  return incoming.length === 6
    ? isValidBomb(incoming, combinationConstants.BOMB)
    : areAllSameValue(incoming);
};

export const isIncomingHigherValue = (
  current: CardInterface,
  incoming: CardInterface[]
) => {
  if (incoming[0].value > current.value) {
    return true;
  } else if (incoming[0].value === current.value) {
    return doesCurrentHaveHigherSuit(current, incoming);
  }
  return false;
};

const doesCurrentHaveHigherSuit = (
  current: CardInterface,
  incoming: CardInterface[]
) => {
  const incomingSuits = incoming.map((card) => card.suit);
  return Math.max(...incomingSuits) > current.suit;
};

export const isValidStraight = (cards: CardInterface[]) => {
  sortCards(cards);
  for (let i = 1; i < cards.length; i++) {
    if (cards[i].value !== cards[i - 1].value + 1) {
      return false;
    }
  }
  return true;
};

// sorts by value in ascending order
// if value is the same, then sorts by suit in ascending order
const sortCards = (cards: CardInterface[]) => {
  return cards.sort((a, b) => {
    const difference = a.value - b.value;
    if (difference === 0) {
      return a.suit - b.suit;
    }
    return difference;
  });
};

export const isValidBomb = (incoming: CardInterface[], type: string) => {
  const incomingObj = createObj(incoming);
  const values = [];
  for (let [k, v] of Object.entries(incomingObj)) {
    if (v.length !== 2 && type === combinationConstants.BOMB) return false;
    else if (v.length !== 3 && type === combinationConstants.DOUBLE_BOMB)
      return false;
    values.push(parseInt(k));
  }

  values.sort();
  for (let i = 1; i < values.length; i++) {
    if (values[i - 1] + 1 !== values[i]) return false;
  }

  return true;
};

// sets the highest card on the GameState object
export const getHighestCard = (cards: CardInterface[]) => {
  sortCards(cards);
  return cards[cards.length - 1];
};

export const isValidCombination = (
  incoming: CardInterface[],
  type?: string,
  current?: CardInterface
): boolean => {
  if (!type) {
    return checkCombinationByCardLength(incoming);
  }
  switch (type) {
    case combinationConstants.SINGLE:
      return isValidSingle(current!, incoming);
    case combinationConstants.DOUBLE:
      return (
        areAllSameValue(incoming) && isIncomingHigherValue(current!, incoming)
      );
    case combinationConstants.TRIPLE:
      return (
        areAllSameValue(incoming) && isIncomingHigherValue(current!, incoming)
      );
    default:
      return isValidStraight(incoming);
    // case combinationConstants.BOMB:
    //   return isValidBomb(current!, incoming);
  }
};

const checkCombinationByCardLength = (
  cards: CardInterface[],
  type?: string
) => {
  switch (cards.length) {
    case 1:
      return true;
    case 2:
      return areAllSameValue(cards);
    case 3:
      if (type) {
        return combinationConstants.TRIPLE
          ? areAllSameValue(cards)
          : isValidStraight(cards);
      }
    case 4:
      if (type) {
        return combinationConstants.BOMB
          ? areAllSameValue(cards)
          : isValidStraight(cards);
      }
    case 6:
      if (type) {
        return combinationConstants.BOMB
          ? isValidBomb(cards, combinationConstants.BOMB)
          : isValidStraight(cards);
      }
    default:
      return isValidStraight(cards);
  }
};

const areAllSameValue = (cards: CardInterface[]) => {
  const cardsObj = createObj(cards);
  return Object.keys(cardsObj).length === 1;
};
