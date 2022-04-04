import { View, StyleSheet, Text } from 'react-native';
import useSuit from '../hooks/useSuit';
import useColor from '../hooks/useColor';
import FaIcon from '../helper/fontAwsomeHelper';
import { CardSuits } from '../classes/Card';
import { cardValues } from '../helper/combinationHelpers';

interface PlayingCardProp {
  value: number;
  suit: CardSuits;
  size: number;
}

// Card Component
export default function PlayingCard({ value, suit, size }: PlayingCardProp) {
  // hooks to get card suit and card color
  const cardSuit = useSuit(suit);
  const color = useColor(suit);

  return (
    <View style={styles.front}>
      <View style={[styles.rankAndSuit, styles.topValueAndSuit]}>
        <Text style={[{ color, fontSize: size }, styles.value]}>
          {cardValues[value]}
        </Text>
        <Text>
          <FaIcon size={size} icon={cardSuit} color={color} />
        </Text>
      </View>
      <View style={[styles.rankAndSuit, styles.bottomValueAndSuit]}>
        <Text style={[{ color, fontSize: size }, styles.bottomValue]}>
          {cardValues[value]}
        </Text>
        <Text>
          <FaIcon size={size} icon={cardSuit} color={color} />
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  front: {
    height: '100%',
  },
  rankAndSuit: {
    fontWeight: 'bold',
    // fontSize: 12,
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
    flex: 1,
  },
  value: {
    marginLeft: 1,
    marginBottom: 2,
  },
  bottomValue: {
    marginRight: 3,
    transform: [
      {
        rotateY: '180deg',
      },
    ],
  },
});
