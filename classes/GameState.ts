import { CardType } from './Card';
import { Deck } from './Deck';
import { PlayerInterface } from './Player';

export type Combination =
  | 'SINGLE'
  | 'DOUBLE'
  | 'TRIPLE'
  | 'STRAIGHT'
  | 'BOMB'
  | 'DOUBLE_BOMB'
  | 'TRIPLE_BOMB'
  | null;

// export const playCards = (
//   s: CardType[],
//   type: Combination,
//   high: CardType | null,
//   length: number
// ) => {
//   const [isValid, combinationType] = isValidCombination(s, type, high, length);

//   length = s.length;
// };

export enum ActionType {
  PLAY,
  PASS,
}

// action: pass - shifts the player out of rotation
export const updateRotation = (
  type: ActionType,
  playerRotation: PlayerInterface[],
  players: PlayerInterface[]
): {
  playerRotation: PlayerInterface[];
  currentPlayer: PlayerInterface;
  combinationType?: Combination;
  highestCard?: CardType | null;
} => {
  const shifted = playerRotation.shift();

  if (type === ActionType.PLAY) {
    playerRotation.push(shifted!);
  }

  if (type === ActionType.PASS && playerRotation.length === 1) {
    const newRotation = createPlayerRotation(
      players.indexOf(playerRotation[0]),
      players
    );
    return {
      playerRotation: newRotation,
      combinationType: null,
      currentPlayer: newRotation[0],
      highestCard: null,
    };
  }

  return { playerRotation, currentPlayer: playerRotation[0] };
};

// creates the rotation of players
export const createPlayerRotation = (
  startingPlayerIdx: number,
  players: PlayerInterface[]
) => {
  const rotation: PlayerInterface[] = [players[startingPlayerIdx]];
  for (
    let i = startingPlayerIdx + 1;
    i % players.length !== startingPlayerIdx;
    i++
  ) {
    rotation.push(players[i % 4]);
  }
  return rotation;
};

// deals hands from a newly created and shuffled deck
export const deal = () => {
  const hands: CardType[][] = [[], [], [], []];
  const { deck } = new Deck();

  deck.forEach((card: CardType, idx) => {
    hands[idx % 4].push(card);
  });

  return hands;
};

// Starting player is the player with the lowest card
// This is when there is no previous winner and is the first game player
// finds the player with the lowest card
// if there are four players return when the three of spades - suit: 0 - is found
export const findStartingPlayer = (hands: CardType[][]) => {
  let lowestCard = { value: Number.MAX_VALUE, suit: Number.MAX_VALUE, hand: 0 };
  for (let h = 0; h < hands.length; h++) {
    const hand = hands[h];
    for (let c = 0; c < hand.length; c++) {
      const card = hand[c];
      if (card.value === 3 && card.suit === 0) {
        return h;
      }

      if (
        card.value < lowestCard.value ||
        (card.value === lowestCard.value && card.suit < lowestCard.suit)
      ) {
        lowestCard = { value: card.value, suit: card.suit, hand: h };
      }
    }
  }

  return lowestCard.hand;
};

// export const canPlayCombination = (
//   selected: CardType[]
// ): [boolean, Combination] => {
//   const [isValid, combination] = isValidCombination(selected);
//   return [isValid, combination];
// };

// starts the game and sets
// export const initGame = (
//   players: PlayerInterface[],
//   hands: CardType[][],
//   lastWinner: number | null
// ) => {
//   lastWinner = lastWinner !== null ? lastWinner : findLowestThree(hands)!;
//   const playerRotation = createPlayerRotation(lastWinner, players);

//   return {
//     playerRotation,
//     currentPlayer: players[lastWinner],
//   };
// };
