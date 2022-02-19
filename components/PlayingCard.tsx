import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { useContext, useEffect, useMemo, useState } from 'react';
import useSuit from '../hooks/useSuit';
import useColor from '../hooks/useColor';
import FaIcon from '../helper/fontAwsomeHelper';
import { CardInterface, CardSuits } from '../helper/Card';
import { CardsContext } from '../context/CardsContext';

interface PlayingCardProp {
  idx: number;
  value: number;
  suit: CardSuits;
  staged: boolean;
}

// Card Component
export default function PlayingCard({
  idx,
  value,
  suit,
  staged,
}: PlayingCardProp) {
  // Handles state of pressing card
  const [isCardStaged, setIsCardStaged] = useState(false);

  // hooks to get card suit and card color
  const { hand, setHand } = useContext(CardsContext);

  const cardSuit = useSuit(suit);
  const color = useColor(suit);

  const handlePress = (idx: number) => {
    const newHand = [...hand];
    newHand[idx].staged = !newHand[idx].staged;
    setHand(newHand);
  };

  console.log(hand);
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={() => {
        handlePress(idx);
      }}
    >
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
    </TouchableHighlight>
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
  selectCard: {
    bottom: 30,
    borderWidth: 10,
    borderColor: 'yellow',
    backgroundColor: 'rgb(0, 0, 200)',
  },
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
