import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  getRandLeft,
  getRandRotation,
  getRandTop,
  Position,
} from '../helper/calculatePositions';
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
  handlePlayCards: (p: { left: number; top: number; rotate: string }) => void;
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
      const positions = {
        top: getRandTop(),
        left: getRandLeft(),
        rotate: getRandRotation() + 'deg',
      };

      translateY.value = withTiming(-1000, { duration: 1000 });
      setTimeout(() => {
        handlePlayCards(positions);
      }, 1000);
    }
  };

  const rollout = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { rotateZ: rotateZ.value + 'deg' },
        { rotate: cardPosition.transform[0].rotate },
        { perspective: cardPosition.transform[1].perspective },
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
      <Animated.View
        style={[
          styles.card,
          rollout,
          {
            bottom: cardPosition.bottom,
            left: cardPosition.left,
            zIndex: cardPosition.zIndex,
          },
        ]}
      >
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
  },
});
