import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PlayerActionsType } from '../classes/PlayerActions';
import { GameContext } from '../context/GameContext';
import PlayingCard from './PlayingCard';

export default observer(function PlayerActions() {
  const { playerActions } = useContext(GameContext);

  const [actions, setActions] = useState<PlayerActionsType[]>([]);

  const createAction = (action: PlayerActionsType) => {
    if (action.action === 0) {
      return (
        <View style={styles.actionContainer}>
          {/* User Image */}
          <View></View>
        </View>
      );
    }
  };

  useEffect(() => {
    setActions(playerActions.deque);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cards}>
        {actions.slice(0, 5).map((action) => {
          return createAction(action);
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
  actionContainer: {},
});
