import { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { HandContext } from '../context/HandContext';
import { Card } from '../helper/Card';
import PlayingCard from './PlayingCard';

// Staged Card component
// - When a card is touched from the hand, modal of staged cards will appear
// - Cards will be in a staging phase before being able to play them
export default function StageCards() {
  const { stagedCards, setStagedCards } = useContext(HandContext);
  const { hand, setHand } = useContext(HandContext);

  const handleOnPress = () => {};

  return (
    <View style={styles.container}>
      {stagedCards.map((card: Card, idx) => {
        return (
          <View key={`staged-${card.value}-${card.value}`}>
            <PlayingCard
              idx={idx}
              value={card.value}
              suit={card.suit}
              staged={card.staged}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '40%',
    height: 180,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'yellow',
    borderStyle: 'dashed',
  },
});
