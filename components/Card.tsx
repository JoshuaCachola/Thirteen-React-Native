import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// This component displays holding one card
export default function Card() {
  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor="rgba(0, 0, 255, 0.4)"
      onPress={() => console.log("pressed")}
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
});
