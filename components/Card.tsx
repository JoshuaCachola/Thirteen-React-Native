import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

// This component displays holding one card
export default function Card() {
  const [isCardPressed, setCardPressed] = useState(false);
  console.log(isCardPressed);
  return (
    <TouchableHighlight
      style={
        isCardPressed
          ? [styles.container, styles.selectCard]
          : [styles.container]
      }
      underlayColor="rgba(0, 0, 255, 0.4)"
      onPress={() => setCardPressed(!isCardPressed)}
      // onShowUnderlay={() => setCardPressed(!isCardPressed)}
      // onHideUnderlay={() => setCardPressed(!isCardPressed)}
    >
      <View style={styles.front}>
        <Text style={styles.rankAndSuit}>
          K
          <FontAwesomeIcon size={28} icon={faHeart} color={"red"} />
        </Text>
        <Text style={[styles.rankAndSuit, styles.bottomRankAndSuit]}>
          K
          <Text>
            <FontAwesomeIcon size={28} icon={faHeart} color={"red"} />
          </Text>
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
  bottomRankAndSuit: {
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
});
