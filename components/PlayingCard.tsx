import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { useContext, useEffect, useMemo, useState } from 'react';
import useSuit from '../hooks/useSuit';
import useColor from '../hooks/useColor';
import FaIcon from '../helper/fontAwsomeHelper';
import { CardInterface, CardSuits } from '../classes/Card';
import { HandContext } from '../context/HandContext';
import { cardValues, isValidCombination } from '../helper/combinationHelpers';

interface PlayingCardProp {
  idx: number;
  value: number;
  suit: CardSuits;
  selected: boolean;
}

// Card Component
export default function PlayingCard({
  idx,
  value,
  suit,
  selected,
}: PlayingCardProp) {
  // Handles state of pressing card
  const [isCardSelected, setIsCardSelected] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const { hand, setHand, selectedCards, setSelectedCards } =
    useContext(HandContext);

  // hooks to get card suit and card color
  const cardSuit = useSuit(suit);
  const color = useColor(suit);

  const handleOnPress = () => {
    const newHand: CardInterface[] = [];

    hand.forEach((card) => {
      if (card.value === value && card.suit === suit) {
        card.selected = !card.selected;
      }
      newHand.push(card);
    });
    setHand(newHand);
  };

  useMemo(() => {
    const selected = hand.filter((card) => card.selected);
    const isCombinationValid = isValidCombination(selected);
    setIsValid(isCombinationValid);
  }, [hand]);

  return (
    <TouchableHighlight
      style={[
        styles.container,
        isCardSelected && styles.selectCard,
        isCardSelected && isValid && styles.validSelect,
        isCardSelected && !isValid && styles.invalidSelect,
      ]}
      onPress={() => {
        handleOnPress();
        setIsCardSelected(!isCardSelected);
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
