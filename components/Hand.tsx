import { View, StyleSheet } from 'react-native';
import { CardInterface } from '../helper/Card';
import useCardReducer from '../hooks/useCardReducer';
import DraggableView from './DraggableView';

interface Props {
  cards: CardInterface[];
}

// This component displays holding a hand of cards
export default function Hand(props: Props) {
  const [cardsInHand, dispatch] = useCardReducer({ cards: props.cards });

  return (
    <View style={styles.container}>
      {'cards' in cardsInHand &&
        cardsInHand.cards.map((card: CardInterface, idx: number) => {
          return (
            <DraggableView
              key={card.value.toString() + card.suit.toString()}
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
