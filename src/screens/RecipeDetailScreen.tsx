import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";

const { width } = Dimensions.get("window");

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

type RecipeDetailRouteProp = RouteProp<
  { RecipeDetail: { recipe: Recipe } },
  "RecipeDetail"
>;

const RecipeDetailScreen = ({ navigation }: any) => {
  const route = useRoute<RecipeDetailRouteProp>();
  const { recipe } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-left" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tarif Detayı</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          {recipe.image ? (
            <Image source={{ uri: recipe.image }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Icon name="camera" size={60} color="#FFB266" />
            </View>
          )}

          <View style={styles.overlayCard}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.category}>{recipe.category}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Malzemeler</Text>
            <Text style={styles.text}>
              {recipe.ingredients
                ? recipe.ingredients
                    .split("\n")
                    .map((line, i) => `• ${line}`)
                    .join("\n")
                : "Malzeme bilgisi eklenmemiş."}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Yapılışı</Text>
            <Text style={styles.text}>
              {recipe.instructions || "Yapılış bilgisi eklenmemiş."}
            </Text>
          </View>

          <View style={styles.section}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF8F0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: "#FF6F00",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 12,
  },
  scrollContent: {
    padding: 18,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    overflow: "hidden",
    width: width * 0.9,
  },
  image: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
  },
  placeholder: {
    width: "100%",
    height: 240,
    backgroundColor: "#FFF0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayCard: {
    marginTop: -50,
    backgroundColor: "#ffffffdd",
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FF6F00",
    textAlign: "center",
  },
  category: {
    fontSize: 15,
    color: "#888",
    marginTop: 4,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
  cookingInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 12,
  },
  infoBox: {
    backgroundColor: "#FFF5E6",
    borderRadius: 14,
    padding: 12,
    minWidth: 110,
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: "#FF6F00",
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginTop: 4,
  },
});
