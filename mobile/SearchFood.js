
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


// Function to extract nutrient values from USDA food data (per 100 g)
function getNutrient(food, nutrientName) {
  const nutrient = food.foodNutrients?.find(
    (item) => item.nutrientName === nutrientName
  );

  return Number(nutrient?.value ?? 0);
}


// Function to extract calorie values (Energy) from USDA food data, to be Kcal.
// USDA Energy unit is kj,but we need kcal (kilocalories)
// if kj, kcal will be 0.
function getCaloriesPer100g(food) {
  const energy = food.foodNutrients?.find(
    (item) =>
      item.nutrientName === "Energy" &&
      item.unitName?.toLowerCase() === "kcal"
  );

  return Number(energy?.value ?? 0);
}


// Function to calculate nutrition for a given quantity of food
function getNutritionForQuantity(food, quantity) {
  const grams = Number(quantity);

  if (!food || !Number.isFinite(grams) || grams <= 0) {
    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };
  }
  const factor = grams / 100;
  return {
    calories: getCaloriesPer100g(food) * factor,
    protein: getNutrient(food, "Protein") * factor,
    carbs:
      getNutrient(food, "Carbohydrate, by difference") * factor,
    fat: getNutrient(food, "Total lipid (fat)") * factor,
  };
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

  // Calculate nutrition for the selected food and quantity
  const nutrition = getNutritionForQuantity(
    selectedFood,
    quantity
  );

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



  // --- Function to save the selected food to the diary ---
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

            // USDA nutrient values are generally reported per 100 g
            const factor = grams / 100;

            // Get nutrient values per 100 g
            const calories = getCaloriesPer100g(selectedFood);
            const protein = getNutrient(selectedFood, "Protein");
            const carbs = getNutrient(selectedFood, "Carbohydrate, by difference", );
            const fat = getNutrient( selectedFood, "Total lipid (fat)");

            // Save nutrition values calculated for the selected quantity
            await addFoodLog({
            food_id: null,
            food_name: selectedFood.description,
            meal_type: mealType,
            log_date: logDate,
            quantity_grams: grams,
            calories: calories * factor,
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




  // --- Render the Search Food Screen ---
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

        {/* Display search results only if no food is selected 
            If a food is selected, the search results will be hidden. */}
        {!selectedFood && results.map((food) => (
          <TouchableOpacity
            key={food.fdcId}
            onPress={() => {
                console.log("Selected USDA food:", food.description);
                setSelectedFood(food);
            }}
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

            {/* ----  Nutrition Estimate Section ------ */}
            <View
            style={{
                marginTop: 16,
                padding: 14,
                backgroundColor: "#FFFFFF",
                borderRadius: 10,
            }}
            >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#6B3E4B" }}>
                Nutrition Estimate
            </Text>
                <View
                    style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: 12,
                    }}>
                        {[
                        {
                            label: "Energy",
                            value: `${nutrition.calories.toFixed(1)} kcal`,
                        },
                        {
                            label: "Protein (P)",
                            value: `${nutrition.protein.toFixed(1)} g`,
                        },
                        {
                            label: "Carbs (C)",
                            value: `${nutrition.carbs.toFixed(1)} g`,
                        },
                        {
                            label: "Fat (F)",
                            value: `${nutrition.fat.toFixed(1)} g`,
                        },
                        ].map((item) => (
                        <View
                            key={item.label}
                            style={{
                            width: "50%",
                            paddingVertical: 10,
                            paddingRight: 8,
                            }}
                        >
                        <Text style={{ color: "#777777", fontSize: 12 }}>
                        {item.label}
                        </Text>
                        <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "#6B3E4B",
                            marginTop: 4,
                        }}
                        >
                        {item.value}
                        </Text>
                    </View>
                    ))}
                </View>
            </View>


        {/* ----  Save and Back Buttons ------ */}
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

            <TouchableOpacity
                onPress={() => {
                    setSelectedFood(null);
                    setQuantity("100");
                }}
                style={{
                    padding: 12,
                    alignItems: "center",
                    marginTop: 8,
                }}
                >
                <Text style={{ color: "#6B3E4B" }}>
                    ← Back to search results
                </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
