import { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GameStateInterface } from '../classes/GameState';
import { PlayerInterface } from '../classes/Player';
import { GameContext } from '../context/GameContext';

interface Props {
  // game: GameStateInterface;
}

export default function PlayerStack({}: Props) {
  const { game } = useContext(GameContext);
  const [playerRotation, setPlayerRotation] = useState<PlayerInterface[]>(
    game.getPlayerRotation()
  );

  useEffect(() => {
    if (game.getPlayerRotation().length !== playerRotation.length) {
      setPlayerRotation(game.getPlayerRotation());
    }
    console.log(game.getPlayerRotation());
  }, [game.getPlayerRotation()]);

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
