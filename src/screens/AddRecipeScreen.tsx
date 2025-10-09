import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    if (status !== 'granted') {
      alert('Galeriyi kullanmak için izin gerekiyor!');
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
    if (status !== 'granted') {
      alert('Kamerayı kullanmak için izin gerekiyor!');
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
      image, // görsel URI burada kaydediliyor
    };

    try {
      const storedData = await AsyncStorage.getItem("recipes");
      const existingRecipes = storedData ? JSON.parse(storedData) : [];

      const updatedRecipes = [...existingRecipes, newRecipe];

      await AsyncStorage.setItem("recipes", JSON.stringify(updatedRecipes));

      Alert.alert("Başarılı", "Tarif başarıyla eklendi!");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Hata", "Tarif kaydedilirken bir hata oluştu.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Yeni Tarif Ekle</Text>

       <View style={{ alignItems: 'center', marginTop: 50 }}>
   <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Galeriden Seç</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Fotoğraf Çek</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />}
    </View>

        <TextInput
          style={styles.input}
          placeholder="Tarif başlığı"
          value={title}
          onChangeText={setTitle}
        />

        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
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
        </ScrollView>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Malzemeler (satır başına bir tane)"
          value={ingredients}
          onChangeText={setIngredients}
          multiline
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Hazırlık Adımları"
          value={instructions}
          onChangeText={setInstructions}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Pişirme Sıcaklığı (°C)"
          value={temperature}
          onChangeText={setTemperature}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Pişirme Süresi (dakika)"
          value={time}
          onChangeText={setTime}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Kaydet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.saveButtonText}>Anasayfa</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddRecipeScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFF7F0" },
  container: { padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", color: "#FF6F00", marginBottom: 15, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 12, fontSize: 16, marginBottom: 15 },
  textArea: { height: 100, textAlignVertical: "top" },
  categoryChipSelected: { backgroundColor: "#FF6F00" },
  categoryText: { color: "#333" },
  categoryTextSelected: { color: "#fff", fontWeight: "bold" },
  saveButton: { backgroundColor: "#FF6F00", paddingVertical: 16, borderRadius: 30, marginTop: 20, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 6, elevation: 4 },
  saveButtonText: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 },
  backButton: { backgroundColor: "#f59ad7ff", paddingVertical: 16, borderRadius: 30, marginTop: 20, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 6, elevation: 4 },
  chipsWrapper: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginVertical: 10, gap: 8 },
  categoryChip: { paddingVertical: 8, paddingHorizontal: 14, backgroundColor: "#eee", borderRadius: 20, marginBottom: 10, width: "30%", alignItems: "center" },
  imagePicker: {
    backgroundColor: "#FFF5E6",
    borderRadius: 12,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    overflow: "hidden",
  },
  imagePickerText: { color: "#FF6F00", fontSize: 16, fontWeight: "bold" },
  selectedImage: { width: "100%", height: "100%", resizeMode: "cover" },
  button: {
    backgroundColor: '#FF6F00',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  image: { width: 200, height: 200, marginTop: 20, borderRadius: 15 },
});
