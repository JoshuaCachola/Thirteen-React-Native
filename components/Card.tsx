import { View, StyleSheet, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
export default function Card() {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>
        K
        <FontAwesomeIcon height={28} width={28} icon={faHeart} color={"red"} />
      </Text>
      <Text
        style={[
          styles.value,
          styles.bottomValue,
          { transform: [{ rotateX: "180deg" }] },
        ]}
      >
        K
        <FontAwesomeIcon height={28} width={28} icon={faHeart} color={"red"} />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "150px",
    height: "250px",
    borderRadius: 8,
    borderColor: "#C5C5C5",
    borderWidth: 1,
  },
  value: {
    fontWeight: "bold",
    fontSize: 30,
    color: "red",
    display: "flex",
    flexDirection: "column",
  },
  bottomValue: {},
});
