import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CardsContext } from '../context/CardsContext';
import { Card, CardInterface } from '../helper/Card';
import PlayingCard from './PlayingCard';

export default function PlayArea() {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const { hand, setHand } = useContext(CardsContext);

  useEffect(() => {
    const staged: CardInterface[] = [];
    // hand.forEach((card) => {
    //   if (card.staged) {
    //     staged.push(card);
    //   }
    // });
    hand.forEach((card) => {
      if (card.staged) staged.push(card);
    });
    setCards(staged);
  }, [hand, setHand]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Play Area</Text>
      <View style={styles.cards}>
        {cards &&
          cards.map((card: Card, idx) => {
            return (
              <View key={`played-${card.value}-${card.suit}`}>
                <PlayingCard
                  idx={idx}
                  // key={card.value.toString() + card.suit.toString()}
                  value={card.value}
                  suit={card.suit}
                  staged={card.staged}
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
    borderColor: 'blue',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  text: {
    textAlign: 'center',
    color: 'grey',
  },
  cards: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
