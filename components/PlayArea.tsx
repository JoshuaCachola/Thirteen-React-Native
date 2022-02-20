import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Hand, HandContext } from '../context/HandContext';
import { Card, CardInterface } from '../classes/Card';
import PlayingCard from './PlayingCard';

export default function PlayArea() {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const { hand, setHand } = useContext<Hand>(HandContext);

  useEffect(() => {
    const selected: CardInterface[] = [];
    // hand.forEach((card) => {
    //   if (card.selected) {
    //     selected.push(card);
    //   }
    // });
    hand.forEach((card) => {
      if (card.selected) selected.push(card);
    });
    setCards(selected);
  }, [hand, setHand]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Play Area</Text>
      <View style={styles.cards}>
        {cards &&
          cards.map((card: Card, idx) => {
            return (
              <View key={`played-${card.value}-${card.suit}`}>
                <PlayingCard
                  idx={idx}
                  // key={card.value.toString() + card.suit.toString()}
                  value={card.value}
                  suit={card.suit}
                  selected={card.selected}
                />
              </View>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'blue',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  text: {
    textAlign: 'center',
    color: 'grey',
  },
  cards: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
