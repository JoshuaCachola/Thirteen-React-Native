import { Animated, StyleSheet } from 'react-native';
import { Position } from '../helper/calculatePositions';
import { Card } from '../classes/Card';
import PlayingCard from './PlayingCard';

interface InteractiveProps {
  card: Card;
  idx: number;
  cardPosition: Position;
}

// Pan responder hook - allows cards to be dragged around the screen
export default function InteractiveView({
  card,
  idx,
  cardPosition,
}: InteractiveProps) {
  return (
    <Animated.View style={[styles.hand, cardPosition]}>
      <PlayingCard
        idx={idx}
        value={card.value}
        suit={card.suit}
        selected={card.selected}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  hand: {
    position: 'absolute',
    right: 0,
    transform: [
      {
        translateX: 50,
      },
    ],
  },
});
