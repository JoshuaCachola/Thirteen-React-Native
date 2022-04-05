import { faUser } from '@fortawesome/free-solid-svg-icons';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  FadeOut,
  SlideInDown,
  Layout,
} from 'react-native-reanimated';
import { PlayerInterface } from '../classes/Player';
import FaIcon from '../helper/fontAwsomeHelper';
import { View } from './Themed';

interface Props {
  player: PlayerInterface;
}

export default function Player({ player }: Props) {
  return (
    <Animated.View
      style={[styles.userRow]}
      entering={SlideInDown}
      exiting={FadeOut}
      // layout={Layout.springify()}
    >
      <View style={styles.iconContainer}>
        <FaIcon size={20} icon={faUser} color='black' />
      </View>
      <View style={styles.userText}>
        <Text style={styles.text}>{player.name}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  userRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  iconContainer: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 50,
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  userText: {
    width: '60%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  text: {
    fontWeight: '600',
  },
});
