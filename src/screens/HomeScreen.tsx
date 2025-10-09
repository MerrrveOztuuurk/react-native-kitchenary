import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageSourcePropType,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddRecipeButton from "../components/AddRecipeButton";

interface Recipe {
  id: string;
  title: string;
  image?: string | ImageSourcePropType;
  category: string;
  ingredients: string;
  instructions: string;
}

interface Category {
  name: string;
  image: ImageSourcePropType;
}

const categories: Category[] = [
  { name: "Tümü", image: require("../assets/image/all.jpg") },
  { name: "Ana Yemek", image: require("../assets/image/maincourse.jpg") },
  { name: "Tatlı", image: require("../assets/image/dessert.jpg") },
  { name: "İçecek", image: require("../assets/image/drink.jpg") },
  { name: "Hamur İşi", image: require("../assets/image/pastry.jpg") },
  { name: "Atıştırmalık", image: require("../assets/image/snack.jpg") },
];

const getImageSource = (
  image?: string | ImageSourcePropType
): ImageSourcePropType | undefined => {
  if (!image) return undefined;
  if (typeof image === "string") {
    return image.startsWith("http") ? { uri: image } : undefined;
  }
  return image;
};

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

  const renderRecipe = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
    >
      <View style={styles.recipeRow}>
        {item.image ? (
          <Image
            source={getImageSource(item.image)}
            style={styles.recipeImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.recipeImagePlaceholder}>
            <Ionicons name="camera-outline" size={32} color="#bbb" />
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <Text style={styles.recipeCategory}>{item.category}</Text>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Icon name="trash-2" size={20} color="#FF6F00" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }: { item: Category }) => {
    const isSelected = selectedCategory === item.name;
    return (
      <TouchableOpacity
        style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
        onPress={() => setSelectedCategory(item.name)}
        activeOpacity={0.85}
      >
        <Image
          source={getImageSource(item.image)}
          style={styles.categoryImage}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF7F0" />
      <View style={styles.container}>
        <Text style={styles.headerText}>Kitchenary</Text>

        {/* Kategori listesi */}
        <FlatList
          data={categories}
          keyExtractor={(item) => item.name}
          renderItem={renderCategory}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 15 }}
          contentContainerStyle={{ paddingHorizontal: 5, paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
        />

        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>Tarifler</Text>
        {filteredRecipes.length === 0 ? (
          <Text style={styles.emptyText}>Henüz tarif eklenmemiş 🥄</Text>
        ) : (
          <FlatList
            data={filteredRecipes}
            keyExtractor={(item) => item.id}
            renderItem={renderRecipe}
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
  safeArea: { flex: 1, backgroundColor: "#FFF7F0" },
  container: { flex: 1, paddingHorizontal: 10, paddingTop: 10 },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF6F00",
    textAlign: "center",
    marginBottom: 10,
  },

  categoryCard: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#FFE6CC",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  categoryCardSelected: {
    transform: [{ scale: 1.05 }],
  },
  categoryImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingVertical: 6,
    alignItems: "center",
  },
  categoryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  categoryTextSelected: {
    color: "#FFB266",
    fontWeight: "bold",
  },

  recipeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 14,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  recipeRow: { flexDirection: "row", alignItems: "center" },
  recipeImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#f2f2f2",
  },
  recipeImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  recipeTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  recipeCategory: {
    fontSize: 13,
    color: "#FF6F00",
    marginTop: 3,
    fontWeight: "500",
  },
  deleteButton: {
    marginLeft: 10,
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#FFF3E0",
  },
  emptyText: {
    textAlign: "center",
    color: "#FF6F00",
    marginTop: 50,
    marginBottom: 30,
    fontSize: 18,
    fontWeight: "500",
  },
});
