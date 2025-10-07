import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF7F0", 
  },
  container: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF6F00",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  categoryChipSelected: {
    backgroundColor: "#FF6F00",
  },
  categoryText: {
    color: "#333",
  },
  categoryTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
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
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
  backgroundColor: "#f59ad7ff",
  paddingVertical: 16,
  borderRadius: 30,
  marginTop: 20,
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowRadius: 6,
  elevation: 4,
  },
  chipsWrapper: {
  flexDirection: "row",
  flexWrap: "wrap",      
  justifyContent: "space-between", 
  marginVertical: 10,
  gap:8
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
});
