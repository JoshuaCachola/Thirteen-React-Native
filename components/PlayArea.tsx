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
  >(playerActions.stack);

  useEffect(() => {
    setPlayerActionsStack(playerActions.stack);
  }, [playerActions.stack]);

  console.log(playerActionsStack);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Play Area</Text>
      <View style={styles.cards}>
        {playerActionsStack.map((played) => {
          return (
            played.action === ActionType.PLAY &&
            played.cards!.map((card, idx) => {
              return (
                <View
                  key={`played-${card.value}-${card.suit}`}
                  style={[
                    styles.card,
                    {
                      left: idx * 20 + played.positions?.left!,
                      top: played.positions?.top,
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
    // height: '100%',
    // position: 'relative',
  },
  text: {
    textAlign: 'center',
    color: 'grey',
  },
  cards: {
    position: 'relative',
    transform: [
      { translateX: Dimensions.get('screen').width / 3 },
      // { translateY: Dimensions.get('screen').height / 6 },
    ],
  },
  card: {
    position: 'absolute',
  },
});
