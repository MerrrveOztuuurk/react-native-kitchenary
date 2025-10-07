import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Recipe {
  id: string;
  title: string;
  category: string;
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
         
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.category}>{recipe.category}</Text>

          <Text style={styles.sectionTitle}>🧂 Malzemeler</Text>
          <Text style={styles.text}>
            {recipe.ingredients ? recipe.ingredients : "Malzeme bilgisi eklenmemiş."}
          </Text>
          <Text style={styles.sectionTitle}>👩‍🍳 Yapılışı</Text>
          <Text style={styles.text}>
            {recipe.instructions ? recipe.instructions : "Yapılış bilgisi eklenmemiş."}
          </Text>

          <Text style={styles.sectionTitle}>🔥 Pişirme Bilgileri</Text>
          {(recipe.temperature || recipe.time) && (
            <Text style={styles.infoText}>
              {recipe.temperature ? `🌡️ ${recipe.temperature} °C` : ""}{" "}
              {recipe.time ? `⏱️ ${recipe.time} dk` : ""}
            </Text>
          )}
        </View>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
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
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FF6F00",
    textAlign: "center",
    marginBottom: 6,
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
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#FFF2E0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 5,
    fontSize: 16,
    color: "#333",
  },
  infoText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 16,
    color: "#FF6F00",
    fontWeight: "500",
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
});
