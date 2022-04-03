import { faUser } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PlayerActionsType } from '../classes/PlayerActions';
import { Combination } from '../constants/CombinationConstants';
import { GameContext } from '../context/GameContext';
import FaIcon from '../helper/fontAwsomeHelper';
import Action from './Action';
import PlayingCard from './PlayingCard';

export default observer(function PlayerActions() {
  const { game, playerActions, startGame, turnNumber } =
    useContext(GameContext);

  const [actions, setActions] = useState<PlayerActionsType[]>([]);

  useEffect(() => {
    setActions(playerActions.deque);

    return () => {
      setActions([]);
    };
  }, [playerActions.deque, startGame]);

  const createAction = (action: PlayerActionsType) => {
    if (action.action === 0) {
      return (
        <View style={styles.action}>
          {action.cards.map((card) => {
            return (
              <PlayingCard
                value={card.value}
                suit={card.suit}
                key={Math.random()}
              />
            );
          })}
        </View>
      );
    } else {
      return (
        <View style={styles.action}>
          <Text style={{ fontWeight: '500', fontSize: 16 }}>PASS</Text>
        </View>
      );
    }
  };

  const displayCombinationType = (type: Combination, length: number) => {
    return type !== 'STRAIGHT' ? type : `${length} card ${type}`;
  };

  return (
    <View style={styles.container}>
      <Text>
        {game.combinationType !== null
          ? displayCombinationType(game.combinationType, game.length)
          : 'Play anything'}
      </Text>
      <View style={styles.cards}>
        {actions.slice(0, 5).map((action) => {
          return (
            <View style={styles.actionContainer} key={`${Math.random()}`}>
              {/* User Image */}
              <View style={styles.iconContainer}>
                <FaIcon size={20} icon={faUser} color='black' />
                <Text>{action.player._name}</Text>
              </View>
              {/* <Action action={action} /> */}
              {createAction(action)}
            </View>
          );
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
  actionContainer: {
    display: 'flex',
  },
  iconContainer: {},
  action: {},
});
