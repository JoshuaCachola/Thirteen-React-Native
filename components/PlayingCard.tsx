import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import useSuit, { CardSuits } from "../hooks/useSuit";
import useColor from "../hooks/useColor";

export interface Card {
  value: number;
  suit: CardSuits;
}

// Card Component
export default function PlayingCard({ value, suit }: Card) {
  // Handles state of pressing card
  const [isCardPressed, setCardPressed] = useState(false);

  // hooks to get card suit and card color
  const cardSuit = useSuit(suit);
  const color = useColor(suit);

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
        <Text style={[{ color: `${color}` }, styles.rankAndSuit]}>
          <Text style={styles.value}>{value}</Text>
          <FontAwesomeIcon size={28} icon={cardSuit} color={color} />
        </Text>
        <Text
          style={[
            { color: `${color}` },
            styles.rankAndSuit,
            styles.bottomValueAndSuit,
          ]}
        >
          <Text style={styles.bottomValue}>{value}</Text>
          <FontAwesomeIcon size={28} icon={cardSuit} color={color} />
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 250,
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
