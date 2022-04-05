import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

interface Props {
  isValid: boolean;
  isSelected: boolean;
  children: any;
}

export default function SelectCard({ isValid, isSelected, children }: Props) {
  const color = useSharedValue(0);

  useEffect(() => {
    color.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.linear }),
      -1,
      true
    );
  }, []);

  const invalidBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      color.value,
      [0, 1],
      ['rgb(255,204,204)', 'rgb(255,0,0)']
    );

    return { borderColor };
  });

  const validBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      color.value,
      [0, 1],
      ['rgb(179,255,191)', 'rgb(0,77,13)']
    );

    return { borderColor };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        isSelected
          ? { borderWidth: 4, transform: [{ scale: 1.2 }] }
          : { borderWidth: 1, borderColor: '#C5C5C5' },
        isValid && isSelected && validBorderStyle,
        !isValid && isSelected && invalidBorderStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    borderRadius: 8,
    width: 90,
    height: 125,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOffset: { width: -10, height: 10 },
    shadowOpacity: 0.2,
  },
});
