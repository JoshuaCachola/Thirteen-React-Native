import { useContext, useEffect, useState } from 'react';
import { CardType } from '../classes/Card';
import { GameState } from '../classes/GameState';
import { GameContext } from '../context/GameContext';
import { PlayerInterface } from '../classes/Player';
import uuid from 'react-native-uuid';
import { getHighestCard } from '../helper/combinationHelpers';
import { Computer } from '../classes/Computer';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { ActionPayload, ActionType } from '../constants/Actions';

export default observer(function GameProvider(props: any) {
  const { game, playerActions } = useContext(GameContext);
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
  useEffect(() => {
    if (game.currentPlayer instanceof Computer) {
      const { action, type, played, newHand }: ActionPayload =
        game.currentPlayer.getAction(
          game.combinationType,
          game.highestCard,
          game.currentPlayer.hand,
          game.length,
          turnNumber
        );

      if (action === ActionType.PLAY) {
        // unshift player actions
        playerActions.unshift({
          action: ActionType.PLAY,
          type,
          player: game.currentPlayer,
          length: played.length,
          cards: played,
        });

        // update combinationType
        game.combinationType = type;

        // update length
        game.length = played.length;

        // update hands
        game.currentPlayer.hand = newHand;

        // update highestCard
        game.highestCard = getHighestCard(played);
      }
      // update rotation
      game.updateRotation(action);
      setTurnNumber(turnNumber + 1);
    }
  }, [game.currentPlayer, game.playerRotation]);

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
        playerActions,
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
