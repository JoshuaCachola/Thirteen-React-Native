import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
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
  const handleStateChange = ({ nativeEvent }: HandlerStateChangeEvent) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      handlePlayCards();
    }
  };

  const rollout = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: 0 },
        { translateY: 100 },
        { rotate: '(0, 0, 1, 120)' },
      ],
      opacity: 0,
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
      <Animated.View style={[styles.hand, cardPosition]}>
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
  hand: {
    position: 'absolute',
    right: 0,
  },
});
