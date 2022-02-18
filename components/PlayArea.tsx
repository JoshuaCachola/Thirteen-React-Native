import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../helper/Card';
import PlayingCard from './PlayingCard';

export default function PlayArea() {
  const [cards, setCards] = useState<Card[]>([
    {
      value: 3,
      suit: 0,
    },
    {
      value: 4,
      suit: 1,
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Play Area</Text>
      <View style={styles.cards}>
        {cards &&
          cards.map((card: Card) => {
            return (
              // <View key={card.value.toString() + card.suit.toString()}>
              <PlayingCard
                key={card.value.toString() + card.suit.toString()}
                value={card.value}
                suit={card.suit}
              />
              // </View>
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
