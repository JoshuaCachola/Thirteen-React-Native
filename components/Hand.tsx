import PlayingCard from "./PlayingCard";
import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Card } from "./PlayingCard";

interface Props {
  cards: Card[];
}

// This component displays holding a hand of cards
export default function Hand(props: Props) {
  const [cardsInHand, setCardsInHand] = useState<Card[]>([]);

  // sets cards on first render
  useEffect(() => {
    setCardsInHand(props.cards);
  }, []);

  return (
    <View style={styles.container}>
      {cardsInHand &&
        cardsInHand.map((card: Card, idx: number) => {
          return (
            <View
              key={card.value + card.suit}
              style={[{ zIndex: idx, left: idx * 40 }, styles.hand]}
            >
              <PlayingCard value={card.value} suit={card.suit} />
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  hand: {
    position: "absolute",
  },
});
