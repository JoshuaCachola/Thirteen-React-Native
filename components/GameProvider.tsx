import { useEffect, useState } from 'react';
import { CardType } from '../classes/Card';
import {
  Combination,
  createPlayerRotation,
  deal,
  findLowestThree,
} from '../classes/GameState';
import { GameContext } from '../context/GameContext';
import { Player, PlayerInterface, PlayerType } from '../classes/Player';
import uuid from 'react-native-uuid';

export default function GameProvider(props: any) {
  const [players, setPlayers] = useState<PlayerInterface[]>([]);
  const [roomId, setRoomId] = useState(uuid.v4().toString());
  const [playerRotation, setPlayerRotation] = useState<PlayerInterface[]>([]);
  const [combinationType, setCombinationType] = useState<Combination>(null);
  const [highestCard, setHighestCard] = useState<CardType | null>(null);
  const [length, setLength] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerInterface | null>(
    null
  );
  const [hands, setHands] = useState<CardType[][]>(() => deal());
  const [playedCards, setPlayedCards] = useState<CardType[][]>([]);
  const [startGame, setStartGame] = useState(false);
  const [lastWinner, setLastWinner] = useState<number | null>(null);
  const [turnNumber, setTurnNumber] = useState(0);

  useEffect(() => {
    if (startGame && players.length > 0) {
      initGame();
    }
  }, [startGame, players.length]);

  useEffect(() => {
    if (currentPlayer?.getName().includes('Computer')) {
      currentPlayer.play(combinationType, highestCard, hands[turnNumber % 4]);
    }
  }, [playerRotation, currentPlayer]);

  const initGame = () => {
    const p = [...players];
    for (let i = players.length; i < 4; i++) {
      p.push(new Player(`Computer ${i}`, true, PlayerType.COMPUTER));
    }
    const startingPlayerIdx =
      lastWinner !== null ? lastWinner : findLowestThree(hands);
    const playerRotation = createPlayerRotation(startingPlayerIdx!, p);
    setTurnNumber(startingPlayerIdx!);
    setPlayers(p);
    setCurrentPlayer(p[startingPlayerIdx!]);
    setPlayerRotation(playerRotation);
  };

  return (
    <GameContext.Provider
      value={{
        roomId,
        setRoomId,
        playerRotation,
        setPlayerRotation,
        combinationType,
        setCombinationType,
        highestCard,
        setHighestCard,
        length,
        setLength,
        currentPlayer,
        setCurrentPlayer,
        players,
        setPlayers,
        hands,
        setHands,
        playedCards,
        setPlayedCards,
        startGame,
        setStartGame,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
