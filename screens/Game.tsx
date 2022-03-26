import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import Hand from '../components/Hand';
import { useContext, useEffect, useState } from 'react';
import PlayArea from '../components/PlayArea';
import PlayerStack from '../components/PlayerStack';
import PlayedCardsStack from '../components/PlayedCardsStack';
import ReadyModal from '../components/ReadyModal';
import { Player, PlayerType } from '../classes/Player';
import GameProvider from '../components/GameProvider';
import { GameContext } from '../context/GameContext';
import { CardType } from '../classes/Card';

export default function Game() {
  const player = new Player('Joshua', false, PlayerType.HUMAN);
  const [playerIdx, setPlayerIdx] = useState<number>();
  const { startGame, hands } = useContext(GameContext);

  return (
    <GameProvider>
      <View style={styles.container}>
        {/* Top */}
        <View style={styles.topContainer}>
          <View style={styles.playerStack}>
            <PlayerStack />
          </View>
          <View style={styles.playedCardsArea}>
            <PlayArea />
          </View>
          <View style={styles.playedCardsStack}>
            <PlayedCardsStack />
          </View>
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
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  playedCardsArea: {
    flex: 6,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'red',
    backgroundColor: 'blue',
  },
  bottomContainer: {},
  topContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    backgroundColor: 'green',
    flexDirection: 'row',
  },
  playedCardsStack: {
    flex: 2,
  },
  playerStack: {
    flex: 2,
    backgroundColor: 'white',
  },
});
