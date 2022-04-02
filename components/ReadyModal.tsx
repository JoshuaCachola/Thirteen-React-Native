import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import { PlayerInterface } from '../classes/Player';
import { GameContext } from '../context/GameContext';

interface props {
  player: PlayerInterface;
}

export default observer(function ReadyModal({ player }: props) {
  const { startGame, game, setStartGame, setIsGameWon } =
    useContext(GameContext);
  const onPress = () => {
    game.addPlayer(player);
    player.ready = true;
    setIsGameWon(false);
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
});

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
