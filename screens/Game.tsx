import { StyleSheet, Text } from 'react-native';
import { View } from '../components/Themed';
import Hand from '../components/Hand';
import { useState } from 'react';
import { Deck } from '../helper/Deck';
import { CardInterface } from '../helper/Card';
import PlayArea from '../components/PlayArea';
import PlayerStack from '../components/PlayerStack';
import PlayedCardsStack from '../components/PlayedCardsStack';
import { PlayedCardsContext } from '../context/PlayedCardsContext';
import { HandContext } from '../context/HandContext';

export default function Game() {
  const [cards, setCards] = useState<CardInterface[]>(() => {
    const { deck } = new Deck();
    return deck.slice(0, 13);
  });

  // stack of cards that were played
  const [playedCards, setPlayedCards] = useState<CardInterface[][]>([]);

  return (
    <PlayedCardsContext.Provider value={{ playedCards }}>
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
        <View style={styles.bottomContainer}>
          <View>
            <Hand cards={cards} />
          </View>
        </View>
      </View>
    </PlayedCardsContext.Provider>
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
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'yellow',
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
