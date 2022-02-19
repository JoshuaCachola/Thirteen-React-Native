import { useContext, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CardInterface } from '../helper/Card';
import InteractiveView from './InteractiveView';
import PlayingCard from './PlayingCard';
import { HandContext } from '../context/HandContext';

interface Props {
  cards: CardInterface[];
}

// This component displays holding a hand of cards
export default function Hand(props: Props) {
  const [cardsInHand, setCardsInHand] = useState<CardInterface[]>(props.cards);

  return (
    <HandContext.Provider value={cardsInHand}>
      <View style={styles.container}>
        {cardsInHand.map((card: CardInterface, idx: number) => {
          return (
            <InteractiveView
              key={`hand-${card.value}-${card.suit}`}
              idx={idx}
              card={card}
            />
          );
        })}
      </View>
    </HandContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
});
