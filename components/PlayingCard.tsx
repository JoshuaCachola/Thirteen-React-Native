import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Animated,
} from 'react-native';
import { useState } from 'react';
import useSuit, { CardSuits } from '../hooks/useSuit';
import useColor from '../hooks/useColor';
import FaIcon from '../helper/fontAwsomeHelper';

export interface Card {
  value: number;
  suit: CardSuits;
  selected: boolean;
  // animation: Animated.ValueXY;
}

// Card Component
export default function PlayingCard({ value, suit, selected }: Card) {
  // Handles state of pressing card
  // const [isCardPressed, setCardPressed] = useState(selected);

  // hooks to get card suit and card color
  const cardSuit = useSuit(suit);
  const color = useColor(suit);

  return (
    <View style={styles.container}>
      <View style={styles.front}>
        <Text
          style={[
            { color: `${color}` },
            styles.rankAndSuit,
            styles.topValueAndSuit,
          ]}
        >
          <Text style={styles.value}>{value}</Text>
          <FaIcon size={10} icon={cardSuit} color={color} />
        </Text>
        <Text
          style={[
            { color: `${color}` },
            styles.rankAndSuit,
            styles.bottomValueAndSuit,
          ]}
        >
          <Text style={styles.bottomValue}>{value}</Text>
          <FaIcon size={10} icon={cardSuit} color={color} />
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 75,
    height: 125,
    borderRadius: 8,
    borderColor: '#C5C5C5',
    borderWidth: 1,
    backgroundColor: 'white',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  front: {
    height: '100%',
  },
  rankAndSuit: {
    fontWeight: 'bold',
    fontSize: 12,
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 8,
  },
  topValueAndSuit: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  bottomValueAndSuit: {
    transform: [
      {
        rotateX: '180deg',
      },
    ],
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  selectCard: {
    bottom: 30,
    borderWidth: 10,
    borderColor: 'yellow',
    backgroundColor: 'rgb(0, 0, 200)',
  },
  value: {
    marginLeft: 3,
  },
  bottomValue: {
    marginRight: 5,
    transform: [
      {
        rotateY: '180deg',
      },
    ],
  },
});
