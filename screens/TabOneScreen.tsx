import { StyleSheet } from "react-native";
import { Card } from "../components/PlayingCard";

import { View } from "../components/Themed";
import Hand from "../components/Hand";
import { RootTabScreenProps } from "../types";

const cards: Card[] = [
  {
    value: 2,
    suit: 0,
  },
  {
    value: 3,
    suit: 1,
  },
  {
    value: 4,
    suit: 2,
  },
  {
    value: 5,
    suit: 3,
  },
];

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      <Hand cards={cards} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
