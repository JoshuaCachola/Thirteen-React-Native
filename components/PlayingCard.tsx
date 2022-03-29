import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { useContext, useState } from 'react';
import useSuit from '../hooks/useSuit';
import useColor from '../hooks/useColor';
import FaIcon from '../helper/fontAwsomeHelper';
import { CardType, CardSuits } from '../classes/Card';
import { HandContext } from '../context/HandContext';
import { cardValues } from '../helper/combinationHelpers';

interface PlayingCardProp {
  value: number;
  suit: CardSuits;
  isValid?: boolean;
  handleOnPress?: () => void;
}

// Card Component
export default function PlayingCard({
  value,
  suit,
  isValid,
  handleOnPress,
}: PlayingCardProp) {
  // Handles state of pressing card
  const [isCardSelected, setIsCardSelected] = useState(false);

  // hooks to get card suit and card color
  const cardSuit = useSuit(suit);
  const color = useColor(suit);

  return (
    <TouchableHighlight
      style={[
        styles.container,
        isCardSelected && styles.selectCard,
        isCardSelected && isValid && styles.validSelect,
        isCardSelected && !isValid && styles.invalidSelect,
      ]}
      onPress={() => {
        if (handleOnPress) {
          handleOnPress();
          setIsCardSelected(!isCardSelected);
        }
      }}
    >
      <View style={styles.front}>
        <View style={[styles.rankAndSuit, styles.topValueAndSuit]}>
          <Text style={[{ color }, styles.value]}>{cardValues[value]}</Text>
          <Text>
            <FaIcon size={10} icon={cardSuit} color={color} />
          </Text>
        </View>
        <View style={[styles.rankAndSuit, styles.bottomValueAndSuit]}>
          <Text style={[{ color }, styles.bottomValue]}>
            {cardValues[value]}
          </Text>
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
    borderWidth: 2,
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
  invalidSelect: {
    borderColor: 'red',
    borderStyle: 'dashed',
  },
  validSelect: {
    borderColor: 'green',
    borderStyle: 'solid',
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
