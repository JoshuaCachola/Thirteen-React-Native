import { SvgCss } from 'react-native-svg';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PlayerActionsType } from '../classes/PlayerActions';
import { Combination } from '../constants/CombinationConstants';
import { GameContext } from '../context/GameContext';
import PlayingCard from './PlayingCard';
import { useFonts } from 'expo-font';
import { BarlowCondensed_400Regular } from '@expo-google-fonts/barlow-condensed';
import { AbhayaLibre_600SemiBold } from '@expo-google-fonts/abhaya-libre';

const xml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 231 231"><path d="M33.83,33.83a115.5,115.5,0,1,1,0,163.34,115.49,115.49,0,0,1,0-163.34Z" style="fill:#00deae;"/><path d="m115.5 51.75a63.75 63.75 0 0 0-10.5 126.63v14.09a115.5 115.5 0 0 0-53.729 19.027 115.5 115.5 0 0 0 128.46 0 115.5 115.5 0 0 0-53.729-19.029v-14.084a63.75 63.75 0 0 0 53.25-62.881 63.75 63.75 0 0 0-63.65-63.75 63.75 63.75 0 0 0-0.09961 0z" style="fill:#542e02;"/><path d="m141.89 195a114.79 114.79 0 0 1 38 16.5 115.55 115.55 0 0 1-128.47 0 114.79 114.79 0 0 1 38-16.5l15.75 15.75h21z" style="fill:#0D204A;"/><path d="m146.4 196.14-17.4 17.44-1.17 1.17h-24.34l-1.18-1.17-17.43-17.44c1.49-0.41 3-0.79 4.51-1.14l4.67-1 12.74 12.74h17.69l12.73-12.74 4.67 1c1.52 0.35 3 0.73 4.51 1.14z" style="fill:#00ffdf;"/><path d="m115.5 51.75c-38.702 5.3101-54.215 18.038-59.863 35.101" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#FFFAAD;"/><path d="m115.5 51.75c-7.8393 3.6337-5.5974 16.583-14.341 23.452" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#FFFAAD;"/><path d="m111.35 48.614c-22.634-6.9181-42.457-3.1988-55.733 2.5105" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#FFFAAD;"/><path d="m115.47 54.008c0.1965-6.7774-0.1436-26.309 0.05-38.184" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#FFFAAD;"/><path d="m68.874 28.177c34.115-3.382 41.987 13.321 45.17 19.602" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#FFFAAD;"/><path d="m116.49 48.69c2.8876-6.3019 10.358-21.518 43.469-22.326" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#FFFAAD;"/><path d="m116.92 51.766c1.5094 6.3991 3.4988 15.595 10.088 23.058" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#FFFAAD;"/><path d="m113.81 51.532c22.03-7.8674 46.709-7.3614 59.444-2.0465" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#FFFAAD;"/><path d="m114.53 52.278c36.226 4.8583 52.414 17.092 59.373 33.347" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#FFFAAD;"/><path d="m55.637 86.851c-4.1213 12.452-2.9877 27.213-1.777 43.084" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#FFFAAD;"/><path d="m55.614 51.124c-13.422 5.5019-21.908 16.409-24.712 28.774-1.8322 8.4632-1.9809 18.156-1.6096 28.486" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#FFFAAD;"/><path d="m173.26 49.486c24.917 10.399 26.707 36.537 27.209 59.62" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#FFFAAD;"/><path d="m173.9 85.625c5.4042 12.625 5.2413 27.675 4.5745 43.58" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#FFFAAD;"/><path d="m53.86 129.93c1.293 16.951 2.6738 35.169-2.1664 53.193" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;"/><path d="m29.292 108.38c0.6173 17.177 2.6722 36.119 0.8158 54.108" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;"/><path d="m200.47 109.11c0.3586 18.529-1.2751 36.94 1.9231 48.985" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;"/><path d="m178.48 129.2c-0.7279 17.362-2.0563 35.743 2.6011 53.099" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;"/><path d="m172.7 90.75h-6.54c-0.14-0.1-0.26-0.22-0.4-0.3-4.48-2.76-22.75-2.11-33.71 1.2-1 0.3-1.91 0.61-2.75 0.94-1.8937 0.79244-3.8739 1.3597-5.9 1.69-5.5051 0.79002-10.403 0.79002-15.908 0-2.0261-0.33034-4.0063-0.89756-5.9-1.69-0.84-0.33-1.76-0.64-2.75-0.94-11-3.31-29.23-4-33.71-1.2-0.13832 0.08869-0.2688 0.18906-0.39 0.3h-6.55c-1.1046 0-2 0.89543-2 2v4.66c-0.0013 0.98185 0.49088 1.8986 1.31 2.44l1.9 1.27c0.59238 0.38889 0.93475 1.0622 0.9 1.77-0.14175 5.4854 0.88072 10.939 3 16 3.58 8.38 16 10.9 24.93 10.9 2.6976 0.0771 5.3921-0.2361 8-0.93 4.35-1.43 8.24-7.36 10.45-12.42 1.7607-3.8506 2.7493-8.009 2.91-12.24 7.3e-4 -0.7138 0.38183-1.3731 1-1.73 3.2281-1.951 6.5798-1.951 9.8079 0 0.61817 0.3569 0.99927 1.0162 1 1.73 0.16067 4.231 1.1493 8.3894 2.91 12.24 2.21 5.06 6.1 11 10.45 12.42 2.6079 0.6939 5.3024 1.0071 8 0.93 8.92 0 21.35-2.52 24.93-10.9 2.1193-5.0614 3.1418-10.515 3-16-0.0348-0.70778 0.30762-1.3811 0.9-1.77l1.9-1.27c0.81913-0.54136 1.3113-1.4582 1.31-2.44v-4.6c0.0336-1.1048-0.83521-2.0274-1.94-2.06z" style="fill:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5;stroke:none;"/><path d="m94.19 136.84h42.632a3.7801 3.78 0 0 1 3.7802 3.78v3.22a15.231 15.23 0 0 1-15.211 15.16h-19.781a15.251 15.25 0 0 1-15.221-15.16v-3.22a3.8002 3.8 0 0 1 3.7802-3.78z" style="fill:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px;stroke:#000;"/><path d="m130.96 136.84v21.16m-30.911-21.16v21.16m10.34-21.16v22.16m10.31-22.2v22.2" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px;stroke:#000;"/></svg>
`;

export default observer(function PlayerActions() {
  useFonts({
    AbhayaLibre_600SemiBold,
    BarlowCondensed_400Regular,
  });

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
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'cartograph-bold',
              color: 'white',
            }}
          >
            PASS
          </Text>
        </View>
      );
    }
  };

  const displayCombinationType = (type: Combination, length: number) => {
    return type !== 'STRAIGHT' ? type : `${length} CARD ${type}`;
  };

  // if (!fontsLoaded) return <View />;

  return (
    <View style={styles.container}>
      <View style={styles.combinationTextContainer}>
        <Text style={styles.combinationText}>
          {game.combinationType !== null
            ? displayCombinationType(game.combinationType, game.length)
            : 'PLAY ANYTHING'}
        </Text>
      </View>
      <ScrollView overScrollMode='never' scrollsToTop={true}>
        <View style={styles.cards}>
          {actions
            .slice()
            .reverse()
            .map((action) => {
              return (
                <View style={styles.actionContainer} key={`${Math.random()}`}>
                  {/* User Image */}
                  <View style={styles.iconContainer}>
                    <SvgCss width='100%' height='100%' xml={xml} />
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
    elevation: 20,
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
    height: '100%',
    width: 40,
  },
  actionPlay: {
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    width: '60%',
    transform: [{ translateY: 8 }],
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
    textAlign: 'center',
    fontFamily: 'cartograph-bold-italic',
    fontSize: 20,
    color: '#FAE3B0',
  },
  combinationTextContainer: {
    borderColor: '#161320',
    borderWidth: 4,
    backgroundColor: '#161320',
    transform: [{ rotate: '10deg' }, { translateY: 8 }, { translateX: 4 }],
  },
});
