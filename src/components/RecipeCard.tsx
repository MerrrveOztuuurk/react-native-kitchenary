import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

interface RecipeCardProps {
  title: string;
  category: string;
  onPress: () => void;
  onDelete: () => void;
  index: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, category, onPress, onDelete, index }) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: index % 2 === 0 ? "#FFF5E6" : "#FFFFFF" }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Icon name="trash-2" size={22} color="#FF6F00" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
  },
  category: {
    fontSize: 14,
    color: "#FF6F00",
    marginTop: 2,
  },
});
