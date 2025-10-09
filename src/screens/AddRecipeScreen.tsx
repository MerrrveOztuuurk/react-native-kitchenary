import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const categories = ["Ana Yemek", "Tatlı", "İçecek", "Hamur İşi", "Atıştırmalık"];

const AddRecipeScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [temperature, setTemperature] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Galeriyi kullanmak için izin gerekiyor!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Kamerayı kullanmak için izin gerekiyor!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!title || !category || !ingredients || !instructions || !temperature || !time) {
      Alert.alert("Eksik Alan", "Lütfen tüm alanları doldurunuz.");
      return;
    }

    const newRecipe = {
      id: Date.now().toString(),
      title,
      category,
      ingredients,
      instructions,
      temperature,
      time,
      image,
    };

    try {
      const storedData = await AsyncStorage.getItem("recipes");
      const existingRecipes = storedData ? JSON.parse(storedData) : [];
      const updatedRecipes = [...existingRecipes, newRecipe];

      await AsyncStorage.setItem("recipes", JSON.stringify(updatedRecipes));

      Alert.alert("Başarılı", "Tarif başarıyla eklendi!");
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
      Alert.alert("Hata", "Tarif kaydedilirken bir hata oluştu.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Üstte geri ok ve başlık */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backIcon}>
          <Ionicons name="arrow-back" size={26} color="#FF6F00" />
        </TouchableOpacity>
        <Text style={styles.header}>Yeni Tarif Ekle</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Galeriden Seç</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Fotoğraf Çek</Text>
          </TouchableOpacity>

          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, marginTop: 20, borderRadius: 15 }}
            />
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Tarif başlığı"
           placeholderTextColor="#999" 
          value={title}
          onChangeText={setTitle}
        />

        <View style={styles.chipsWrapper}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, category === cat && styles.categoryChipSelected]}
              onPress={() => setCategory(cat)}
            >
              <Text style={category === cat ? styles.categoryTextSelected : styles.categoryText}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Malzemeler (satır başına bir tane)"
           placeholderTextColor="#999" 
          value={ingredients}
          onChangeText={setIngredients}
          multiline
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Hazırlık Adımları"
           placeholderTextColor="#999" 
          value={instructions}
          onChangeText={setInstructions}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Pişirme Sıcaklığı (°C)"
           placeholderTextColor="#999" 
          value={temperature}
          onChangeText={setTemperature}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Pişirme Süresi (dakika)"
           placeholderTextColor="#999" 
          value={time}
          onChangeText={setTime}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Kaydet</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddRecipeScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFF7F0" },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
    marginBottom: 5,
  },
  backIcon: {
    marginRight: 10,
    padding: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6F00",
  },
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: { height: 100, textAlignVertical: "top" },
  chipsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 10,
    gap: 8,
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginBottom: 10,
    width: "30%",
    alignItems: "center",
  },
  categoryChipSelected: { backgroundColor: "#FF6F00" },
  categoryText: { color: "#333" },
  categoryTextSelected: { color: "#fff", fontWeight: "bold" },
  button: {
    backgroundColor: "#FF6F00",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  saveButton: {
    backgroundColor: "#FF6F00",
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonText: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 },
});
