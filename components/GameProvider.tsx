import { useContext, useEffect, useState } from 'react';
import { CardType } from '../classes/Card';
import { ActionType, Combination, GameState } from '../classes/GameState';
import { GameContext } from '../context/GameContext';
import { ActionPayload, PlayerInterface } from '../classes/Player';
import uuid from 'react-native-uuid';
import { getHighestCard } from '../helper/combinationHelpers';
import { Computer } from '../classes/Computer';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';

export default observer(function GameProvider(props: any) {
  const { game } = useContext(GameContext);
  const [startGame, setStartGame] = useState(false);
  const [turnNumber, setTurnNumber] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);

  // useEffect for starting the game
  useEffect(() => {
    if (startGame) {
      game.initGame();
    }
  }, [startGame]);

  // useEffect for whenever the current player is a computer
  // useEffect(() => {
  //   const currentPlayerIdx = players.indexOf(currentPlayer!);
  //   if (currentPlayer instanceof Computer) {
  //     const { action, type, played, newHand }: ActionPayload =
  //       currentPlayer.getAction(
  //         combinationType,
  //         highestCard,
  //         hands[currentPlayerIdx],
  //         length,
  //         turnNumber
  //       );

  //     let payload;
  //     if (action === ActionType.PLAY) {
  //       console.log(played, highestCard, combinationType, turnNumber);
  //       // update cards
  //       setPlayedCards([played, ...playedCards]);

  //       // update combinationType
  //       setCombinationType(type);

  //       // update length
  //       setLength(played.length);

  //       // update hands
  //       const newHands = hands;
  //       newHands[currentPlayerIdx] = newHand;
  //       setHands([...newHands]);

  //       console.log(played, highestCard);
  //       // update highestCard
  //       setHighestCard(getHighestCard(played));

  //       // update rotation
  //       payload = updateRotation(action, playerRotation, players);
  //     } else {
  //       payload = updateRotation(action, playerRotation, players);
  //     }

  //     // update state from payload
  //     if ('combinationType' in payload) {
  //       setCombinationType(payload.combinationType!);
  //     }

  //     if ('highestCard' in payload) {
  //       setHighestCard(payload.highestCard!);
  //     }

  //     setCurrentPlayer(payload.currentPlayer!);
  //     setPlayerRotation(payload.playerRotation);
  //     setTurnNumber(turnNumber + 1);
  //   }
  // }, [playerRotation, currentPlayer, turnNumber]);

  // const initGame = () => {
  //   const p = [...players];
  //   for (let i = players.length; i < 4; i++) {
  //     p.push(new Computer(`Computer ${i}`));
  //   }
  //   const startingPlayerIdx =
  //     lastWinner !== null ? lastWinner : findStartingPlayer(hands);
  //   const playerRotation = createPlayerRotation(startingPlayerIdx!, p);
  //   setPlayers(p);
  //   setCurrentPlayer(p[startingPlayerIdx!]);
  //   setPlayerRotation(playerRotation);
  // };

  // reaction(
  //   () => game.arePlayersReady(),
  //   (ready,) => {
  //     console.log(ready);
  //     setStartGame(true);
  //     if (ready) game.initGame();
  //   }
  // );

  return (
    <GameContext.Provider
      value={{
        game,
        startGame,
        setStartGame,
        turnNumber,
        setTurnNumber,
        isGameWon,
        setIsGameWon,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
});
