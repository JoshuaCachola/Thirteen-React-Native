import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Position } from '../helper/calculatePositions';
import { Card, CardInterface } from '../classes/Card';
import PlayingCard from './PlayingCard';
import {
  FlingGestureHandler,
  Directions,
  State,
  HandlerStateChangeEvent,
  GestureEvent,
  FlingGestureHandlerEventPayload,
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
  console.log(x.value, y.value);

  const handleStateChange = ({ nativeEvent }: HandlerStateChangeEvent) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      handlePlayCards();
    }
  };

  const handldeGestureEvent = ({
    nativeEvent,
  }: GestureEvent<FlingGestureHandlerEventPayload>) => {
    switch (nativeEvent.state) {
      case 2: {
        x.value = nativeEvent.x;
        y.value = nativeEvent.y;
        console.log(x.value, y.value);
      }
      case 4: {
        x.value = nativeEvent.x;
        y.value = nativeEvent.y;
        console.log(x.value, y.value);
      }
      default:
        return;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(y.value, {
            duration: 500,
          }),
        },
      ],
    };
  });

  return (
    <FlingGestureHandler
      direction={Directions.UP}
      numberOfPointers={1}
      enabled={card.selected && isValid}
      onGestureEvent={handldeGestureEvent}
      onHandlerStateChange={handleStateChange}
    >
      <Animated.View style={[styles.hand, cardPosition, animatedStyle]}>
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
