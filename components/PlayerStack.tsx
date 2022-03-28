import { useContext } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { GameContext } from '../context/GameContext';
import FaIcon from '../helper/fontAwsomeHelper';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { PlayerInterface } from '../classes/Player';

export default function PlayerStack() {
  // const { playerRotation } = useContext(GameContext);
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>Players Stack</Text>
      </View>
      {/* {playerRotation.length !== 0 &&
        playerRotation.map((player: PlayerInterface) => {
          return (
            <View style={styles.userRow} key={player._name}>
              <View style={styles.iconContainer}>
                <FaIcon size={20} icon={faUser} color='black' />
              </View>
              <View style={styles.userText}>
                <Text style={styles.text}>{player._name}</Text>
              </View>
            </View>
          );
        })} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    width: Dimensions.get('window').width / 4,
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
  },
  userIcon: {},
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
  text: {
    fontWeight: 'bold',
  },
});
