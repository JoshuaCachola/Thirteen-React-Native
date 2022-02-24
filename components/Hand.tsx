import { useContext, useMemo, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { CardInterface } from '../classes/Card';
import InteractiveView from './InteractiveView';
import { HandContext } from '../context/HandContext';
import { calculatePositions, Position } from '../helper/calculatePositions';
import { PlayFromHandContext } from '../context/PlayFromHandContext';

// This component displays holding a hand of cards
export default function Hand() {
  const { hand, setHand } = useContext(HandContext);
  const { playedCards, setPlayedCards } = useContext(PlayFromHandContext);

  const [positions, setPositions] = useState<Position[]>(() => {
    return calculatePositions(hand.length);
  });

  // recalculates position of cards whenever a player plays a sequence
  // allows hand to be centered
  useMemo(() => {
    const newPositions = calculatePositions(hand.length);
    setPositions(newPositions);
  }, [hand.length]);

  const handlePlayCards = () => {
    const acceptedSequence: string[] = [];
    const newHand: CardInterface[] = [];
    hand.forEach((card) => {
      if (card.selected) {
        card.played === true;
        acceptedSequence.push(`${card.value},${card.suit}`);
      } else {
        newHand.push(card);
      }
    });
    setPlayedCards([...playedCards, acceptedSequence]);
    setHand(newHand);
  };

  return (
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
        {hand.map((card: CardInterface, idx: number) => {
          if (!card.played)
            return (
              <InteractiveView
                key={`hand-${card.value}-${card.suit}`}
                idx={idx}
                card={card}
                cardPosition={positions[idx]}
              />
            );
        })}
      </View>
      <Button title='Play' onPress={() => handlePlayCards()}></Button>
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
  stagedCards: {},
});
