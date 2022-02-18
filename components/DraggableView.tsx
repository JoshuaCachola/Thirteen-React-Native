import { useRef, useState } from 'react';
import { Animated, Handle, PanResponder, StyleSheet } from 'react-native';
import { Card } from '../helper/Card';
import PlayingCard from './PlayingCard';

interface DraggableProps {
  card: Card;
  idx: number;
}

// Pan responder hook - allows cards to be dragged around the screen
export default function DraggableView({ card, idx }: DraggableProps) {
  const [dragging, setDraggings] = useState(false);
  const draggableCard = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    // onMoveShouldSetPanResponder: (evt, gestureState) => true,
    // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!
      // gestureState.d{x,y} will be set to zero now
      // draggableCard.setOffset({
      //   x: draggableCard.x._value,
      //   y: draggableCard.y._value,
      // });
    },
    onPanResponderMove:
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
      // console.log(gestureState);
      Animated.event([null, { dx: draggableCard.x, dy: draggableCard.y }], {
        useNativeDriver: false,
      }),
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
      Animated.spring(draggableCard, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // Another component has become the responder, so this gesture
      // should be cancelled
    },
    // onShouldBlockNativeResponder: (evt, gestureState) => {
    //   // Returns whether this component should block native components from becoming the JS
    //   // responder. Returns true by default. Is currently only supported on android.
    //   return true;
    // },
  });

  return (
    <Animated.View
      style={[
        styles.hand,
        {
          zIndex: idx,
          left: idx * 40,
          transform: [
            { translateX: draggableCard.x },
            { translateY: draggableCard.y },
          ],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <PlayingCard value={card.value} suit={card.suit} />
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
