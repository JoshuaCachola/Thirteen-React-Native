import { faUser } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PlayerActionsType } from '../classes/PlayerActions';
import { Combination } from '../constants/CombinationConstants';
import { GameContext } from '../context/GameContext';
import FaIcon from '../helper/fontAwsomeHelper';
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
          {action.cards!.map((card) => {
            return (
              <View style={styles.actionCard} key={Math.random()}>
                <PlayingCard value={card.value} suit={card.suit} size={10} />
              </View>
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
      <ScrollView>
        <View style={styles.cards}>
          {actions.map((action) => {
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
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    height: '100%',
    borderRadius: 8,
    margin: 'auto',
    opacity: 0.5,
  },
  cards: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconContainer: {
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  action: {
    justifyContent: 'flex-end',
  },
  actionCard: {
    backgroundColor: 'white',
    width: 50,
    height: 75,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
  },
});
