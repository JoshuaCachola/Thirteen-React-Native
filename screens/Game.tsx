import { StyleSheet, Text } from "react-native";
import { Card } from "../components/PlayingCard";

import { View } from "../components/Themed";
import Hand from "../components/Hand";
import { useState } from "react";

const exampleCards: Card[] = [
  {
    value: 2,
    suit: 0,
    selected: false
  },
  // {
  //   value: 3,
  //   suit: 1,
  //   selected: false
  // },
  // {
  //   value: 4,
  //   suit: 2,
  //   selected: false
  // },
  // {
  //   value: 5,
  //   suit: 3,
  //   selected: false
  // },
  // {
  //   value: 2,
  //   suit: 0,
  //   selected: false
  // },
  // {
  //   value: 3,
  //   suit: 1,
  //   selected: false
  // },
  // {
  //   value: 4,
  //   suit: 2,
  //   selected: false
  // },
  // {
  //   value: 5,
  //   suit: 3,
  //   selected: false
  // },
  // {
  //   value: 2,
  //   suit: 0,
  //   selected: false
  // },
  // {
  //   value: 3,
  //   suit: 1,
  //   selected: false
  // },
  // {
  //   value: 4,
  //   suit: 2,
  //   selected: false
  // },
  // {
  //   value: 5,
  //   suit: 3,
  //   selected: false
  // },
  // {
  //   value: 5,
  //   suit: 3,
  //   selected: false
  // },
];

export default function Game() {
  const [cards, setCards] = useState<Card[]>(exampleCards);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text>This is the top</Text>
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
  top: {
    flex: 1,
    justifyContent: "flex-start",
  },
  hand: {
    flex: 1,
    justifyContent: "flex-end",
  }
});
