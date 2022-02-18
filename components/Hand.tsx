import { useEffect, useReducer, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Card, CardInterface } from '../helper/Card';
import handReducer from '../reducers/handReducer';
import InteractiveView from './InteractiveView';
import { HandState } from '../reducers/handReducer';
interface Props {
  cards: CardInterface[];
}

const initialState: HandState = {
  cards: [],
};

// This component displays holding a hand of cards
export default function Hand(props: Props) {
  // const [cardsInHand, dispatch] = useReducer(handReducer, initialState);
  const [cardsInHand, setCardsInHand] = useState(props.cards);
  const [selectedCards, setSelectedCards] = useState<boolean[]>([]);

  return (
    <View style={styles.container}>
      {cardsInHand.map((card: CardInterface, idx: number) => {
        return (
          <InteractiveView
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
