import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PlayingCard from './PlayingCard';
import { PlayFromHandContext } from '../context/PlayFromHandContext';

export default function PlayArea() {
  const { playedCards } = useContext(PlayFromHandContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Play Area</Text>
      <View style={styles.cards}>
        {playedCards.length !== 0 &&
          playedCards[playedCards.length - 1].map((card, idx) => {
            return (
              <View key={`played-${card.value}-${card.suit}`}>
                <PlayingCard
                  idx={idx}
                  value={card.value}
                  suit={card.suit}
                  selected={false}
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
