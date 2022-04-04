import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import { PlayerInterface } from '../classes/Player';
import { GameContext } from '../context/GameContext';

interface props {
  player: PlayerInterface;
}

export default observer(function ReadyModal({ player }: props) {
  const { startGame, setStartGame, setIsGameWon, game } =
    useContext(GameContext);
  const onPress = () => {
    player.ready = true;
    setIsGameWon(false);
    setStartGame(true);
  };

  return (
    <Modal animationType='slide' transparent={true} visible={!startGame}>
      {game.lastWinner !== null && (
        <View>
          <Text style={{ fontSize: 42, fontWeight: '600' }}>
            {game.players[game.lastWinner].name} WINS!
          </Text>
        </View>
      )}
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
