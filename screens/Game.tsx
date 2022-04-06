import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
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
        <ImageBackground
          source={require('../assets/images/cyan_bkg5.png')}
          resizeMode='cover'
          style={styles.image}
        >
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
        </ImageBackground>
      </View>
      {!startGame && !isGameWon && <ReadyModal player={player} />}
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: Dimensions.get('window').height,
    // backgroundColor: 'blue',
    // width: Dimensions.get('window').width,
  },
  game: {
    // height: Dimensions.get('screen').height,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    // justifyContent: 'center',
  },
  playArea: {
    justifyContent: 'flex-end',
  },
  hand: {
    justifyContent: 'flex-start',
  },
  playerActions: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '25%',
    height: '50%',
    zIndex: 10,
    opacity: 0.8,
  },
  playerStack: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.8,
    width: '25%',
    height: '60%',
    zIndex: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
