import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  getRandLeft,
  getRandRotation,
  getRandBottom,
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
import { useState } from 'react';
import SelectedCard from './SelectedCard';

interface InteractiveProps {
  value: number;
  suit: number;
  selected: boolean;
  cardPosition: Position;
  hand: CardType[];
  handlePlayCards: (p: {
    left: number;
    bottom: number;
    rotate: string;
  }) => void;
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
  const [isCardSelected, setIsCardSelected] = useState(false);
  const translateY = useSharedValue(0);
  const rotateZ = useSharedValue(0);

  const handleStateChange = ({ nativeEvent }: HandlerStateChangeEvent) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      const positions = {
        bottom: getRandBottom(),
        left: getRandLeft(),
        rotate: getRandRotation() + 'deg',
      };

      // translateY.value = withTiming(-1000, { duration: 1000 });
      // setTimeout(() => {
      //   handlePlayCards(positions);
      // }, 1000);
      handlePlayCards(positions);
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
    if (!hand) {
      return;
    }

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
            top: cardPosition.top,
            left: cardPosition.left,
            zIndex: cardPosition.zIndex,
          },
        ]}
      >
        <Pressable
          onPress={() => {
            if (handleOnPress) {
              handleOnPress();
              setIsCardSelected(!isCardSelected);
            }
          }}
        >
          <SelectedCard isValid={isValid} isSelected={isCardSelected}>
            <PlayingCard value={value} suit={suit} size={18} />
          </SelectedCard>
        </Pressable>
      </Animated.View>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
  },
  container: {
    width: 90,
    height: 125,
    borderRadius: 8,
    borderColor: '#C5C5C5',
    borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOffset: { width: -10, height: 10 },
    shadowOpacity: 0.2,
  },
});
