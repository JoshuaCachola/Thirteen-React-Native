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
import { Player, PlayerInterface, PlayerType } from '../classes/Player';
import uuid from 'react-native-uuid';
import {
  getHighestCard,
  isValidCombination,
} from '../helper/combinationHelpers';

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

  // useEffect for whenever the current player is a computer
  useEffect(() => {
    const currentPlayerIdx = players.indexOf(currentPlayer!);
    console.log(highestCard, combinationType);
    if (currentPlayer?.getName().includes('Computer')) {
      console.log('here');
      const [type, indicies]: [ActionType, Set<number>] = currentPlayer.play(
        combinationType,
        highestCard,
        hands[currentPlayerIdx],
        length
      );
      let payload;
      if (type === ActionType.PLAY) {
        // update cards
        const removedCards: CardType[] = [];
        const newHand: CardType[] = [];
        hands[currentPlayerIdx].forEach((card, idx) => {
          indicies.has(idx) ? removedCards.push(card) : newHand.push(card);
        });

        const [isValid, comboType] = isValidCombination(
          removedCards,
          combinationType,
          highestCard,
          removedCards.length
        );
        if (!isValid) {
          // updateRotation
          payload = updateRotation(ActionType.PASS, playerRotation, players);
        }

        // update combinationType
        setCombinationType(comboType);

        // update length
        setLength(removedCards.length);

        // update hands
        const newHands = hands;
        newHands[currentPlayerIdx] = newHand;
        setHands(newHands);

        // update playedCards
        setPlayedCards([removedCards, ...playedCards]);

        // update highestCard
        setHighestCard(getHighestCard(removedCards));

        // get payload
        payload = updateRotation(ActionType.PLAY, playerRotation, players);
      } else {
        // updateRotation
        payload = updateRotation(ActionType.PASS, playerRotation, players);
      }

      // update state from payload
      if ('combinationType' in payload) {
        setCombinationType(payload.combinationType!);
      }
      setCurrentPlayer(payload.currentPlayer!);
      setPlayerRotation(payload.playerRotation);
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
