import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (cat: string) => void;
}

const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  return (
    <View style={styles.chipsContainer}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[
            styles.chip,
            selectedCategory === cat && styles.chipSelected,
          ]}
          onPress={() => onSelect(cat)}
        >
          <Text style={selectedCategory === cat ? styles.chipTextSelected : styles.chipText}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryChips;

const styles = StyleSheet.create({
  chipsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: "#f052e0ff",
  },
  chipText: {
    color: "#333",
  },
  chipTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
});
