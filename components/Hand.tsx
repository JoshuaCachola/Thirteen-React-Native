import { useContext, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { CardType } from '../classes/Card';
import InteractiveView from './InteractiveView';
import {
  calculatePositions,
  getRandTop,
  getRandLeft,
  getRandRotation,
  Position,
} from '../helper/calculatePositions';
import { isValidCombination } from '../helper/combinationHelpers';
import { GameContext } from '../context/GameContext';
import Button from './Button';
import { PlayerInterface } from '../classes/Player';
import { observer } from 'mobx-react-lite';
import { ActionType } from '../constants/Actions';

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
    top: number;
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
      playerActions.unshift({
        action: ActionType.PLAY,
        player,
        type,
        length: acceptedSequence.length,
        cards: acceptedSequence,
        positions,
      });

      if (game.checkForWinner()) {
        setStartGame(false);
        setIsGameWon(true);
      }

      setTurnNumber(turnNumber + 1);
      game.updateRotation(ActionType.PLAY);
    }
  };

  const handlePass = () => {
    game.updateRotation(ActionType.PASS);
  };

  return (
    <View style={styles.container}>
      {/* Hand */}
      <View
        style={[
          {
            transform: [
              {
                translateX: 30 * (13 - hand.length + 1),
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
        <Button title='Pass' onPress={handlePass} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // flexDirection: 'column',
  },
  proof: {
    position: 'absolute',
    bottom: 200,
    left: 350,
    // top: 0,
    zIndex: 200,
  },
  buttons: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});
