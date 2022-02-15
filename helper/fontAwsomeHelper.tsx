import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon as FontAwesomeReact} from '@fortawesome/react-fontawesome';
import {FontAwesomeIcon as FontAwesomeNative} from '@fortawesome/react-native-fontawesome';
import {number} from 'prop-types';
import {Platform, StyleSheet} from 'react-native';

FaIcon.propTypes = {
  size: number,
};

interface FaIcon {
  size: number;
  color: string;
  icon: IconProp;
}

export default function FaIcon({size, color, icon, ...props}: FaIcon) {
  if (Platform.OS === 'web') {
    const webStyles = StyleSheet.flatten([{width: size, height: size}]);
    return <FontAwesomeReact {...props} style={webStyles} color={color} icon={icon} />;
  }

  return <FontAwesomeNative {...props} size={size} color={color} icon={icon} />;
}