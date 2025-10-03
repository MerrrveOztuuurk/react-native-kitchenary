import HomeScreen from '@/src/screens/HomeScreen';
import SplashScreen from '@/src/screens/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function TabLayout() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
