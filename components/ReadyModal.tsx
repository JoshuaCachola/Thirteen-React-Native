import { useContext } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import { PlayerInterface } from '../classes/Player';
import { GameContext } from '../context/GameContext';

interface props {
  player: PlayerInterface;
  setPlayerIdx: (i: number) => void;
}

export default function ReadyModal({ player, setPlayerIdx }: props) {
  const { startGame, setStartGame, setPlayers, players } =
    useContext(GameContext);

  const onPress = () => {
    const playerIdx = players.length;
    setPlayerIdx(playerIdx);
    setPlayers([...players, player]);
    setStartGame(true);
  };
  return (
    <Modal animationType='slide' transparent={true} visible={!startGame}>
      <View style={styles.container}>
        <Button title='Ready up' onPress={onPress} />
        <Text>Waiting for players to ready up...</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
    // backgroundColor: 'black',
    // opacity: 20,
  },
});
