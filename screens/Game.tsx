import { Button, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import Hand from '../components/Hand';
import { useState } from 'react';
import { Deck } from '../classes/Deck';
import { CardInterface } from '../classes/Card';
import PlayArea from '../components/PlayArea';
import PlayerStack from '../components/PlayerStack';
import PlayedCardsStack from '../components/PlayedCardsStack';
import { HandContext } from '../context/HandContext';
import { PlayFromHandContext } from '../context/PlayFromHandContext';

export default function Game() {
  // state => HandContext
  const [hand, setHand] = useState<CardInterface[]>(() => {
    const { deck } = new Deck();
    return deck.slice(0, 13);
  });
  const [selectedCards, setselectedCards] = useState<CardInterface[]>([]);

  // state => PlayFromHandContext
  const [playedCards, setPlayedCards] = useState<CardInterface[]>([]);

  const handleRedeal = () => {
    const { deck } = new Deck();
    setHand(deck.slice(0, 13));
  };
  return (
    <PlayFromHandContext.Provider value={{ playedCards, setPlayedCards }}>
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
        <HandContext.Provider
          value={{ hand, setHand, selectedCards, setselectedCards }}
        >
          <View style={styles.bottomContainer}>
            <Hand />
          </View>
        </HandContext.Provider>
      </View>
      {/* <Button title='redeal' onPress={() => handleRedeal()} /> */}
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
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'purple',
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
