import { useEffect, useState } from 'react';
import { CardType } from '../classes/Card';
import {
  ActionType,
  Combination,
  createPlayerRotation,
  deal,
  findLowestThree,
  updateRotation,
} from '../classes/GameState';
import { GameContext } from '../context/GameContext';
import {
  ActionPayload,
  Player,
  PlayerInterface,
  PlayerType,
} from '../classes/Player';
import uuid from 'react-native-uuid';
import { getHighestCard, sortCards } from '../helper/combinationHelpers';

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
  const [hands, setHands] = useState<CardType[][]>(() => {
    const shuffled = deal();
    return shuffled.map((hand) => sortCards(hand));
  });
  const [playedCards, setPlayedCards] = useState<CardType[][]>([]);
  const [startGame, setStartGame] = useState(false);
  const [lastWinner, setLastWinner] = useState<number | null>(null);
  const [turnNumber, setTurnNumber] = useState(0);

  // useEffect for starting the game
  useEffect(() => {
    if (startGame && players.length > 0) {
      initGame();
    }
  }, [startGame, players.length]);

  // useEffect for whenever the current player is a computer
  useEffect(() => {
    console.log(hands);
    const currentPlayerIdx = players.indexOf(currentPlayer!);
    if (currentPlayer?.getName().includes('Computer')) {
      const { action, type, played, newHand }: ActionPayload =
        currentPlayer.getAction(
          combinationType,
          highestCard,
          hands[currentPlayerIdx],
          length,
          turnNumber
        );

      let payload;
      if (action === ActionType.PLAY) {
        console.log(played, highestCard, combinationType, turnNumber);
        // update cards
        setPlayedCards([played, ...playedCards]);

        // update combinationType
        setCombinationType(type);

        // update length
        setLength(played.length);

        // update hands
        const newHands = hands;
        newHands[currentPlayerIdx] = newHand;
        setHands([...newHands]);

        // update highestCard
        setHighestCard(getHighestCard(played));

        // update rotation
        payload = updateRotation(ActionType.PLAY, playerRotation, players);
      } else {
        payload = updateRotation(ActionType.PASS, playerRotation, players);
      }

      // update state from payload
      if ('combinationType' in payload) {
        setCombinationType(payload.combinationType!);
        setHighestCard(payload.highestCard!);
      }
      setCurrentPlayer(payload.currentPlayer!);
      setPlayerRotation(payload.playerRotation);
      setTurnNumber(turnNumber + 1);
    }
  }, [playerRotation, currentPlayer, turnNumber]);

  const initGame = () => {
    const p = [...players];
    for (let i = players.length; i < 4; i++) {
      p.push(new Player(`Computer ${i}`, true, PlayerType.COMPUTER));
    }
    const startingPlayerIdx =
      lastWinner !== null ? lastWinner : findLowestThree(hands);
    const playerRotation = createPlayerRotation(startingPlayerIdx!, p);
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
        turnNumber,
        setTurnNumber,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
