import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon as FontAwesomeReact} from '@fortawesome/react-fontawesome';
import {FontAwesomeIcon as FontAwesomeNative} from '@fortawesome/react-native-fontawesome';
import {Platform, StyleSheet} from 'react-native';

interface FaIcon {
  size: number;
  color: string;
  icon: IconProp;
}

// Helper function to fix react native icon props errors
// https://github.com/FortAwesome/react-native-fontawesome/pull/74
export default function FaIcon({size, color, icon, ...props}: FaIcon) {
  if (Platform.OS === 'web') {
    const webStyles = StyleSheet.flatten([{width: size, height: size}]);
    return <FontAwesomeReact {...props} style={webStyles} color={color} icon={icon} />;
  }

  return <FontAwesomeNative {...props} size={size} color={color} icon={icon} />;
}