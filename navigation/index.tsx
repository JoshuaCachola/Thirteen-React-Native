import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from '../screens/Home';
import Game from '../screens/Game';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <BottomTabNavigator />
    </NavigationContainer>
  );
}

// Navigation for bottom tabs on Home screen
const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else {
              iconName = focused ? "game-controller" : "game-controller-outline";
            }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "grey"
      })}
    >
      {/* Join game tab */}
      <BottomTab.Screen
        name="Game"
        component={Game}
        options={{headerShown: false}}
      />
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </BottomTab.Navigator>
  )
}