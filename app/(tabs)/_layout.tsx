import AddRecipeScreen from '@/src/screens/AddRecipeScreen';
import FavoritesScreen from '@/src/screens/FavoritesScreen';
import HomeScreen from '@/src/screens/HomeScreen';
import RecipeDetailScreen from '@/src/screens/RecipeDetailScreen';
import SplashScreen from '@/src/screens/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Asset } from "expo-asset";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';


const images = [
  require("../../src/assets/image/all.jpg"),
  require("../../src/assets/image/maincourse.jpg"),
  require("../../src/assets/image/dessert.jpg"),
  require("../../src/assets/image/drink.jpg"),
  require("../../src/assets/image/pastry.jpg"),
  require("../../src/assets/image/snack.jpg"),
];

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  AddRecipe: undefined;
  RecipeDetail: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function TabLayout() {

    const [ready, setReady] = useState(false);

      useEffect(() => {
    async function loadAssets() {
      const cacheImages = images.map((img) => Asset.fromModule(img).downloadAsync());
      await Promise.all(cacheImages);
      setReady(true);
    }
    loadAssets();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF6F00" />
      </View>
    );
  }
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name='AddRecipe' component={AddRecipeScreen}/>
      <Stack.Screen name='RecipeDetail' component={RecipeDetailScreen}  options={{ title: "Recipe Detail" }}/>
      <Stack.Screen name='Favorites' component={FavoritesScreen}/>
    </Stack.Navigator>
  );
}
