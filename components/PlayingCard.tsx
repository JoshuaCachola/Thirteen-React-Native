import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { useContext, useEffect, useMemo, useState } from 'react';
import useSuit from '../hooks/useSuit';
import useColor from '../hooks/useColor';
import FaIcon from '../helper/fontAwsomeHelper';
import { CardSuits } from '../classes/Card';
import { HandContext } from '../context/HandContext';
import { cardValues } from '../helper/sequences';

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
  const [isCardselected, setIsCardselected] = useState(false);

  // hooks to get card suit and card color
  const { hand, setHand, selectedCards, setselectedCards } =
    useContext(HandContext);

  const cardSuit = useSuit(suit);
  const color = useColor(suit);

  // const handleOnPress = () => {
  //   const newHand: CardInterface[] = [];
  //   const selected: CardInterface[] = [];

  //   hand.forEach((card) => {
  //     if (card.value === value && card.suit === suit) {
  //       selected.push(card);
  //     } else {
  //       newHand.push(card);
  //     }
  //   });

  //   setHand(newHand);
  //   setselectedCards(selected);
  // };

  return (
    <TouchableHighlight
      style={[styles.container, isCardselected ? styles.selectCard : null]}
      onPress={() => {
        // handleOnPress();
        setIsCardselected(!isCardselected);
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
    borderColor: 'red',
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
