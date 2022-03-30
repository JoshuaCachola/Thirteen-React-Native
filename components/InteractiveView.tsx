import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Position } from '../helper/calculatePositions';
import { CardType } from '../classes/Card';
import PlayingCard from './PlayingCard';
import {
  FlingGestureHandler,
  Directions,
  State,
  HandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import { PlayerInterface } from '../classes/Player';

interface InteractiveProps {
  value: number;
  suit: number;
  selected: boolean;
  cardPosition: Position;
  hand: CardType[];
  handlePlayCards: () => void;
  isValid: boolean;
  setHand: (h: CardType[]) => void;
}

export default function InteractiveView({
  value,
  suit,
  selected,
  cardPosition,
  handlePlayCards,
  setHand,
  isValid,
  hand,
}: InteractiveProps) {
  const translateY = useSharedValue(0);
  const rotateZ = useSharedValue(0);

  const handleStateChange = ({ nativeEvent }: HandlerStateChangeEvent) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      setTimeout(() => {
        handlePlayCards();
      }, 1000);
    }
  };

  const rollout = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { rotate: rotateZ.value + 'deg' },
      ],
    };
  });

  const handleOnPress = () => {
    if (!hand) return;
    const newHand: CardType[] = hand.map((card) => {
      if (card.value === value && card.suit === suit) {
        card.handleSelected();
      }
      return card;
    });

    setHand(newHand);
  };

  return (
    <FlingGestureHandler
      direction={Directions.UP}
      numberOfPointers={1}
      enabled={selected && isValid}
      onHandlerStateChange={handleStateChange}
    >
      <Animated.View style={[styles.card, cardPosition]}>
        <PlayingCard
          value={value}
          suit={suit}
          isValid={isValid}
          handleOnPress={handleOnPress}
        />
      </Animated.View>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    right: 0,
  },
});
