import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActionType } from '../constants/Actions';
import { GameContext } from '../context/GameContext';
import PlayingCard from './PlayingCard';

export default observer(function PlayerActions() {
  const { game } = useContext(GameContext);

  return (
    <View style={styles.container}>
      <View style={styles.cards}>
        {game._playerActions &&
          game._playerActions.deque.map((played) => {
            if (played.action === ActionType.PLAY) {
              played.cards!.map((card) => {
                return (
                  <View>
                    <PlayingCard value={card.value} suit={card.suit} />
                  </View>
                );
              });
            } else {
              return (
                <View>
                  <Text>{played.action}</Text>
                </View>
              );
            }
          })}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderColor: 'black',
    borderWidth: 1,
    width: '75%',
    height: '75%',
    borderRadius: 8,
    backgroundColor: 'red',
    margin: 'auto',
    opacity: 0.5,
  },
  cards: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
