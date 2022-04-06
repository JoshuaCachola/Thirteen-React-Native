import { StyleSheet, Text } from 'react-native';
import Animated, {
  FadeIn,
  Layout,
  SlideOutLeft,
} from 'react-native-reanimated';
import { SvgCss } from 'react-native-svg';
import { PlayerInterface } from '../classes/Player';
import { View } from './Themed';

interface Props {
  player: PlayerInterface;
  idx: number;
}

export default function Player({ player, idx }: Props) {
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 231 231"><path d="M33.83,33.83a115.5,115.5,0,1,1,0,163.34,115.49,115.49,0,0,1,0-163.34Z" style="fill:#FF9800;"/><path d="m115.5 51.75a63.75 63.75 0 0 0-10.5 126.63v14.09a115.5 115.5 0 0 0-53.729 19.027 115.5 115.5 0 0 0 128.46 0 115.5 115.5 0 0 0-53.729-19.029v-14.084a63.75 63.75 0 0 0 53.25-62.881 63.75 63.75 0 0 0-63.65-63.75 63.75 63.75 0 0 0-0.09961 0z" style="fill:#ffce73;"/><path d="m141.75 195a114.79 114.79 0 0 1 38 16.5 115.53 115.53 0 0 1-128.46 0 114.79 114.79 0 0 1 38-16.5l13.85 13.85v-1.2h17.86v3.1h5z" style="fill:#033c58;"/><polygon points="115.36 207.65 123.37 224.2 148.3 196.86 143.08 189.95" style="fill:#fff;"/><polygon points="115.36 207.65 107.35 224.2 82.42 196.86 87.63 189.95" style="fill:#fff;"/><path d="m32.902 67.662c-0.36295 1.7227-6.2342 30.695 5.6133 52.596 4.5843 8.4743 9.0081 13.239 12.75 15.893a67.7 67.7 0 0 1-3.4688-21.35 67.7 67.7 0 0 1 2.332-17.658c-4.4914-2.4646-10.868-6.9012-13.834-13.52-4.1626-9.285-3.6155-14.673-3.3926-15.961zm165.19 0c0.22292 1.2882 0.77005 6.6759-3.3926 15.961-2.9664 6.6183-9.3426 11.055-13.834 13.52a67.7 67.7 0 0 1 2.332 17.658 67.7 67.7 0 0 1-3.4688 21.35c3.7419-2.6532 8.1657-7.4183 12.75-15.893 11.847-21.9 5.9762-50.873 5.6133-52.596z" style="fill:#acfffd;"/><path d="m115.73 13.191c-7.3787-0.13351-13.509 5.7888-13.631 13.168-0.10128 5.8827 3.4508 10.518 8.0566 12.52 1.061 0.46115 2.1869 0.78009 3.3418 0.95703v8.4291c0.66778-0.02035 1.3358-0.03077 2.0039-0.03125 0.66547-9e-5 1.3309 0.0097 1.9961 0.0293v-8.4115c2.6002-0.38406 5.1586-1.5484 7.3086-3.625 4.2322-4.0878 4.9991-9.8755 3.1582-14.549-1.8407-4.6726-6.3502-8.3834-12.232-8.4863z" style="fill:#acfffd;"/><path d="m161.73 86.016h-92.51c-3.37 0-6.0001 2.3998-6.0001 5.2999v28.45c0 3.0002 2.74 5.3001 6.0001 5.3001h32.36c7.0901 0 7.44-19.43 13.82-19.43s6.8801 19.44 13.83 19.44h32.36c3.37 0 5.9999-2.4 5.9999-5.3001v-28.46c0.14043-2.9001-2.6-5.2999-5.9-5.2999z" style="fill:#7fb5a2;"/><path d="m161.73 86.016h-92.51c-3.37 0-6.0001 2.3998-6.0001 5.2999v28.45l104.55-28.45c0-2.9001-2.74-5.2999-5.9999-5.2999z" style="fill:#d1eddf;"/><path d="m161.73 86.016h-92.51c-3.37 0-6.0001 2.3998-6.0001 5.2999v28.45c0 3.0002 2.74 5.3001 6.0001 5.3001h32.36c7.0901 0 7.44-19.43 13.82-19.43s6.8801 19.44 13.83 19.44h32.36c3.37 0 5.9999-2.4 5.9999-5.3001v-28.46c0.14043-2.9001-2.6-5.2999-5.9-5.2999z" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:4.0026px;stroke:#301e19;"/><path d="m94.19 136.84h42.632a3.7801 3.78 0 0 1 3.7802 3.78v3.22a15.231 15.23 0 0 1-15.211 15.16h-19.781a15.251 15.25 0 0 1-15.221-15.16v-3.22a3.8002 3.8 0 0 1 3.7802-3.78z" style="fill:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px;stroke:#000;"/><path d="m130.96 136.84v21.16m-30.911-21.16v21.16m10.34-21.16v22.16m10.31-22.2v22.2" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px;stroke:#000;"/></svg>`;

  return (
    <Animated.View
      style={[styles.userRow, idx === 0 && styles.currentPlayer]}
      entering={FadeIn}
      exiting={SlideOutLeft}
      layout={Layout.springify()}
    >
      <View style={styles.iconContainer}>
        <SvgCss xml={xml} width='100%' height='100%' />
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
    width: 40,
    height: 40,
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
    fontFamily: 'cartograph-thin',
    backgroundColor: '#161320',
    color: 'white',
  },
  currentPlayer: {
    borderColor: 'white',
    borderBottomWidth: 4,
    borderRightWidth: 2,
    backgroundColor: '#161320',
    transform: [{ translateX: 10 }, { scale: 1.1 }],
  },
});
