import { Dimensions, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import Hand from '../components/Hand';
import { useContext, useState } from 'react';
import PlayArea from '../components/PlayArea';
import PlayerStack from '../components/PlayerStack';
import PlayerActions from '../components/PlayerActions';
import ReadyModal from '../components/ReadyModal';
import { Player } from '../classes/Player';
import GameProvider from '../components/GameProvider';
import { GameContext } from '../context/GameContext';

export default function Game() {
  const player = new Player('Joshua', false);

  const { startGame } = useContext(GameContext);

  return (
    <GameProvider>
      <View style={styles.container}>
        {/* Top Left */}
        <View style={styles.playerStack}>
          <PlayerStack />
        </View>

        {/* Top Middle */}
        <View style={styles.topContainer}>
          <View style={styles.playerActionsArea}>
            <PlayArea />
          </View>
        </View>

        {/* Top Right */}
        <View style={styles.playerActions}>
          <PlayerActions />
        </View>

        {/* Bottom */}
        <View style={styles.bottomContainer}>
          <Hand player={player} />
        </View>
      </View>
      {!startGame && <ReadyModal player={player} />}
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: Dimensions.get('window').height,
    backgroundColor: 'rgb(194,192,226)',
  },
  playerActionsArea: {
    borderWidth: 1,
    borderStyle: 'dashed',
    backgroundColor: 'blue',
    position: 'absolute',
    width: '60%',
    height: Dimensions.get('window').height,
    transform: [
      {
        translateX: Dimensions.get('window').width / 5,
      },
    ],
  },
  bottomContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    transform: [
      {
        translateX: Dimensions.get('window').width / 2,
      },
      {
        translateY: -Dimensions.get('window').height / 8,
      },
    ],
    zIndex: 10,
  },
  topContainer: {
    // flex: 2,
    justifyContent: 'flex-start',
    backgroundColor: 'green',
    flexDirection: 'row',
  },
  playerActions: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '20%',
    height: '50%',
    zIndex: 10,
    backgroundColor: 'white',
  },
  playerStack: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    // opacity: 0.3,
    width: '20%',
    height: '50%',
    zIndex: 10,
  },
});
