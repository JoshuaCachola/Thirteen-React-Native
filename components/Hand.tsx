import { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { CardInterface } from '../helper/Card';
import InteractiveView from './InteractiveView';
import { HandContext } from '../context/HandContext';

interface Props {
  cards: CardInterface[];
}

// This component displays holding a hand of cards
export default function Hand() {
  const { hand } = useContext(HandContext);

  return (
    <View style={styles.container}>
      {hand.map((card: CardInterface, idx: number) => {
        return (
          <InteractiveView
            key={`hand-${card.value}-${card.suit}`}
            idx={idx}
            card={card}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
});
