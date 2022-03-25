import { useEffect, useMemo, useState } from 'react';
import { CardType } from '../classes/Card';
import { Combination, deal, initGame } from '../classes/GameState';
import { GameContext } from '../context/GameContext';
import { PlayerInterface } from '../classes/Player';
import uuid from 'react-native-uuid';
import { Computer } from '../classes/Computer';

export default function GameProvider(props: any) {
  const [players, setPlayers] = useState<PlayerInterface[]>([]);
  const [roomId, setRoomId] = useState(uuid.v4().toString());
  const [playerRotation, setPlayerRotation] = useState<PlayerInterface[]>([]);
  const [combinationType, setCombinationType] = useState<Combination | null>(
    null
  );
  const [highestCard, setHighestCard] = useState<CardType | null>(null);
  const [length, setLength] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerInterface | null>(
    null
  );
  const [hands, setHands] = useState<CardType[][]>(() => deal());
  const [playedCards, setPlayedCards] = useState<CardType[][]>([]);
  const [startGame, setStartGame] = useState(false);
  const [lastWinner, setLastWinner] = useState<number | null>(null);

  useEffect(() => {
    if (startGame && players.length > 0) {
      const p = [...players];
      for (let i = players.length; i < 4; i++) {
        p.push(new Computer(`Computer ${i}`));
      }
      const { currentPlayer, playerRotation } = initGame(p, hands, lastWinner);
      setPlayers(p);
      setCurrentPlayer(currentPlayer);
      setPlayerRotation(playerRotation);
    }
  }, [startGame, players.length]);

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
