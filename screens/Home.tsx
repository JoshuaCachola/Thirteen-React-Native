import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { View } from "../components/Themed";

export default function Home() {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text>Learn To Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Join Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Find Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "yellow",
    padding: 10,
    margin: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: "80%",
  // },
});
