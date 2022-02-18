import { View, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import useSuit from '../hooks/useSuit';
import useColor from '../hooks/useColor';
import FaIcon from '../helper/fontAwsomeHelper';
import { CardInterface } from '../helper/Card';

// Card Component
export default function PlayingCard({ value, suit }: CardInterface) {
  // Handles state of pressing card
  // const [isCardPressed, setCardPressed] = useState(selected);

  // hooks to get card suit and card color
  const cardSuit = useSuit(suit);
  const color = useColor(suit);

  return (
    <View style={styles.container}>
      <View style={styles.front}>
        <View style={[styles.rankAndSuit, styles.topValueAndSuit]}>
          <Text style={[{ color }, styles.value]}>{value}</Text>
          <Text>
            <FaIcon size={10} icon={cardSuit} color={color} />
          </Text>
        </View>
        <View style={[styles.rankAndSuit, styles.bottomValueAndSuit]}>
          <Text style={[{ color }, styles.bottomValue]}>{value}</Text>
          <Text>
            <FaIcon size={10} icon={cardSuit} color={color} />
          </Text>
        </View>
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
    flex: 1,
  },
  // selectCard: {
  //   bottom: 30,
  //   borderWidth: 10,
  //   borderColor: 'yellow',
  //   backgroundColor: 'rgb(0, 0, 200)',
  // },
  value: {
    margin: 1,
  },
  bottomValue: {
    marginRight: 1,
    transform: [
      {
        rotateY: '180deg',
      },
    ],
  },
});
