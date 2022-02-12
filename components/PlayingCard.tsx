import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import useSuit from "../hooks/useSuit";

export interface Card {
  value: number;
  suit: string;
}

// Card Component
export default function PlayingCard({ value, suit }: Card) {
  // Handles state of pressing card
  const [isCardPressed, setCardPressed] = useState(false);
  const cardSuit = useSuit("heart");
  return (
    <TouchableHighlight
      style={
        isCardPressed
          ? [styles.container, styles.selectCard]
          : [styles.container]
      }
      underlayColor="rgba(0, 0, 255, 0.4)"
      onPress={() => setCardPressed(!isCardPressed)}
    >
      <View style={styles.front}>
        <Text style={styles.rankAndSuit}>
          <Text style={styles.value}>{value}</Text>
          <FontAwesomeIcon size={28} icon={cardSuit} color={"red"} />
        </Text>
        <Text style={[styles.rankAndSuit, styles.bottomValueAndSuit]}>
          <Text style={styles.bottomValue}>{value}</Text>
          <FontAwesomeIcon size={28} icon={cardSuit} color={"red"} />
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "150px",
    height: "250px",
    borderRadius: 8,
    borderColor: "#C5C5C5",
    borderWidth: 1,
    backgroundColor: "white",
  },
  front: {
    height: "100%",
  },
  rankAndSuit: {
    fontWeight: "bold",
    fontSize: 30,
    color: "red",
    display: "flex",
    flexDirection: "column",
    height: "50%",
    marginHorizontal: 8,
  },
  bottomValueAndSuit: {
    transform: [
      {
        rotateX: "180deg",
      },
    ],
    alignContent: "flex-end",
    alignItems: "flex-end",
    flexBasis: "auto",
  },
  selectCard: {
    bottom: 30,
    borderWidth: 10,
    borderColor: "yellow",
    backgroundColor: "rgb(0, 0, 200)",
  },
  value: {
    marginLeft: 3,
  },
  bottomValue: {
    marginRight: 5,
    transform: [
      {
        rotateY: "180deg",
      },
    ],
  },
});
