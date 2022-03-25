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

// export const playCards = (s: CardType[], combinationType) => {
//   const [_, type] = canPlayCombination(s);
//   if (type !== combinationType) {
//     combinationType = type;
//   }

//   length = s.length;

//   updateRotation('PLAY');
// };

// export const pass = () => {
//   updateRotation('PASS');
// };

// export const updateRotation = (type: ActionType) => {
//   const shifted = playerRotation.shift();

//   if (type === 'PLAY') {
//     playerRotation.push(shifted!);
//   }

//   if (playerRotation.length === 1) {
//     createPlayerRotation(players.indexOf(playerRotation[0]));
//     setCombinationType(null);
//     currentPlayer = playerRotation[0];
//   }
// };

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

const findLowestThree = (hands: CardType[][]) => {
  for (let h = 0; h < hands.length; h++) {
    const hand = hands[h];
    for (let c = 0; c < hand.length; c++) {
      const card = hand[c];
      if (card.value === 3 && card.suit === 0) {
        return h;
      }
    }
  }
};

// export const canPlayCombination = (
//   selected: CardType[]
// ): [boolean, Combination] => {
//   const [isValid, combination] = isValidCombination(selected);
//   return [isValid, combination];
// };

// starts the game and sets
export const initGame = (
  players: PlayerInterface[],
  hands: CardType[][],
  lastWinner: number | null
) => {
  lastWinner = lastWinner !== null ? lastWinner : findLowestThree(hands)!;
  console.log(players);
  const playerRotation = createPlayerRotation(lastWinner, players);

  return {
    playerRotation,
    currentPlayer: players[lastWinner],
  };
};
