import { Dimensions, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import Hand from '../components/Hand';
import { useContext, useEffect } from 'react';
import PlayArea from '../components/PlayArea';
import PlayerStack from '../components/PlayerStack';
import PlayerActions from '../components/PlayerActions';
import ReadyModal from '../components/ReadyModal';
import { Player } from '../classes/Player';
import GameProvider from '../components/GameProvider';
import { GameContext } from '../context/GameContext';

export default function Game() {
  const player = new Player('Joshua', false);

  const { startGame, isGameWon, game } = useContext(GameContext);

  useEffect(() => {
    game.addPlayer(player);
  }, []);

  return (
    <GameProvider>
      <View style={styles.container}>
        {/* Top Left */}
        <View style={styles.playerStack}>
          <PlayerStack />
        </View>

        {/* Middle */}
        <View style={styles.game}>
          <View style={styles.playArea}>
            <PlayArea />
          </View>
          <View style={styles.hand}>
            <Hand player={player} />
          </View>
        </View>

        {/* Top Right */}
        <View style={styles.playerActions}>
          <PlayerActions />
        </View>

        {/* Bottom */}
      </View>
      {/* {isGameWon && } */}
      {!startGame && !isGameWon && <ReadyModal player={player} />}
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: Dimensions.get('window').height,
    backgroundColor: 'green',
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
  game: {
    height: '100%',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  playArea: {
    justifyContent: 'flex-start',
  },
  hand: {
    justifyContent: 'flex-end',
  },
  playerActions: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '30%',
    height: '50%',
    zIndex: 10,
    backgroundColor: 'white',
    opacity: 0.8,
  },
  playerStack: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    opacity: 0.8,
    width: '25%',
    height: '60%',
    zIndex: 10,
  },
});
