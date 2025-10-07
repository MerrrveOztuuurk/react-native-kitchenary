import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface CategoryChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const CategoryChip: React.FC<CategoryChipProps> = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CategoryChip;

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#FFF2E0",
    borderRadius: 20,
    margin: 5,
  },
  chipSelected: {
    backgroundColor: "#FF6F00",
  },
  text: {
    color: "#333",
    fontWeight: "500",
  },
  textSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
});
