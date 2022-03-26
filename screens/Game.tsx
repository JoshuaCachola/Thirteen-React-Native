import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import Hand from '../components/Hand';
import { useContext, useState } from 'react';
import PlayArea from '../components/PlayArea';
import PlayerStack from '../components/PlayerStack';
import PlayedCardsStack from '../components/PlayedCardsStack';
import ReadyModal from '../components/ReadyModal';
import { Player, PlayerType } from '../classes/Player';
import GameProvider from '../components/GameProvider';
import { GameContext } from '../context/GameContext';

export default function Game() {
  const player = new Player('Joshua', false, PlayerType.HUMAN);
  const [playerIdx, setPlayerIdx] = useState<number>();
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
          <View style={styles.playedCardsArea}>
            <PlayArea />
          </View>
        </View>

        {/* Top Right */}
        <View style={styles.playedCardsStack}>
          <PlayedCardsStack />
        </View>

        {/* Bottom */}
        {playerIdx !== undefined && (
          <View style={styles.bottomContainer}>
            <Hand playerIdx={playerIdx} />
          </View>
        )}
      </View>
      {!startGame && <ReadyModal player={player} setPlayerIdx={setPlayerIdx} />}
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100vh',
  },
  playedCardsArea: {
    // borderWidth: 1,
    // borderStyle: 'dashed',
    // borderColor: 'red',
    // backgroundColor: 'blue',
    position: 'absolute',
    width: '100%',
    height: '50%',
  },
  bottomContainer: {},
  topContainer: {
    // flex: 2,
    justifyContent: 'flex-start',
    backgroundColor: 'green',
    flexDirection: 'row',
  },
  playedCardsStack: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    width: '25%',
    height: '50%',
    opacity: 0.3,
    zIndex: 10,
  },
  playerStack: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    opacity: 0.3,
    width: '25%',
    height: '50%',
    zIndex: 10,
  },
});
