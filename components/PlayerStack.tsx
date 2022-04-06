import { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GameContext } from '../context/GameContext';
import { PlayerInterface } from '../classes/Player';
import { observer } from 'mobx-react-lite';
import Player from './Player';

export default observer(function PlayerStack() {
  const { game } = useContext(GameContext);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>ROTATION</Text>
      </View>
      {game.playerRotation.length !== 0 &&
        game.playerRotation.map((player: PlayerInterface, idx) => {
          return <Player player={player} key={player.name} />;
        })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  player: {
    fontWeight: 'bold',
  },
  title: {
    width: '80%',
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'black',
    backgroundColor: 'black',
    transform: [
      {
        rotate: '-10deg',
      },
      {
        translateX: -25,
      },
    ],
  },
  titleText: {
    fontWeight: '600',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'cartograph-bold-italic',
  },
});
