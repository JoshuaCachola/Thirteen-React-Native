import { CardInterface } from '../classes/Card';
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
      cards[i].value === CardValues['TWO']
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

export const isValidBomb = (incoming: CardInterface[], type: string) => {
  // checks for four of a kind bombs
  if (incoming.length) {
    return areAllSameValue(incoming);
  }

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

// checks for valid combination during selecting cards
// from the players hand
export const isValidCombination = (
  incoming: CardInterface[],
  current?: CardInterface,
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
