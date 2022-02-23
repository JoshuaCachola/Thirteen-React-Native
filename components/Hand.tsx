import { useContext, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CardInterface } from '../classes/Card';
import InteractiveView from './InteractiveView';
import { HandContext } from '../context/HandContext';
import { calculatePositions, Position } from '../helper/calculatePositions';

// This component displays holding a hand of cards
export default function Hand() {
  const { hand } = useContext(HandContext);
  const [positions, setPositions] = useState<Position[]>(() => {
    return calculatePositions(hand.length);
  });

  useMemo(() => {
    const newPositions = calculatePositions(hand.length);
    setPositions(newPositions);
  }, [hand.length]);

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
      {/* Staged Cards */}
      {/* <StageCards /> */}
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
