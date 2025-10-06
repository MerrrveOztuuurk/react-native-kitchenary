import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AddRecipeButtonProps {
  onPress: () => void;
  title: string;
}

const AddRecipeButton: React.FC<AddRecipeButtonProps> = ({ onPress, title = "+ Add Recipe" }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddRecipeButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: "#FF6F00",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 3,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
