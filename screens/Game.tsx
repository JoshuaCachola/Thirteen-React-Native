import { Animated, StyleSheet, Text } from "react-native";
import { Card } from "../components/PlayingCard";

import { View } from "../components/Themed";
import Hand from "../components/Hand";
import { useEffect, useState } from "react";

const exampleCards: Card[] = [
  {
    value: 2,
    suit: 0,
    selected: false,
    // animation: new Animated.ValueXY(),
  },
  {
    value: 3,
    suit: 1,
    selected: false,
    // animation: new Animated.ValueXY()
  },
  {
    value: 4,
    suit: 2,
    selected: false,
    // animation: new Animated.ValueXY()
  },
  {
    value: 5,
    suit: 3,
    selected: false,
    // animation: new Animated.ValueXY()
  },
  {
    value: 2,
    suit: 0,
    selected: false,
    // animation: new Animated.ValueXY()
  },
  {
    value: 3,
    suit: 1,
    selected: false,
    // animation: new Animated.ValueXY()
  },
  {
    value: 4,
    suit: 2,
    selected: false,
    // animation: new Animated.ValueXY()
  },
  {
    value: 5,
    suit: 3,
    selected: false,
    // animation: new Animated.ValueXY()
  },
  {
    value: 2,
    suit: 0,
    selected: false,
    // animation: new Animated.ValueXY()
  },
  {
    value: 3,
    suit: 1,
    selected: false,
    // animation: new Animated.ValueXY()
  },
  {
    value: 4,
    suit: 2,
    selected: false,
    // animation: new Animated.ValueXY()
  },
  {
    value: 5,
    suit: 3,
    selected: false,
    // animation: new Animated.ValueXY()
  },
  {
    value: 5,
    suit: 3,
    selected: false,
    // animation: new Animated.ValueXY()
  },
];

export default function Game() {
  const [cards, setCards] = useState<Card[]>(exampleCards);

  useEffect(() => {
    setCards(exampleCards);
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.playedCardsArea}>
        <Text>Play Area</Text>
      </View>
      <View style={styles.hand}>
        <Hand cards={cards} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  playedCardsArea: {
    flex: 1,
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "red",
    width: 300,
    height: 100,
    transform: [
      {
        translateX: 180
      },
    ]
  },
  hand: {
    flex: 1,
    justifyContent: "flex-end",
  }
});
