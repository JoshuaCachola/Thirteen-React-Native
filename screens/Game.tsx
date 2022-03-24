import { StyleSheet, Text } from 'react-native';
import { View } from '../components/Themed';
import Hand from '../components/Hand';
import { useEffect, useState } from 'react';
import { CardInterface } from '../classes/Card';
import PlayArea from '../components/PlayArea';
import PlayerStack from '../components/PlayerStack';
import PlayedCardsStack from '../components/PlayedCardsStack';
import { HandContext } from '../context/HandContext';
import { PlayFromHandContext } from '../context/PlayFromHandContext';
import StageCards from '../components/StageCards';
import { GameState } from '../classes/GameState';
import uuid from 'react-native-uuid';
import ReadyModal from '../components/ReadyModal';
import { Player } from '../classes/Player';
import { Computer } from '../classes/Computer';

export default function Game() {
  const game = new GameState(uuid.v4().toString());
  const player = new Player('Joshua');
  const [isReady, setIsReady] = useState(false);
  // state => HandContext
  const [hand, setHand] = useState<CardInterface[] | null>([]);
  const [selectedCards, setSelectedCards] = useState<CardInterface[]>([]);

  // state => PlayFromHandContext
  const [playedCards, setPlayedCards] = useState<CardInterface[][]>([]);

  useEffect(() => {
    if (isReady) {
      game.addPlayer(player);
      game.addPlayer(new Computer('Computer 1'));
      game.addPlayer(new Computer('Computer 2'));
      game.addPlayer(new Computer('Computer 3'));
      game.start();
    }

    setHand(player.getHand());
  }, [isReady]);

  useEffect(() => {}, []);

  return (
    <PlayFromHandContext.Provider value={{ playedCards, setPlayedCards }}>
      <View style={styles.container}>
        {/* Top */}
        <Text>
          {game.getCombinationType() === null
            ? 'Play anything'
            : game.getCombinationType()}
        </Text>
        <View style={styles.topContainer}>
          <View style={styles.playerStack}>
            <PlayerStack />
          </View>
          <View style={styles.playedCardsArea}>
            <StageCards />
            <PlayArea />
          </View>
          <View style={styles.playedCardsStack}>
            <PlayedCardsStack />
          </View>
        </View>
        {/* Bottom */}
        {hand !== null && (
          <HandContext.Provider
            value={{ hand, setHand, selectedCards, setSelectedCards }}
          >
            <View style={styles.bottomContainer}>
              <Hand game={game} player={player} />
            </View>
          </HandContext.Provider>
        )}
      </View>
      {!isReady && <ReadyModal isReady={isReady} setIsReady={setIsReady} />}
    </PlayFromHandContext.Provider>
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
  bottomContainer: {
    // flex: 1,
    // justifyContent: 'flex-end',
  },
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
  },
});
