import { Button, Modal, Text } from 'react-native';

interface props {
  isReady: boolean;
  setIsReady: (r: boolean) => void;
}

export default function ReadyModal({ isReady, setIsReady }: props) {
  return (
    <Modal
      animationType='slide'
      // transparent={true}
      visible={!isReady}
      // onRequestClose={() => setIsReady(false)}
    >
      <Button title='Ready up' onPress={() => setIsReady(true)}></Button>
      <Text>Waiting for players to ready up...</Text>
    </Modal>
  );
}
