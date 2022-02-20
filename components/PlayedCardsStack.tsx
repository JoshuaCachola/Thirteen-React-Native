import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CardInterface } from '../classes/Card';
import PlayingCard from './PlayingCard';

export default function PlayedCardsStack() {
  const [playedCards, setPlayedCards] = useState<CardInterface[][]>([
    // [
    //   { value: 3, suit: 2, selected: true },
    //   { value: 3, suit: 3, selected: true },
    // ],
    [],
  ]);

  return (
    <View style={styles.container}>
      <Text style={[{ color: 'grey' }]}>Pair of 3's</Text>
      <View>
        {playedCards &&
          playedCards.map((sequences: CardInterface[]) => {
            return sequences.map((card: CardInterface, idx) => {
              return (
                <View key={card.value.toString() + card.suit.toString()}>
                  <PlayingCard
                    idx={idx}
                    value={card.value}
                    suit={card.suit}
                    selected={card.selected}
                  />
                </View>
              );
            });
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
