import { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { HandContext } from '../context/HandContext';
import { Card } from '../classes/Card';
import PlayingCard from './PlayingCard';

// selected Card component
// - When a card is touched from the hand, modal of selected cards will appear
// - Cards will be in a staging phase before being able to play them
export default function StageCards() {
  const { selectedCards, setselectedCards } = useContext(HandContext);
  const { hand, setHand } = useContext(HandContext);

  const handleOnPress = () => {};

  return (
    <View style={styles.container}>
      {selectedCards.map((card: Card, idx) => {
        return (
          <View key={`selected-${card.value}-${card.value}`}>
            <PlayingCard
              idx={idx}
              value={card.value}
              suit={card.suit}
              selected={card.selected}
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
