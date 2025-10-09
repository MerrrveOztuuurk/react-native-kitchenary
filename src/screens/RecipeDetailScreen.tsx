import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Recipe {
  id: string;
  title: string;
  category: string;
  image?: string;
  ingredients?: string;
  instructions?: string;
  temperature: string;
  time: string;
}

type RecipeDetailRouteProp = RouteProp<{ RecipeDetail: { recipe: Recipe } }, "RecipeDetail">;

const RecipeDetailScreen = ({ navigation }: any) => {
  const route = useRoute<RecipeDetailRouteProp>();
  const { recipe } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          {/* GÖRSEL */}
          {recipe.image ? (
            <Image source={{ uri: recipe.image }} style={styles.image} />
          ) : (
            <View style={styles.placeholder} />
          )}

          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.category}>{recipe.category}</Text>

          <Text style={styles.sectionTitle}>Malzemeler</Text>
          <Text style={styles.text}>
            {recipe.ingredients
              ? recipe.ingredients.split("\n").map((line, i) => (
                  <Text key={i} style={styles.text}>
                    • {line}{" "}
                  </Text>
                ))
              : <Text style={styles.text}>Malzeme bilgisi eklenmemiş.</Text>}
          </Text>

          <Text style={styles.sectionTitle}>Yapılışı</Text>
          <Text style={styles.text}>
            {recipe.instructions ? recipe.instructions : "Yapılış bilgisi eklenmemiş."}
          </Text>

          <Text style={styles.sectionTitle}>Pişirme Bilgileri</Text>
          <View style={styles.cookingInfo}>
            {recipe.temperature && (
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>🌡️ Sıcaklık</Text>
                <Text style={styles.infoValue}>{recipe.temperature} °C</Text>
              </View>
            )}
            {recipe.time && (
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>⏱️ Süre</Text>
                <Text style={styles.infoValue}>{recipe.time} dk</Text>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.backButtonText}>Anasayfa</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF7F0",
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    width: "94%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 15,
    resizeMode: "cover",
  },
  placeholder: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 15,
    backgroundColor: "#FFE6CC",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF6F00",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "#FF6F0066",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  category: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 15,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  backButton: {
    marginTop: 25,
    backgroundColor: "#FF8FA3",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cookingInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    width: "100%",
  },
  infoBox: {
    backgroundColor: "#FFF5E6",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    minWidth: 100,
  },
  infoLabel: {
    fontSize: 14,
    color: "#FF6F00",
    fontWeight: "600",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
