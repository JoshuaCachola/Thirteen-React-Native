import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PlayingCard from './PlayingCard';
import { GameContext } from '../context/GameContext';

export default function PlayArea() {
  const { playedCards } = useContext(GameContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Play Area</Text>
      <View style={styles.cards}>
        {playedCards.length !== 0 &&
          playedCards[0].map((card, idx) => {
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
    height: '100%',
  },
  text: {
    textAlign: 'center',
    color: 'grey',
  },
  cards: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
