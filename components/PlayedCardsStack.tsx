import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CardType } from '../classes/Card';
import { GameContext } from '../context/GameContext';
import PlayingCard from './PlayingCard';

export default function PlayedCardsStack() {
  const { playedCards } = useContext(GameContext);

  return (
    <View style={styles.container}>
      {/* <Text style={[{ color: 'grey' }]}>Pair of 3's</Text> */}
      <View>
        {playedCards &&
          playedCards.map((sequences: CardType[]) => {
            return sequences.map((card: CardType, idx) => {
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
