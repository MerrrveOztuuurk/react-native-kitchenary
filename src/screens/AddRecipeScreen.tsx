import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = ["Main Course", "Dessert", "Drink", "Pastry"];

const AddRecipeScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");


  const handleSave = async () => {
    if (!title || !category || !ingredients || !instructions) {
      Alert.alert("Missing Field", "Please fill in all fields.");
      return;
    }

    const newRecipe = {
      id: Date.now().toString(),
      title,
      category,
      ingredients,
      instructions,
    };

    try {
     
      const storedData = await AsyncStorage.getItem("recipes");
      const existingRecipes = storedData ? JSON.parse(storedData) : [];

 
      const updatedRecipes = [...existingRecipes, newRecipe];


      await AsyncStorage.setItem("recipes", JSON.stringify(updatedRecipes));

      Alert.alert("Success", "Recipe added successfully!");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while saving the recipe.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Add New Recipe</Text>

        <TextInput
          style={styles.input}
          placeholder="Recipe Title"
          value={title}
          onChangeText={setTitle}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
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
        </ScrollView>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Materials (one per line)"
          value={ingredients}
          onChangeText={setIngredients}
          multiline
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Preparation Steps"
          value={instructions}
          onChangeText={setInstructions}
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.saveButtonText}>Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddRecipeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
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
  imagePicker: {
    backgroundColor: "#f5f5f5",
    height: 180,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePlaceholder: {
    color: "#aaa",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
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
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 8,
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
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    cursor: "pointer"
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    backgroundColor: "#f6a3d8ff",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    cursor: "pointer"
  },

});
