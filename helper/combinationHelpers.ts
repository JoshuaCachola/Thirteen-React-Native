import { CardInterface } from '../classes/Card';
import { combinationConstants } from '../constants/CombinationConstants';

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
export const isValidSingle = (
  current: CardInterface,
  incoming: CardInterface[]
) => {
  if (current.value !== CardValues['2']) {
    return (
      incoming[0].value > current.value ||
      (incoming[0].value === current.value && incoming[0].suit > current.suit)
    );
  }
  return incoming.length === 6
    ? isValidBomb(incoming, combinationConstants.BOMB)
    : areAllSameValue(incoming);
};

// checks if incoming combination has a higher value card that beats
// the current combinations highest card
// if values are the same then calls doesCurrentHaveHighSuit to check which has
// high suit
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

// When incoming and current have the same value
// checks if incoming has higher suit
const doesCurrentHaveHigherSuit = (
  current: CardInterface,
  incoming: CardInterface[]
) => {
  const incomingSuits = incoming.map((card) => card.suit);
  return Math.max(...incomingSuits) > current.suit;
};

// checks if cards follow a sequential order
// checks if a cards in the straight is a 'Two'
// if so return false
export const isValidStraight = (cards: CardInterface[]) => {
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
export const sortCards = (cards: CardInterface[]) => {
  return cards.sort((a, b) => {
    return a.value - b.value !== 0 ? a.value - b.value : a.suit - b.suit;
  });
};

// checks to see if all types of bombs are valid
export const isValidBomb = (incoming: CardInterface[], type: string) => {
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
export const getHighestCard = (cards: CardInterface[]) => {
  sortCards(cards);
  return cards[cards.length - 1];
};

// checks for valid combination during selecting cards
// from the players hand
export const isValidCombination = (
  incoming: CardInterface[],
  current?: CardInterface | null,
  type?: string
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
    case combinationConstants.BOMB:
      return (
        isValidBomb(incoming, combinationConstants.BOMB) &&
        isIncomingHigherValue(current!, incoming)
      );
    case combinationConstants.DOUBLE_BOMB:
      return (
        isValidBomb(incoming, combinationConstants.DOUBLE_BOMB) &&
        isIncomingHigherValue(current!, incoming)
      );
    case combinationConstants.TRIPLE_BOMB:
      return (
        isValidBomb(incoming, combinationConstants.TRIPLE_BOMB) &&
        isIncomingHigherValue(current!, incoming)
      );
    default:
      return (
        isValidStraight(incoming) && isIncomingHigherValue(current!, incoming)
      );
  }
};

// checks is combination is valid by the possible combination types that a
// number of cards can possibly be
// used only for when there isn't a combination already set
const checkCombinationByCardLength = (cards: CardInterface[]) => {
  switch (cards.length) {
    case 0:
      return false;
    case 1:
      return true;
    case 2:
      return areAllSameValue(cards);
    case 3:
      return areAllSameValue(cards) || isValidStraight(cards);
    case 4:
      return areAllSameValue(cards) || isValidStraight(cards);
    default:
      return isValidStraight(cards);
  }
};

// checks if all of the values of the cards are the same
// for doubles, triples, and four of a kind bombs
const areAllSameValue = (cards: CardInterface[]) => {
  let value = cards[0].value;
  for (let i = 1; i < cards.length; i++) {
    if (cards[i].value !== value) {
      return false;
    }
  }

  return true;
};

type cardCombinations = { [key: string]: number[] };

// creates an array of pairs of cards by index
// returns the array and length
export const getMultiples = (cards: CardInterface[], type: string) => {
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

const createHandMap = (hand: CardInterface[]) => {
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
    const popped = handMap[i].pop();
    straight.push(popped);
  }
  return straight;
};

export const getStraights = (
  hand: CardInterface[], // comes in sorted by value and suit
  straightLength: number
) => {
  const handMap = createHandMap(hand);
  const straights = [];

  let start = 3;
  let i = 1;
  while (start + i <= 15) {
    if (start in handMap && handMap[start].length > 0) {
      i += 1;
    } else {
      start += 1;
      i = 1;
      continue;
    }
    if (i === straightLength) {
      straights.push(createStraight(handMap, start, straightLength));
      i = 1;
    }
  }
  return straights;
};

const getSingles = (hand: CardInterface[]) => {
  const handMap = createHandMap(hand);
};
