import { createContext } from 'react';
import { GameInterface } from '../classes/Game';
import { GameState, GameStateInterface } from '../classes/GameState';
import uuid from 'react-native-uuid';
import {
  PlayerActions,
  PlayerActionsInterface,
} from '../classes/PlayerActions';

interface Game {
  game: GameStateInterface & GameInterface;
  playerActions: PlayerActionsInterface;
  startGame: boolean;
  setStartGame: (b: boolean) => void;
  turnNumber: number;
  setTurnNumber: (n: number) => void;
  isGameWon: boolean;
  setIsGameWon: (b: boolean) => void;
}

export const roomId = uuid.v4().toString();

export const GameContext = createContext<Game>({
  game: new GameState(roomId),
  playerActions: new PlayerActions(),
  startGame: false,
  setStartGame: () => {},
  turnNumber: 0,
  setTurnNumber: () => {},
  isGameWon: false,
  setIsGameWon: () => {},
});
