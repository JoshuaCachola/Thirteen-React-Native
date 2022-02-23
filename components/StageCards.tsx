import { useContext, useState } from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import { HandContext } from '../context/HandContext';
import { Card } from '../classes/Card';
import PlayingCard from './PlayingCard';

// selected Card component
// - When a card is touched from the hand, modal of selected cards will appear
// - Cards will be in a staging phase before being able to play them
export default function StageCards() {
  const { selectedCards, setSelectedCards } = useContext(HandContext);
  const { hand, setHand } = useContext(HandContext);
  const [isValidSeq, setIsValidSeq] = useState(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType='fade'
        transparent={false}
        visible={isValidSeq}
        onRequestClose={() => setIsValidSeq(!isValidSeq)}
      >
        {/* {selectedCards.map((card: Card, idx) => {
          return (
            <View key={`selected-${card.value}-${card.value}`}> */}
        {/* <PlayingCard
                idx={idx}
                value={card.value}
                suit={card.suit}
                selected={card.selected}
              /> */}
        <Text>hello</Text>
        {/* </View>
          ); */}
        {/* })} */}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
