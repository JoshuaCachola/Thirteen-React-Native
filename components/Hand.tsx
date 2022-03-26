import { useContext, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CardType } from '../classes/Card';
import InteractiveView from './InteractiveView';
import { calculatePositions, Position } from '../helper/calculatePositions';
import {
  getHighestCard,
  isValidCombination,
  sortCards,
} from '../helper/combinationHelpers';
import { GameContext } from '../context/GameContext';
import { HandContext } from '../context/HandContext';
import Button from './Button';
import { ActionType, updateRotation } from '../classes/GameState';

interface props {
  playerIdx: number;
}

// This component displays holding a hand of cards
export default function Hand({ playerIdx }: props) {
  const {
    hands,
    setHands,
    combinationType,
    highestCard,
    length,
    setPlayedCards,
    playedCards,
    players,
    playerRotation,
    setCombinationType,
    setPlayerRotation,
    setCurrentPlayer,
    setHighestCard,
    turnNumber,
    setTurnNumber,
    setLength,
  } = useContext(GameContext);

  const [hand, setHand] = useState(hands[playerIdx]);
  const [isValid, setIsValid] = useState(false);
  const [positions, setPositions] = useState<Position[]>(() => {
    return calculatePositions(hands[playerIdx].length);
  });

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
      combinationType,
      highestCard,
      length
    );
    setIsValid(isValid);
  }, [hand]);

  // handles playing cards when cards are selected
  // and play button is pressed
  const handlePlayCards = () => {
    const acceptedSequence: CardType[] = [];
    const newHand: CardType[] = [];

    hands[playerIdx].forEach((card) => {
      if (card.selected) {
        acceptedSequence.push(card);
      } else {
        newHand.push(card);
      }
      card.selected = false;
    });

    const [_, type] = isValidCombination(
      acceptedSequence,
      combinationType,
      highestCard,
      acceptedSequence.length
    );

    setCombinationType(type);
    setLength(acceptedSequence.length);

    hands[playerIdx] = newHand;
    setHands([...hands]);
    setHand([...newHand]);
    setPlayedCards([acceptedSequence, ...playedCards]);
    setHighestCard(getHighestCard(acceptedSequence));
    const payload = updateRotation(ActionType.PLAY, playerRotation, players);

    if ('combinationType' in payload) {
      setCombinationType(payload.combinationType!);
    }
    setCurrentPlayer(payload.currentPlayer!);
    setPlayerRotation(payload.playerRotation);
    setTurnNumber(turnNumber + 1);
  };

  const handleSortCards = () => {
    const sorted = sortCards(hand!);
    setHand([...sorted]);
  };

  const handlePass = () => {
    const payload = updateRotation(ActionType.PASS, playerRotation, players);
    if ('combinationType' in payload) {
      setCombinationType(payload.combinationType!);
    }
    setCurrentPlayer(payload.currentPlayer!);
    setPlayerRotation(payload.playerRotation);
    setTurnNumber(turnNumber + 1);
  };

  return (
    <HandContext.Provider value={{ hand, setHand }}>
      <View style={styles.container}>
        {/* Hand */}
        <View
          style={[
            styles.hand,
            {
              transform: [
                { translateX: -20 * hands[playerIdx].length },
                { translateY: 0 },
              ],
            },
          ]}
        >
          {hands[playerIdx].map((card: CardType, idx: number) => {
            return (
              <InteractiveView
                key={`hand-${card.value}-${card.suit}`}
                idx={idx}
                card={card}
                cardPosition={positions[idx]}
                handlePlayCards={handlePlayCards}
                isValid={isValid}
                playerIdx={playerIdx}
              />
            );
          })}
        </View>
        <Button title='Sort Cards' onPress={handleSortCards} />
        <Button title='Pass' onPress={handlePass} />
      </View>
    </HandContext.Provider>
  );
}

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
