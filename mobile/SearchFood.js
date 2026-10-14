
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";


// Database integration for adding food logs    
import { addFoodLog } from "../database/database";

import myStyle from "../assets/styles/myStyle";

// USDA API key for accessing the USDA Food Data Central API
const USDA_API_KEY = process.env.EXPO_PUBLIC_USDA_API_KEY;

// Function to extract nutrient values from USDA food data
function getNutrient(food, nutrientName) {
  const nutrient = food.foodNutrients?.find(
    (item) => item.nutrientName === nutrientName
  );

  return Number(nutrient?.value || 0);
}

// Component for searching and adding food to the diary
export default function SearchFood({ mealType, logDate, onBack }) 
{
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState("100");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Function to search for foods using the USDA API
  const searchFoods = async () => {
    if (!query.trim()) {
      Alert.alert("Search Food", "Please enter a food name.");
      return;
    }

    if (!USDA_API_KEY) {
      Alert.alert(
        "Missing API Key",
        "Please check EXPO_PUBLIC_USDA_API_KEY in your .env file."
      );
      return;
    }

    try {
      setLoading(true);
      setResults([]);
      setSelectedFood(null);

      const url =
        "https://api.nal.usda.gov/fdc/v1/foods/search" +
        `?api_key=${USDA_API_KEY}` +
        `&query=${encodeURIComponent(query.trim())}` +
        "&pageSize=20" +
        "&dataType=Foundation,SR%20Legacy";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`USDA API error: ${response.status}`);
      }

      const data = await response.json();

      setResults(data.foods || []);

      if (!data.foods?.length) {
        Alert.alert("No Results", "Try another food name.");
      }
    } catch (error) {
      console.error("USDA search error:", error);

      Alert.alert(
        "Search Failed",
        "Unable to search USDA. Please check your connection and API key."
      );
    } finally {
      setLoading(false);
    }
  };

  const saveFood = async () => {
    if (!selectedFood) return;

    const grams = Number(quantity);

    if (!Number.isFinite(grams) || grams <= 0) {
      Alert.alert(
        "Invalid Quantity",
        "Please enter a quantity greater than 0 grams."
      );
      return;
    }

    try {
      setSaving(true);

      // *** USDA nutrient values are generally reported per 100 g
      const factor = grams / 100;

      const calories = getNutrient(selectedFood, "Energy");
      const protein = getNutrient(selectedFood, "Protein");
      const carbs = getNutrient(
        selectedFood,
        "Carbohydrate, by difference"
      );
      const fat = getNutrient(
        selectedFood,
        "Total lipid (fat)"
      );

      // Prefer the kcal energy value when available
      const energyNutrient = selectedFood.foodNutrients?.find(
        (item) =>
          item.nutrientName === "Energy" &&
          ["kcal", "KCAL"].includes(item.unitName)
      );

      // Calculate the final calorie value based on the energy nutrient and the quantity factor  
      const finalCalories = energyNutrient
        ? Number(energyNutrient.value || 0) * factor
        : calories * factor;

      // Add the food log to the database with the calculated nutrient values
      await addFoodLog({
        food_id: null,
        food_name: selectedFood.description,
        meal_type: mealType,
        log_date: logDate,
        quantity_grams: grams,
        calories: finalCalories,
        protein: protein * factor,
        carbs: carbs * factor,
        fat: fat * factor,
      });

      Alert.alert("Success", "Food added to your diary!", [
        {
          text: "OK",
          onPress: onBack,
        },
      ]);
    } catch (error) {
      console.error("Save food error:", error);

      Alert.alert(
        "Save Failed",
        "Unable to save food to your diary."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={myStyle.container}>
      <View style={myStyle.profileHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={myStyle.profileBack}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={myStyle.profileTitle}>Search Food</Text>

        <Text style={{ color: "#6B3E4B", marginTop: 5 }}>
          {mealType} · {logDate}
        </Text>
      </View>

      <View style={{ padding: 20 }}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search food, e.g. raw chicken breast"
          onSubmitEditing={searchFoods}
          returnKeyType="search"
          style={{
            backgroundColor: "#FFFFFF",
            borderWidth: 1,
            borderColor: "#F0DCE2",
            borderRadius: 10,
            padding: 12,
            marginBottom: 12,
          }}
        />

        <TouchableOpacity
          onPress={searchFoods}
          disabled={loading}
          style={{
            backgroundColor: "#6B3E4B",
            padding: 14,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
            {loading ? "Searching..." : "Search USDA"}
          </Text>
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator style={{ marginTop: 20 }} />
        )}

        {results.map((food) => (
          <TouchableOpacity
            key={food.fdcId}
            onPress={() => setSelectedFood(food)}
            style={{
              backgroundColor:
                selectedFood?.fdcId === food.fdcId
                  ? "#FFF1F5"
                  : "#FFFFFF",
              borderWidth: 1,
              borderColor:
                selectedFood?.fdcId === food.fdcId
                  ? "#C76B86"
                  : "#F0DCE2",
              borderRadius: 10,
              padding: 14,
              marginTop: 12,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#6B3E4B" }}>
              {food.description}
            </Text>

            <Text style={{ color: "#777777", marginTop: 5 }}>
              {food.dataType || "USDA Food"}
            </Text>

            <Text style={{ marginTop: 5 }}>
              {getNutrient(food, "Energy")} kcal ·
              {" "}Protein {getNutrient(food, "Protein").toFixed(1)} g
              {" "}per 100 g
            </Text>
          </TouchableOpacity>
        ))}

        {selectedFood && (
          <View
            style={{
              backgroundColor: "#FFF1F5",
              padding: 16,
              borderRadius: 12,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Selected Food
            </Text>

            <Text style={{ marginTop: 8 }}>
              {selectedFood.description}
            </Text>

            <Text style={{ marginTop: 16, fontWeight: "bold" }}>
              Quantity (grams)
            </Text>

            <TextInput
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="decimal-pad"
              style={{
                backgroundColor: "#FFFFFF",
                borderWidth: 1,
                borderColor: "#F0DCE2",
                borderRadius: 10,
                padding: 12,
                marginTop: 8,
              }}
            />

            <TouchableOpacity
              onPress={saveFood}
              disabled={saving}
              style={{
                backgroundColor: "#6B3E4B",
                padding: 14,
                borderRadius: 10,
                alignItems: "center",
                marginTop: 16,
              }}
            >
              <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                {saving ? "Saving..." : "Save to Food Diary"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
