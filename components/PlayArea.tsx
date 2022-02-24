import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Hand, HandContext } from '../context/HandContext';
import { Card, CardInterface } from '../classes/Card';
import PlayingCard from './PlayingCard';
import { PlayFromHandContext } from '../context/PlayFromHandContext';

export default function PlayArea() {
  const [cards, setCards] = useState<CardInterface[]>([]);

  const { playedCards } = useContext(PlayFromHandContext);
  // useMemo(() => {
  //   const selected: CardInterface[] = [];
  //   selectedCards.forEach((card) => {
  //     selected.push(card);
  //   });

  //   setCards(selected);
  // }, [selectedCards]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Play Area</Text>
      <View style={styles.cards}>
        {playedCards.length &&
          playedCards[playedCards.length - 1].map((string, idx) => {
            const cards = string.split(',');
            return (
              <View key={`played-${cards[0]}-${cards[1]}`}>
                <PlayingCard
                  idx={idx}
                  // key={card.value.toString() + card.suit.toString()}
                  value={parseInt(cards[0])}
                  suit={parseInt(cards[1])}
                  selected={false}
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
