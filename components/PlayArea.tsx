import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PlayingCard from './PlayingCard';
import { GameContext } from '../context/GameContext';
import { observer } from 'mobx-react-lite';
import { ActionType } from '../constants/Actions';
import { PlayerActionsType } from '../classes/PlayerActions';

export default observer(function PlayArea() {
  const { playerActions } = useContext(GameContext);
  const [playerActionsStack, setPlayerActionsStack] = useState<
    PlayerActionsType[]
  >(playerActions.deque);

  useEffect(() => {
    setPlayerActionsStack(playerActions.deque);
  }, [playerActions.deque]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Play Area</Text>
      <View style={styles.cards}>
        {playerActionsStack.map((played) => {
          return (
            played.action === ActionType.PLAY &&
            played.cards!.map((card) => {
              return (
                <View
                  key={`played-${card.value}-${card.suit}`}
                  style={[
                    styles.card,
                    {
                      left: played.positions?.left,
                      bottom: played.positions?.bottom,
                      transform: [{ rotate: played.positions!.rotate }],
                    },
                  ]}
                >
                  <PlayingCard value={card.value} suit={card.suit} />
                </View>
              );
            })
          );
        })}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // position: 'relative',
  },
  text: {
    textAlign: 'center',
    color: 'grey',
  },
  cards: {
    position: 'relative',
    transform: [
      { translateX: Dimensions.get('screen').width / 4 },
      { translateY: Dimensions.get('screen').height / 10 },
    ],
  },
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
