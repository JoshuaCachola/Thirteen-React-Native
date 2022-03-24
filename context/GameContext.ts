import { createContext } from 'react';
import { GameState, GameStateInterface } from '../classes/GameState';

interface Game {
  game: GameStateInterface;
}

export const GameContext = createContext<Game>({
  game: new GameState(''),
});
