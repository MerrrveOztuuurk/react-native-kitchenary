import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
};

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home"); 
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/splash.json")}
        autoPlay
        loop={false}
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
