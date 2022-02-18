import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function PlayerStack() {
  const [playerRotation, setPlayerRotation] = useState([
    'playerOne',
    'playerTwo',
    'playerThree',
    'playerFour',
  ]);

  return (
    <View style={styles.container}>
      {playerRotation &&
        playerRotation.map((player) => {
          return (
            <View key={player}>
              <Text style={[{ color: 'grey' }]}>{player}</Text>
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'purple',
  },
  player: {
    fontWeight: 'bold',
  },
});
