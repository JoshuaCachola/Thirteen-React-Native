import { Animated, StyleSheet } from 'react-native';
import { Card } from '../helper/Card';
import PlayingCard from './PlayingCard';

interface InteractiveProps {
  card: Card;
  idx: number;
}

// Pan responder hook - allows cards to be dragged around the screen
export default function InteractiveView({ card, idx }: InteractiveProps) {
  return (
    <Animated.View
      style={[
        styles.hand,
        {
          zIndex: idx,
          left: idx * 40,
        },
      ]}
    >
      <PlayingCard
        idx={idx}
        value={card.value}
        suit={card.suit}
        staged={card.staged}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  hand: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [
      {
        translateX: 50,
      },
    ],
  },
});
