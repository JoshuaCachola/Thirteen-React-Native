import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PlayingCard from './PlayingCard';
import { GameContext } from '../context/GameContext';
import { observer } from 'mobx-react-lite';
import { ActionType } from '../constants/Actions';
import { PlayerActionsType } from '../classes/PlayerActions';

export default observer(function PlayArea() {
  const { playerActions, isGameWon } = useContext(GameContext);
  const [actionsStack, setActionsStack] = useState<PlayerActionsType[]>([]);

  useEffect(() => {
    setActionsStack(playerActions.stack);

    return () => {
      setActionsStack([]);
    };
  }, [playerActions.stack, isGameWon]);

  return (
    <View style={styles.cards}>
      {actionsStack.map((played) => {
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
                <PlayingCard value={card.value} suit={card.suit} size={14} />
              </View>
            );
          })
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  cards: {
    position: 'relative',
    transform: [
      { translateX: Dimensions.get('screen').width / 3 },
      // { translateY: Dimensions.get('screen').height / 6 },
    ],
  },
  card: {
    position: 'absolute',
    backgroundColor: 'white',
    height: 125,
    width: 75,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
});
