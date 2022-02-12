import Card from "./Card";
import { View, StyleSheet } from "react-native";

// This component displays holding two cards
export default function TwoCards() {
  return (
    <View style={styles.container}>
      <View style={styles.cardOne}>
        <Card />
      </View>
      <View style={styles.cardTwo}>
        <Card />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  cardOne: {
    position: "absolute",
    zIndex: 1,
    // transform: [
    //   {
    //     rotate: "-15deg",
    //   },
    // ],
  },
  cardTwo: {
    position: "absolute",
    zIndex: 2,
    // transform: [
    //   {
    //     rotate: "15deg",
    //   },
    // ],
    left: 40,
  },
});
