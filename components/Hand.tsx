import { useContext, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CardType } from '../classes/Card';
import InteractiveView from './InteractiveView';
import { calculatePositions, Position } from '../helper/calculatePositions';
import {
  getHighestCard,
  isValidCombination,
} from '../helper/combinationHelpers';
import { GameContext } from '../context/GameContext';
import { HandContext } from '../context/HandContext';
import Button from './Button';
import { PlayerInterface } from '../classes/Player';
import { observer } from 'mobx-react-lite';
import { ActionType } from '../constants/Actions';

interface props {
  player: PlayerInterface;
}

// This component displays holding a hand of cards
export default observer(function Hand({ player }: props) {
  const { game, playerActions } = useContext(GameContext);
  const [hand, setHand] = useState<CardType[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);

  // useEffect to update hand useState and positions state
  useEffect(() => {
    setHand(player.hand);
    setPositions(calculatePositions(player.hand.length));
  }, [player.hand]);

  // recalculates position of cards whenever a player plays a sequence
  // allows hand to be centered
  useMemo(() => {
    const newPositions = calculatePositions(hand.length);
    setPositions(newPositions);
  }, [hand.length]);

  // filter selected cards from hand and check if
  // it is a valid combination
  useMemo(() => {
    const selected = hand.filter((card) => card.selected);
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
  const handlePlayCards = () => {
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
      game.combinationType = type;
      game.length = acceptedSequence.length;
      game.updateHighestCard(acceptedSequence);
      player.hand = newHand;

      // unshift to played Cards
      playerActions.unshift({
        action: ActionType.PLAY,
        player,
        type,
        length: acceptedSequence.length,
        cards: acceptedSequence,
      });

      game.updateRotation(ActionType.PLAY);
    }
  };

  const handlePass = () => {
    game.updateRotation(ActionType.PASS);
  };

  return (
    <HandContext.Provider value={{ hand, setHand }}>
      <View style={styles.container}>
        {/* Hand */}
        <View
          style={[
            styles.hand,
            {
              transform: [{ translateX: -20 * hand.length }, { translateY: 0 }],
            },
          ]}
        >
          {hand.map((card: CardType, idx: number) => {
            return (
              <InteractiveView
                key={`hand-${card.value}-${card.suit}`}
                card={card}
                cardPosition={positions[idx]}
                handlePlayCards={handlePlayCards}
                isValid={isValid}
              />
            );
          })}
        </View>
        <Button title='Sort Cards' onPress={() => player.sort()} />
        <Button title='Pass' onPress={handlePass} />
      </View>
    </HandContext.Provider>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  hand: {
    marginVertical: 0,
    marginHorizontal: 'auto',
  },
});
