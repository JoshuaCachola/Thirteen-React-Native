import { useContext } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { GameContext } from '../context/GameContext';
import FaIcon from '../helper/fontAwsomeHelper';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { PlayerInterface } from '../classes/Player';
import { observer } from 'mobx-react-lite';

export default observer(function PlayerStack() {
  const { game } = useContext(GameContext);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Rotation</Text>
      </View>
      {game.playerRotation.length !== 0 &&
        game.playerRotation.map((player: PlayerInterface) => {
          return (
            <View style={styles.userRow} key={player.name}>
              <View style={styles.iconContainer}>
                <FaIcon size={20} icon={faUser} color='black' />
              </View>
              <View style={styles.userText}>
                <Text style={styles.text}>{player.name}</Text>
              </View>
            </View>
          );
        })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    width: '100%',
    height: '100%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-around',
  },
  player: {
    fontWeight: 'bold',
  },
  userRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  iconContainer: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 50,
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  userText: {
    width: '60%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  title: {
    width: '60%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  titleText: {
    fontWeight: '600',
    fontSize: 24,
  },
  text: {
    fontWeight: '600',
  },
});
