import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {
  useFonts,
  AbhayaLibre_600SemiBold,
} from '@expo-google-fonts/abhaya-libre';
import { BarlowCondensed_400Regular } from '@expo-google-fonts/barlow-condensed';
// import AppLoading from 'expo-app-loading';
import { View } from 'react-native';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    AbhayaLibre_600SemiBold,
    BarlowCondensed_400Regular,
  });

  if (!fontsLoaded) {
    return <View />;
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
