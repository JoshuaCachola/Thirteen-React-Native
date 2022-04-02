import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../context/GameContext';
import { Computer } from '../classes/Computer';
import { observer } from 'mobx-react-lite';
import { ActionPayload, ActionType } from '../constants/Actions';
import {
  getRandLeft,
  getRandRotation,
  getRandTop,
} from '../helper/calculatePositions';

export default observer(function GameProvider(props: any) {
  const { game, playerActions } = useContext(GameContext);
  const [startGame, setStartGame] = useState(false);
  const [turnNumber, setTurnNumber] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);

  // useEffect for starting the game
  useEffect(() => {
    if (startGame) {
      playerActions.clear();
      game.initGame();
    }
  }, [startGame]);

  // useEffect for whenever the current player is a computer
  useEffect(() => {
    if (isGameWon || !startGame) return;
    if (game.currentPlayer instanceof Computer) {
      const { action, type, played, newHand }: ActionPayload =
        game.currentPlayer.getAction(
          game.combinationType,
          game.highestCard,
          game.currentPlayer.playerHand.hand,
          game.length,
          turnNumber
        );

      const payload = {
        action: action,
        type,
        player: game.currentPlayer,
        length: played.length,
        cards: played,
        positions: {
          left: getRandLeft(),
          top: getRandTop(),
          rotate: getRandRotation(),
        },
      };

      if (action === ActionType.PLAY) {
        // update combinationType
        game.updateCombinationType(type);

        // update length
        game.updateLength(played.length);

        // update hand
        game.currentPlayer.playerHand.updateHand(newHand);

        // update highestCard
        game.updateHighestCard(played);
      }

      // push action and update rotation after a second
      setTimeout(() => {
        playerActions.unshift(payload);
        if (game.checkForWinner()) {
          setIsGameWon(true);
          setStartGame(false);
        }

        // update rotation
        game.updateRotation(action);

        // update turn number
        setTurnNumber(turnNumber + 1);
      }, 1000);
    }
  }, [game.currentPlayer, game.playerRotation]);

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
