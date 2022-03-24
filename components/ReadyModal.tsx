import { Button, Modal, StyleSheet, Text, View } from 'react-native';

interface props {
  isReady: boolean;
  setIsReady: (r: boolean) => void;
}

export default function ReadyModal({ isReady, setIsReady }: props) {
  return (
    <Modal animationType='slide' transparent={true} visible={!isReady}>
      <View style={styles.container}>
        <Button title='Ready up' onPress={() => setIsReady(true)} />
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
