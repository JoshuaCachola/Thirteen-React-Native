import { useContext, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CardInterface } from '../helper/Card';
import InteractiveView from './InteractiveView';
import { PlayedCardsContext } from '../context/PlayedCardsContext';
import PlayingCard from './PlayingCard';
import { HandContext } from '../context/HandContext';

interface Props {
  cards: CardInterface[];
}

// This component displays holding a hand of cards
export default function Hand(props: Props) {
  const [cardsInHand, setCardsInHand] = useState<CardInterface[]>(props.cards);
  const playedCards = useContext(PlayedCardsContext);

  // const stageCardsMemo = useMemo(() => {
  //   const selectedCards: CardInterface[] = [];
  //   cardsInHand.forEach((card) => {
  //     if (card.staged) {
  //       cardsInHand.push(card);
  //     }
  //   });
  //   console.log(playedCards);
  // }, [cardsInHand]);

  return (
    <HandContext.Provider value={cardsInHand}>
      <View style={styles.container}>
        {cardsInHand.map((card: CardInterface, idx: number) => {
          // return (
          //   <InteractiveView
          //     key={card.value.toString() + card.suit.toString()}
          //     idx={idx}
          //     card={card}
          //   />
          // );
          <View key={card.value.toString() + card.suit.toString()}>
            <PlayingCard
              value={card.value}
              suit={card.suit}
              staged={card.staged}
              idx={idx}
            />
          </View>;
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
