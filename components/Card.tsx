import { View, StyleSheet, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Card() {
  return (
    <View style={styles.container}>
      <Text style={styles.face}>
        <Text style={styles.value}>
          K
          <FontAwesomeIcon
            height={28}
            width={28}
            icon={faHeart}
            color={"red"}
          />
        </Text>
        <Text style={[styles.value, styles.bottomValue]}>
          K
          <Text>
            <FontAwesomeIcon
              height={28}
              width={28}
              icon={faHeart}
              color={"red"}
            />
          </Text>
        </Text>
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
  face: {
    height: "100%",
  },
  value: {
    fontWeight: "bold",
    fontSize: 30,
    color: "red",
    display: "flex",
    flexDirection: "column",
    height: "50%",
    marginHorizontal: 8,
  },
  bottomValue: {
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
