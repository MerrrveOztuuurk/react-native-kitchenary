import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface AddRecipeButtonProps {
  onPress: () => void;
  title?: string;
   style?: object; 
}

const AddRecipeButton: React.FC<AddRecipeButtonProps> = ({ onPress, title = "+ Tarif Ekle" }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AddRecipeButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF6F00",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
