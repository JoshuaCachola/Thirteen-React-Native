import PlayingCard from './PlayingCard';
import { View, StyleSheet } from 'react-native';
import { Card } from './PlayingCard';
import useCardReducer from '../hooks/useCardReducer';
import DraggableView from './DraggableView';

interface Props {
  cards: Card[];
}

// This component displays holding a hand of cards
export default function Hand(props: Props) {
  const [cardsInHand, dispatch] = useCardReducer({ cards: props.cards });

  return (
    <View style={styles.container}>
      {'cards' in cardsInHand &&
        cardsInHand.cards.map((card: Card, idx: number) => {
          return <DraggableView key={idx} idx={idx} card={card} />;
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'blue',
  },
});
