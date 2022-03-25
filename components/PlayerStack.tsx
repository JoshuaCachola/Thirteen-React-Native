import { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GameContext } from '../context/GameContext';

export default function PlayerStack() {
  const { playerRotation } = useContext(GameContext);
  return (
    <View style={styles.container}>
      {playerRotation.length !== 0 &&
        playerRotation.map((player) => {
          return (
            <View key={player.getName()}>
              <Text style={[{ color: 'black' }]}>{player.getName()}</Text>
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'space-between',
  },
  player: {
    fontWeight: 'bold',
  },
});
