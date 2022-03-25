import { useContext, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CardType } from '../classes/Card';
import InteractiveView from './InteractiveView';
import { calculatePositions, Position } from '../helper/calculatePositions';
import { isValidCombination } from '../helper/combinationHelpers';
import { GameContext } from '../context/GameContext';
import { HandContext } from '../context/HandContext';

interface props {
  playerIdx: number;
}

// This component displays holding a hand of cards
export default function Hand({ playerIdx }: props) {
  const { hands, combinationType, highestCard, length } =
    useContext(GameContext);
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

  useMemo(() => {
    const selected = hand.filter((card) => card.selected);
    const [isValid, _] = isValidCombination(
      selected,
      combinationType,
      highestCard,
      length
    );
    setIsValid(isValid);
  }, hand);

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
    // setPlayedCards([...playedCards, acceptedSequence]);
    // setHand(newHand);
    // game.playCards(acceptedSequence);
  };

  // const handleSortCards = () => {
  //   const sorted = sortCards(hand!);
  //   setHand([...sorted]);
  // };

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
        {/* <Button title='Sort Cards' onPress={handleSortCards} /> */}
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
