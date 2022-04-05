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
  const { game, playerActions, startGame } = useContext(GameContext);

  const [actions, setActions] = useState<PlayerActionsType[]>([]);

  useEffect(() => {
    setActions(playerActions.stack);

    return () => {
      setActions([]);
    };
  }, [playerActions.stack, startGame]);

  const createAction = (action: PlayerActionsType) => {
    if (action.action === 0) {
      return (
        <View style={styles.actionPlay}>
          {action.cards!.map((card, idx) => {
            return (
              <View
                style={[styles.actionCard, { left: idx * 5 }]}
                key={Math.random()}
              >
                <PlayingCard value={card.value} suit={card.suit} size={11} />
              </View>
            );
          })}
        </View>
      );
    } else {
      return (
        <View style={styles.actionPass}>
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
      <View style={styles.combinationTextContainer}>
        <Text style={styles.combinationText}>
          {game.combinationType !== null
            ? displayCombinationType(game.combinationType, game.length)
            : 'Play anything'}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.cards}>
          {actions
            .slice()
            .reverse()
            .map((action) => {
              return (
                <View style={styles.actionContainer} key={`${Math.random()}`}>
                  {/* User Image */}
                  <View style={styles.iconContainer}>
                    <FaIcon size={24} icon={faUser} color='black' />
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
    width: '100%',
    height: '100%',
    margin: 'auto',
  },
  cards: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 80,
  },
  iconContainer: {
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  actionPlay: {
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
  },
  actionPass: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
  },
  actionCard: {
    backgroundColor: 'white',
    width: 50,
    height: 75,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C5C5C5',
    position: 'absolute',
    top: 0,
  },
  combinationText: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  combinationTextContainer: {
    borderColor: 'black',
    borderWidth: 4,
    backgroundColor: 'black',
    transform: [{ rotate: '10deg' }, { translateY: 0 }, { translateX: 4 }],
  },
});
