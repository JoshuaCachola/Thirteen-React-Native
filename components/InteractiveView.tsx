import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Position } from '../helper/calculatePositions';
import { Card, CardInterface } from '../classes/Card';
import PlayingCard from './PlayingCard';
import {
  FlingGestureHandler,
  Directions,
  State,
  HandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import { useContext } from 'react';
import { PlayFromHandContext } from '../context/PlayFromHandContext';

interface InteractiveProps {
  card: CardInterface;
  idx: number;
  cardPosition: Position;
  handlePlayCards: () => void;
  isValid: boolean;
}

// Pan responder hook - allows cards to be dragged around the screen
export default function InteractiveView({
  card,
  idx,
  cardPosition,
  handlePlayCards,
  isValid,
}: InteractiveProps) {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const handleStateChange = ({ nativeEvent }: HandlerStateChangeEvent) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      handlePlayCards();
    }
  };

  return (
    <FlingGestureHandler
      direction={Directions.UP}
      numberOfPointers={1}
      enabled={card.selected && isValid}
      // onHandlerStateChange={handlePlayCards}
      // onGestureEvent={onGestureEvent}
      onHandlerStateChange={handleStateChange}
    >
      <Animated.View style={[styles.hand, cardPosition]}>
        <PlayingCard
          idx={idx}
          value={card.value}
          suit={card.suit}
          selected={card.selected}
          isValid={isValid}
        />
      </Animated.View>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  hand: {
    position: 'absolute',
    right: 0,
  },
});
