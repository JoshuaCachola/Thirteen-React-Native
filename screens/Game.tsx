import { StyleSheet, Text } from 'react-native';
import { View } from '../components/Themed';
import Hand from '../components/Hand';
import { useEffect, useRef, useState } from 'react';
import { Deck } from '../helper/Deck';
import { CardInterface } from '../helper/Card';

export default function Game() {
  const [cards, setCards] = useState<CardInterface[]>(() => {
    const { deck } = new Deck();
    return deck.slice(0, 14);
  });

  // const playArea = useRef(null);

  // useEffect(() => {
  //   const { deck } = new Deck();

  //   setCards(deck.slice(0, 14));
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.playedCardsArea}>
        <Text>Play Area</Text>
      </View>
      <View style={styles.hand}>
        <Hand cards={cards} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  playedCardsArea: {
    flex: 1,
    // justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'red',
    backgroundColor: 'blue',
    // width: '100%',
    // height: 100,
    // transform: [
    //   {
    //     translateX: 180,
    //   },
    // ],
  },
  hand: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
