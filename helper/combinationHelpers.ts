import { CardType } from '../classes/Card';
import {
  Combination,
  combinationConstants,
} from '../constants/CombinationConstants';

export const CardValues = {
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
  '2': 15,
};

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

type multipleObj = { [key: string]: number };

const multiples: multipleObj = {
  DOUBLE: 2,
  TRIPLE: 3,
  QUAD: 4,
};

type combination = { [key: number]: number[] };

// creates an object that organizes the keys as the value
// of a card and the suits stored in an array as the value of
// the keys
export const createObj = (cards: CardType[]) => {
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
export const isValidSingle = (
  current: CardType,
  incoming: CardType[]
): [boolean, Combination] => {
  switch (incoming.length) {
    case 1:
      return [
        incoming[0].value > current.value ||
          (incoming[0].value === current.value &&
            incoming[0].suit > current.suit),
        combinationConstants.SINGLE,
      ];
    case 4:
      return [areAllSameValue(incoming), combinationConstants.BOMB];
    case 6:
      return [
        isValidBomb(incoming, combinationConstants.BOMB!),
        combinationConstants.BOMB,
      ];
    default:
      return [false, combinationConstants.SINGLE];
  }
};

// checks if incoming combination has a higher value card that beats
// the current combinations highest card
// if values are the same then calls doesCurrentHaveHighSuit to check which has
// current suit
export const isIncomingHigherValue = (
  current: CardType,
  incoming: CardType[]
) => {
  if (incoming[0].value > current.value) {
    return true;
  } else if (incoming[0].value === current.value) {
    return doesCurrentHaveHigherSuit(current, incoming);
  }
  return false;
};

// When incoming and current have the same value
// checks if incoming has higher suit
const doesCurrentHaveHigherSuit = (current: CardType, incoming: CardType[]) => {
  const incomingSuits = incoming.map((card) => card.suit);
  return Math.max(...incomingSuits) > current.suit;
};

// checks if cards follow a sequential order
// checks if a cards in the straight is a 'Two'
// if so return false
export const isValidStraight = (cards: CardType[]) => {
  sortCards(cards);
  for (let i = 1; i < cards.length; i++) {
    if (
      cards[i].value !== cards[i - 1].value + 1 ||
      cards[i].value === CardValues['2']
    ) {
      return false;
    }
  }
  return true;
};

// sorts by value in ascending order
// if value is the same, then sorts by suit in ascending order
export const sortCards = (cards: CardType[]) => {
  return cards.sort((a, b) => {
    return a.value - b.value !== 0 ? a.value - b.value : a.suit - b.suit;
  });
};

// checks to see if all types of bombs are valid
export const isValidBomb = (incoming: CardType[], type: string) => {
  // checks for four of a kind bombs
  if (incoming.length === 4) {
    return areAllSameValue(incoming);
  }

  const incomingObj = createObj(incoming);
  const values = [];
  for (let [k, v] of Object.entries(incomingObj)) {
    if (v.length !== 2) return false;
    values.push(parseInt(k));
  }

  switch (type) {
    case combinationConstants.BOMB:
      if (values.length !== 3) {
        return false;
      }
      break;
    case combinationConstants.DOUBLE_BOMB:
      if (values.length !== 4) {
        return false;
      }
      break;
    case combinationConstants.TRIPLE_BOMB:
      if (values.length !== 5) {
        return false;
      }
      break;
    default:
      break;
  }

  values.sort();
  for (let i = 1; i < values.length; i++) {
    if (values[i - 1] + 1 !== values[i]) return false;
  }

  return true;
};

// sets the highest card on the GameState object
export const getHighestCard = (cards: CardType[]) => {
  sortCards(cards);
  return cards[cards.length - 1];
};

// checks for valid combination during selecting cards
// from the players hand
export const isValidCombination = (
  incoming: CardType[],
  type: Combination,
  current: CardType | null,
  length?: number
): [boolean, Combination] => {
  // needed when triggering from unselecting cards
  if (incoming.length === 0) return [false, type];

  // if there is no combination type then it is the start of a new cycle
  if (type === null || current === null) {
    return checkCombinationByCardLength(incoming);
  }

  // switch by combination type
  switch (type) {
    case combinationConstants.SINGLE:
      return isValidSingle(current, incoming);
    case combinationConstants.DOUBLE:
      return [
        areAllSameValue(incoming) &&
          isIncomingHigherValue(current, incoming) &&
          incoming.length === length,
        combinationConstants.DOUBLE,
      ];
    case combinationConstants.TRIPLE:
      return [
        areAllSameValue(incoming) &&
          isIncomingHigherValue(current, incoming) &&
          incoming.length === length,
        combinationConstants.TRIPLE,
      ];
    case combinationConstants.BOMB:
      return [
        isValidBomb(incoming, combinationConstants.BOMB!) &&
          isIncomingHigherValue(current, incoming),
        combinationConstants.BOMB,
      ];
    case combinationConstants.DOUBLE_BOMB:
      return [
        isValidBomb(incoming, combinationConstants.DOUBLE_BOMB!) &&
          isIncomingHigherValue(current, incoming),
        combinationConstants.DOUBLE_BOMB,
      ];
    case combinationConstants.TRIPLE_BOMB:
      return [
        isValidBomb(incoming, combinationConstants.TRIPLE_BOMB!) &&
          isIncomingHigherValue(current, incoming),
        combinationConstants.TRIPLE_BOMB,
      ];
    default:
      return [
        isValidStraight(incoming) &&
          isIncomingHigherValue(current, incoming) &&
          incoming.length === length,
        combinationConstants.STRAIGHT,
      ];
  }
};

// checks is combination is valid by the possible combination types that a
// number of cards can possibly be
// used only for when there isn't a combination already set
const checkCombinationByCardLength = (
  cards: CardType[]
): [boolean, Combination] => {
  switch (cards.length) {
    case 0:
      return [false, null];
    case 1:
      return [true, combinationConstants.SINGLE];
    case 2: {
      if (areAllSameValue(cards)) return [true, combinationConstants.DOUBLE];
      else return [false, null];
    }
    case 3: {
      if (areAllSameValue(cards)) return [true, combinationConstants.TRIPLE];
      else if (isValidStraight(cards))
        return [true, combinationConstants.STRAIGHT];
      else return [false, null];
    }
    case 4: {
      if (areAllSameValue(cards)) return [true, combinationConstants.BOMB];
      else if (isValidStraight(cards))
        return [true, combinationConstants.STRAIGHT];
      else return [false, null];
    }
    default:
      if (isValidStraight(cards)) return [true, combinationConstants.STRAIGHT];
      else return [false, null];
  }
};

// checks if all of the values of the cards are the same
// for doubles, triples, and four of a kind bombs
const areAllSameValue = (cards: CardType[]) => {
  let value = cards[0].value;
  for (let i = 1; i < cards.length; i++) {
    if (cards[i].value !== value) {
      return false;
    }
  }

  return true;
};

type cardCombinations = { [key: string]: number[][] };

// creates an array of pairs of cards by index
// returns the array and length
export const getMultiples = (cards: CardType[], type: string) => {
  sortCards(cards);
  const values = Array(16).fill(null);
  const pairs: cardCombinations = {};

  for (let i = 0; i < cards.length; i++) {
    // in the values array, push the index of the card
    // to the index of the value
    const cardValue = cards[i].value;
    if (!values[cardValue]) {
      values[cardValue] = [];
    }
    values[cardValue].push(i);

    if (values[cardValue].length === multiples[type]) {
      if (!(cardValue in pairs)) {
        pairs[cardValues[cardValue]!] = [values[cardValue]];
      } else {
        pairs[cardValues[cardValue]!].push(values[cardValue]);
      }
      values[cardValue] = null;
    }
  }

  return pairs;
};

export const createHandMap = (hand: CardType[]) => {
  sortCards(hand);
  const map: combination = {};
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].value in map) {
      map[hand[i].value].push(i);
    } else {
      map[hand[i].value] = [i];
    }
  }

  return map;
};

const createStraight = (
  handMap: combination,
  startingValue: number,
  length: number
) => {
  const straight = [];
  for (let i = startingValue; i < startingValue + length; i++) {
    const value: number = parseInt(cardValues[i]!);
    const popped = handMap[value].pop();
    straight.push(popped);
  }
  return straight;
};

export const getStraights = (
  hand: CardType[],
  straightLength: number,
  highestCard: CardType
) => {
  const handMap = createHandMap(hand);
  const straights: number[] = [];

  let previousValue;
  let length = 1;
  for (const [value, indicies] of Object.entries(handMap)) {
    const currentValue = cardValues.indexOf(value);
    if (!previousValue) {
      previousValue = currentValue;
      continue;
    } else if (currentValue === previousValue + 1) {
      length++;
    } else {
      length = 1;
    }
    previousValue = currentValue;

    if (length === straightLength) {
      straights.push(currentValue);
      length = 1;
    }
  }
  return straights;
};
