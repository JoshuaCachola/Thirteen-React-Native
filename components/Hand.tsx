import { useContext, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { CardType } from '../classes/Card';
import InteractiveView from './InteractiveView';
import { calculatePositions, Position } from '../helper/calculatePositions';
import { isValidCombination } from '../helper/combinationHelpers';
import { GameContext } from '../context/GameContext';
import Button from './Button';
import { PlayerInterface } from '../classes/Player';
import { observer } from 'mobx-react-lite';
import { ActionType } from '../constants/Actions';
import {
  Directions,
  FlingGestureHandler,
  HandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';

interface props {
  player: PlayerInterface;
}

// This component displays holding a hand of cards
export default observer(function Hand({ player }: props) {
  const {
    game,
    playerActions,
    setStartGame,
    setTurnNumber,
    turnNumber,
    setIsGameWon,
  } = useContext(GameContext);
  const [hand, setHand] = useState<CardType[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);

  // useEffect to update hand useState and positions state
  useEffect(() => {
    if (player.playerHand.hand) {
      setHand(player.playerHand.hand);
      setPositions(calculatePositions(player.playerHand.hand.length));
    }
  }, [player.playerHand.hand]);

  // recalculates position of cards whenever a player plays a sequence
  // allows hand to be centered
  useMemo(() => {
    const newPositions = calculatePositions(hand.length);
    setPositions(newPositions);
  }, [hand.length]);

  // filter selected cards from hand and check if
  // it is a valid combination
  useMemo(() => {
    const selected = player.playerHand.hand.filter((card) => card.selected);
    const [isValid, _] = isValidCombination(
      selected,
      game.combinationType,
      game.highestCard,
      game.length
    );
    setIsValid(isValid);
  }, [hand]);

  // handles playing cards when cards are selected
  // and play button is pressed
  const handlePlayCards = (positions: {
    bottom: number;
    left: number;
    rotate: string;
  }) => {
    const acceptedSequence: CardType[] = [];
    const newHand: CardType[] = [];
    hand.forEach((card) => {
      if (card.selected) {
        acceptedSequence.push(card);
      } else {
        newHand.push(card);
      }
      card.selected = false;
    });

    const [isValid, type] = isValidCombination(
      acceptedSequence,
      game.combinationType,
      game.highestCard,
      acceptedSequence.length
    );

    if (isValid) {
      game.updateCombinationType(type);
      game.updateLength(acceptedSequence.length);
      game.updateHighestCard(acceptedSequence);
      player.playerHand.updateHand(newHand);

      // push to played Cards
      playerActions.push({
        action: ActionType.PLAY,
        player,
        type,
        length: acceptedSequence.length,
        cards: acceptedSequence,
        positions,
      });

      if (game.checkForWinner()) {
        game.lastWinner = game.players.indexOf(game.currentPlayer!);
        setStartGame(false);
        setIsGameWon(true);
      } else {
        setTurnNumber(turnNumber + 1);
        game.updateRotation(ActionType.PLAY);
      }
    }
  };

  const handlePass = () => {
    // user cannot pass when there is not a combination type
    if (game.combinationType === null || game.currentPlayer !== player) {
      return;
    }

    playerActions.push({
      action: ActionType.PASS,
      player,
    });

    game.updateRotation(ActionType.PASS);
    setTurnNumber(turnNumber + 1);
  };

  const handleStateChange = ({ nativeEvent }: HandlerStateChangeEvent) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      handlePass();
    }
  };

  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      numberOfPointers={1}
      enabled={player === game.currentPlayer}
      onHandlerStateChange={handleStateChange}
    >
      <View style={styles.container}>
        {/* Hand */}
        <View
          style={[
            {
              transform: [
                {
                  translateX:
                    Dimensions.get('window').width / (hand.length + 1),
                },
              ],
            },
          ]}
        >
          {hand.map((card: CardType, idx: number) => {
            return (
              <InteractiveView
                key={`hand-${card.value}-${card.suit}`}
                cardPosition={positions[idx]}
                value={card.value}
                suit={card.suit}
                selected={card.selected}
                hand={hand}
                setHand={setHand}
                handlePlayCards={handlePlayCards}
                isValid={isValid}
              />
            );
          })}
        </View>
        <View style={styles.buttons}>
          <Button
            title='Sort Cards'
            onPress={() => player.playerHand.sort(hand)}
          />
          {/* <Button title='Pass' onPress={handlePass} /> */}
        </View>
      </View>
    </FlingGestureHandler>
  );
});

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    zIndex: 100,
    shadowColor: 'gray',
    shadowOffset: { width: -10, height: 10 },
    shadowRadius: 10,
    transform: [{ translateY: 60 }],
  },
  buttons: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  hand: {
    justifyContent: 'center',
  },
});
