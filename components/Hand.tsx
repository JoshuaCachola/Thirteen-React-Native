import { useContext, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CardType } from '../classes/Card';
import InteractiveView from './InteractiveView';
import { calculatePositions, Position } from '../helper/calculatePositions';
import { sortCards } from '../helper/combinationHelpers';
import Button from './Button';
import { GameContext } from '../context/GameContext';

interface props {
  playerIdx: number;
}

// This component displays holding a hand of cards
export default function Hand({ playerIdx }: props) {
  const { hands } = useContext(GameContext);
  const [isValid, setIsValid] = useState(false);
  const [positions, setPositions] = useState<Position[]>(() => {
    return calculatePositions(hands[playerIdx].length);
  });

  // recalculates position of cards whenever a player plays a sequence
  // allows hand to be centered
  useMemo(() => {
    const newPositions = calculatePositions(hands[playerIdx].length);
    setPositions(newPositions);
  }, [hands[playerIdx].length]);

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
            />
          );
        })}
      </View>
      {/* <Button title='Sort Cards' onPress={handleSortCards} /> */}
    </View>
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
  // card: {
  //   position: 'absolute',
  //   right: 0,
  //   transform: [
  //     {
  //       translateX: 50,
  //     },
  //   ],
  // },
});
