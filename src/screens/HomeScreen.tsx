import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddRecipeButton from "../components/AddRecipeButton";
import RecipeCard from "../components/RecipeCard";

const categories = ["All", "Main Course", "Dessert", "Drink", "Pastry"];

interface Recipe {
  id: string;
  title: string;
  image: string;
  category: string;
}

const HomeScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const stored = await AsyncStorage.getItem("recipes");
        if (stored) {
          setRecipes(JSON.parse(stored));
        }
      } catch (err) {
        console.log("Error loading recipes:", err);
      }
    };
    const unsubscribe = navigation.addListener("focus", loadRecipes);
    return unsubscribe;
  }, [navigation]);


  const handleDelete = async (id: string) => {
    Alert.alert("Delete Recipe", "Are you sure you want to delete this recipe?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const updated = recipes.filter((r) => r.id !== id);
          setRecipes(updated);
          await AsyncStorage.setItem("recipes", JSON.stringify(updated));
        },
      },
    ]);
  };

  const filteredRecipes =
    selectedCategory === "All"
      ? recipes
      : recipes.filter((r) => r.category === selectedCategory);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        {/* Kategori Chips */}
        <View style={styles.chipsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 5 }}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, selectedCategory === cat && styles.chipSelected]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={
                    selectedCategory === cat ? styles.chipTextSelected : styles.chipText
                  }
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tarifler */}
        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.recipeRow}>
              <RecipeCard
                title={item.title}
                onPress={() =>
                  navigation.navigate("RecipeDetail", { recipe: item })
                }
              />
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
        />

        {/* Add Recipe Button */}
        <AddRecipeButton
          onPress={() => navigation.navigate("AddRecipe")}
          title={"+ Add Recipe"}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  chipsWrapper: {
    marginBottom: 15,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: "#FF6F00",
  },
  chipText: {
    color: "#333",
  },
  chipTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  recipeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#ffebee",
  },
  deleteText: {
    fontSize: 20,
  },
});
