import { createContext } from 'react';
import { CardType } from '../classes/Card';
import { Combination } from '../classes/GameState';
import { PlayerInterface } from '../classes/Player';

interface Game {
  roomId: string;
  setRoomId: (id: string) => void;
  combinationType: Combination;
  setCombinationType: (t: Combination) => void;
  highestCard: CardType | null;
  setHighestCard: (c: CardType) => void;
  length: number;
  setLength: (l: number) => void;
  currentPlayer: PlayerInterface | null;
  setCurrentPlayer: (p: PlayerInterface) => void;
  playerRotation: PlayerInterface[];
  setPlayerRotation: (r: PlayerInterface[]) => void;
  players: PlayerInterface[];
  setPlayers: (p: PlayerInterface[]) => void;
  hands: CardType[][];
  setHands: (h: CardType[][]) => void;
  playedCards: CardType[][];
  setPlayedCards: (p: CardType[][]) => void;
  startGame: boolean;
  setStartGame: (b: boolean) => void;
  turnNumber: number;
  setTurnNumber: (n: number) => void;
  isGameWon: boolean;
  setIsGameWon: (b: boolean) => void;
}

export const GameContext = createContext<Game>({
  roomId: '',
  setRoomId: () => {},
  combinationType: null,
  setCombinationType: () => {},
  highestCard: null,
  setHighestCard: () => {},
  length: 0,
  setLength: () => {},
  currentPlayer: null,
  setCurrentPlayer: () => {},
  playerRotation: [],
  setPlayerRotation: () => {},
  players: [],
  setPlayers: () => {},
  hands: [],
  setHands: () => {},
  playedCards: [],
  setPlayedCards: () => {},
  startGame: false,
  setStartGame: () => {},
  turnNumber: 0,
  setTurnNumber: () => {},
  isGameWon: false,
  setIsGameWon: () => {},
});
