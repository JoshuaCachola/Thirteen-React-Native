import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../helper/Card';
import PlayingCard from './PlayingCard';

export default function PlayedCardsStack() {
  const [playedCards, setPlayedCards] = useState<Card[][]>([
    [
      { value: 3, suit: 2 },
      { value: 3, suit: 3 },
    ],
  ]);

  return (
    <View style={styles.container}>
      <Text style={[{ color: 'grey' }]}>Pair of 3's</Text>
      <View>
        {playedCards &&
          playedCards.map((sequences: Card[]) => {
            return sequences.map((card: Card) => {
              return (
                <View key={card.value.toString() + card.suit.toString()}>
                  <PlayingCard value={card.value} suit={card.suit} />
                </View>
              );
            });
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
