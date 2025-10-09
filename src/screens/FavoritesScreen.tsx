import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Recipe {
  id: string;
  title: string;
  image?: string;
  category: string;
  ingredients: string;
  instructions: string;
}

const getImageSource = (image?: string) => {
  if (!image) return undefined;
  return image.startsWith("http") ? { uri: image } : undefined;
};

const FavoritesScreen = ({ navigation }: any) => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem("favorites");
        if (stored) setFavorites(JSON.parse(stored));
      } catch (error) {
        console.log("Favoriler yüklenirken hata:", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const handleDeleteFavorite = async (id: string) => {
    Alert.alert("Favoriden Sil", "Bu tarifi favorilerden kaldırmak istiyor musun?", [
      { text: "Vazgeç", style: "cancel" },
      {
        text: "Sil",
        style: "destructive",
        onPress: async () => {
          const updated = favorites.filter((r) => r.id !== id);
          setFavorites(updated);
          await AsyncStorage.setItem("favorites", JSON.stringify(updated));
        },
      },
    ]);
  };

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
          onPress={() => handleDeleteFavorite(item.id)}
        >
          <Icon name="trash-2" size={20} color="#FF6F00" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="#FF6F00" />
        </TouchableOpacity>
        <Text style={styles.header}>Favori Tariflerim</Text>
      </View>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Henüz favori tarif eklenmemiş!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderRecipe}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFF7F0", padding: 10 },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  backButton: {
    marginRight: 10,
    padding: 4,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FF6F00",
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
    fontSize: 18,
    fontWeight: "500",
  },
});
