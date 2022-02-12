import PlayingCard from "./PlayingCard";
import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Card } from "./PlayingCard";

// This component displays holding two cards
export default function Hand({ cards }: Card[]) {
  const [cardsInHand, setCardsInHand] = useState<Card[]>([]);

  // sets cards on first render
  useEffect(() => {
    setCardsInHand(cards);
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
