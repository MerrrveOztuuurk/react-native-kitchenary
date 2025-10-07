import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import AddRecipeButton from "../components/AddRecipeButton";

interface Recipe {
  id: string;
  title: string;
  image?: string;
  category: string;
  ingredients: string;
  instructions: string;
}

const categories = ["Tümü", "Ana Yemek", "Tatlı", "İçecek", "Hamur İşi", "Atıştırmalık"];

const HomeScreen = ({ navigation }: any) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const stored = await AsyncStorage.getItem("recipes");
        if (stored) setRecipes(JSON.parse(stored));
      } catch (error) {
        console.log("Tarifler yüklenirken hata:", error);
      }
    };
    const unsubscribe = navigation.addListener("focus", loadRecipes);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (id: string) => {
    Alert.alert("Tarifi Sil", "Bu tarifi silmek istediğine emin misin?", [
      { text: "Vazgeç", style: "cancel" },
      {
        text: "Sil",
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
    selectedCategory === "Tümü"
      ? recipes
      : recipes.filter((r) => r.category === selectedCategory);

  const renderItem = ({ item, index }: { item: Recipe; index: number }) => (
    <TouchableOpacity
      style={[
        styles.recipeCard,
        { backgroundColor: index % 2 === 0 ? "#FFF5E6" : "#FFFFFF" },
      ]}
      activeOpacity={0.85}
      onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
    >
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={styles.recipeCategory}>{item.category}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Icon name="trash-2" size={22} color="#FF6F00" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF7F0" />
      <View style={styles.container}>
      <Text style={styles.headerText}>Kitchenary</Text>
        <View style={styles.categoryGrid}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chip,
                selectedCategory === cat && styles.chipSelected,
              ]}
              onPress={() => setSelectedCategory(cat)}
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
          ))}
        </View>        
        {filteredRecipes.length === 0 ? (
          <Text style={styles.emptyText}>Henüz tarif eklenmemiş 🥄</Text>
        ) : (
          <FlatList
            data={filteredRecipes}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
          />
        )}
      <AddRecipeButton
  onPress={() => navigation.navigate("AddRecipe")}
  title={"+ Tarif Ekle"}
  style={{
    position: "absolute",
    bottom: 25,
    right: 25,
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: "#FF6F00",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    
  }}
/>

      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
      backgroundColor: "#FFF7F0", 
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
categoryGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  gap: 8,
  marginBottom: 20,
},
chip: {
  width: "30%",
  paddingVertical: 10,
  backgroundColor: "#FFE6CC",
  borderRadius: 15,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 10,
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 2,
},
  chipSelected: {
    backgroundColor: "#FF6F00",
  },
  chipText: {
    color: "#333",
    fontSize: 15,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
recipeCard: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 15,
  borderRadius: 14,
  marginBottom: 10,
  backgroundColor: "#FFF5E6",
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowOffset: { width: 0, height: 3 },
  shadowRadius: 6,
  elevation: 3,
},
  recipeInfo: {
    flex: 1,
    marginRight: 10,
  },
  recipeTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
  },
  recipeCategory: {
    fontSize: 14,
    color: "#FF6F00",
    marginTop: 3,
  },
emptyText: {
  textAlign: "center",
  color: "#FF6F00",
  marginTop: 50,
  marginBottom: 30,
  fontSize: 18,
  fontWeight: "500",
},
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF6F00", 
    textAlign: "center", 
    margin: 15
  },
});
