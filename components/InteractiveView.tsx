import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { Position } from '../helper/calculatePositions';
import { CardInterface } from '../classes/Card';
import PlayingCard from './PlayingCard';
import {
  FlingGestureHandler,
  Directions,
  State,
  HandlerStateChangeEvent,
} from 'react-native-gesture-handler';

interface InteractiveProps {
  card: CardInterface;
  idx: number;
  cardPosition: Position;
  handlePlayCards: () => void;
  isValid: boolean;
}

export default function InteractiveView({
  card,
  idx,
  cardPosition,
  handlePlayCards,
  isValid,
}: InteractiveProps) {
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
