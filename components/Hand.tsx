import PlayingCard from "./PlayingCard";
import { View, StyleSheet } from "react-native";
import { Card } from "./PlayingCard";
import useCardReducer from "../hooks/useCardReducer";

interface Props {
  cards: Card[];
}

// This component displays holding a hand of cards
export default function Hand(props: Props) {
  const [cardsInHand, dispatch] = useCardReducer({cards: props.cards});

  return (
    <View style={styles.container}>
      {"cards" in cardsInHand &&
        cardsInHand.cards.map((card: Card, idx: number) => {
          return (
            <View
              key={idx}
              style={[{ zIndex: idx, left: idx * 40 }, styles.hand]}
            >
              <PlayingCard value={card.value} suit={card.suit} selected={card.selected} />
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
    bottom: 0,
    right: 0,
    transform: [
      {
        translateX: 50
      }
    ]
  },
});
