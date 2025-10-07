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
  const firstRow = categories.slice(0, 3);
  const secondRow = categories.slice(3);

  const renderChips = (row: string[]) =>
    row.map((cat) => (
      <TouchableOpacity
        key={cat}
        style={[
          styles.chip,
          selectedCategory === cat && styles.chipSelected,
        ]}
        onPress={() => onSelect(cat)}
      >
        <Text
          style={
            selectedCategory === cat
              ? styles.chipTextSelected
              : styles.chipText
          }
        >
          {cat}
        </Text>
      </TouchableOpacity>
    ));

  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderChips(firstRow)}</View>
      {secondRow.length > 0 && <View style={styles.row}>{renderChips(secondRow)}</View>}
    </View>
  );
};

export default CategoryChips;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#FFEFE2",
    borderRadius: 20,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: "#FF9A3D",
  },
  chipSelected: {
    backgroundColor: "#FF9A3D",
    borderColor: "#FF9A3D",
  },
  chipText: {
    color: "#FF9A3D",
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },
});
