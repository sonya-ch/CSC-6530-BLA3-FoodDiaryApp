
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import myStyle from "../assets/styles/myStyle";

// -- Database --
import {
  initDatabase,
  getFoodLogsByDate,
  deleteFoodLog,
} from "../database/database";



export default function FoodDiary({ onBack }) {

// State for the selected date and food logs
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const [foodLogs, setFoodLogs] = useState([]);
  const [loading, setLoading] = useState(true);

// Meals list for quick selection
  const meals = [
    { name: "Breakfast", emoji: "🥞" },
    { name: "Lunch", emoji: "🍱" },
    { name: "Dinner", emoji: "🍝" },
  ];

  // Load food logs from SQLite for the selected date
  useEffect(() => {
    let isActive = true;

    async function loadFoodLogs() {
      try {
        setLoading(true);

        // Innittial data - Safe to call again: tables use IF NOT EXISTS
        await initDatabase();

        const logs = await getFoodLogsByDate(selectedDate);

        if (isActive) {
          setFoodLogs(logs);
        }
      } catch (error) {
        // Handle any errors that occur while loading food logs
        console.error("Failed to load food logs:", error);
        if (isActive) {
          Alert.alert(
            "Database Error",
            "Unable to load your Food Diary."
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadFoodLogs();

    return () => {
      isActive = false;
    };

  }, [selectedDate]); // Reload food logs whenever the selected date changes


  // Change selected date
  const changeDate = (days) => {

    // Create a new Date object based on the selected date
    const date = new Date(`${selectedDate}T12:00:00`);

    // Adjust the date by the specified number of days
    date.setDate(date.getDate() + days);

    // Format as YYYY-MM-DD
    setSelectedDate(
      `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` 
    );
  };


  // Calculate daily nutrition totals
  const totals = foodLogs.reduce(
    (sum, food) => ({
      calories: sum.calories + Number(food.calories || 0),
      protein: sum.protein + Number(food.protein || 0),
      carbs: sum.carbs + Number(food.carbs || 0),
      fat: sum.fat + Number(food.fat || 0),
    }),
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    }
  );

  // Delete a food log from the database and update the local state
  const handleDeleteFood = (logId, foodName) => {
    Alert.alert(
      "Delete Food",
      `Remove ${foodName} from your diary?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteFoodLog(logId);

              const logs = await getFoodLogsByDate(
                selectedDate
              );

              setFoodLogs(logs);
            } catch (error) {
              console.error("Failed to delete food log:", error);

              Alert.alert(
                "Error",
                "Unable to delete this food entry."
              );
            }
          },
        },
      ]
    );
  };

  // Format selected date for display 
  const date = new Date(`${selectedDate}T12:00:00`);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).replace(",", ".");



  // ---  Render the food diary screen ---
  return (
    <ScrollView style={myStyle.container}>
      
      {/* Header */}
      <View style={myStyle.profileHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={myStyle.profileBack}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={myStyle.profileTitle}>Food Diary</Text>

        <Text style={{ color: "#6B3E4B", marginTop: 5 }}>
          Track your daily nutrition
        </Text>
      </View>

      <View style={{ padding: 20 }}>
        {/* ----  Date Selector ------ */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => changeDate(-1)}>
            <Text style={{ fontSize: 22 }}>‹</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {formattedDate}
          </Text>

          <TouchableOpacity onPress={() => changeDate(1)}>
            <Text style={{ fontSize: 22 }}>›</Text>
          </TouchableOpacity>
        </View>

        {/* ----  Daily Nutrition Summary ------ */}
        <View
          style={{
            backgroundColor: "#FFF1F5",
            borderRadius: 14,
            padding: 18,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#6B3E4B",
            }}
          >
            Daily Summary
          </Text>

          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              marginTop: 12,
            }}
          >
            {totals.calories.toFixed(0)} kcal
          </Text>

          <Text style={{ color: "#6B3E4B" }}>
            Calories consumed
          </Text>

          <Text style={{ marginTop: 12 }}>
            Protein: {totals.protein.toFixed(1)} g
            {"  |  "}
            Carbs: {totals.carbs.toFixed(1)} g
            {"  |  "}
            Fat: {totals.fat.toFixed(1)} g
          </Text>
        </View>

        {/* ----  Loading State ------ */}
        {loading ? (
          <Text style={{ textAlign: "center", padding: 20 }}>
            Loading Food Diary...
          </Text>
        ) : (

          /* ----  Meal Sections ------ */
          meals.map((meal) => {
            const mealLogs = foodLogs.filter( // Filter food logs for the current meal
              (food) => food.meal_type === meal.name
            );

            const mealCalories = mealLogs.reduce( // Calculate total calories for the current meal
              (sum, food) =>
                sum + Number(food.calories || 0),
              0
            );

            return (
              <View
                key={meal.name}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 14,
                  borderWidth: 1,
                  borderColor: "#F0DCE2",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#6B3E4B",
                  }}
                >
                  {meal.emoji} {meal.name}
                </Text>
                
                {/* Display meal logs or a message if no food is logged yet */}
                {mealLogs.length === 0 ? (
                  <Text
                    style={{
                      marginTop: 12,
                      color: "#777777",
                    }}
                  >
                    No food logged yet.
                  </Text>
                ) : (
                  mealLogs.map((food) => (
                    <View
                      key={food.id}
                      style={{
                        marginTop: 14,
                        paddingBottom: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: "#F0DCE2",
                      }}
                    >
                      <View // Container for the food item details
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <View style={{ flex: 1, paddingRight: 10 }}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              color: "#333333",
                            }}
                          >
                            {food.food_name}
                          </Text>

                          <Text
                            style={{
                              color: "#777777",
                              marginTop: 4,
                            }}
                          >
                            {Number(food.quantity_grams)} g
                            {" · "}
                            {Number(food.calories).toFixed(0)} kcal
                          </Text>

                          <Text
                            style={{
                              color: "#777777",
                              marginTop: 3,
                              fontSize: 12,
                            }}
                          >
                            P: {Number(food.protein).toFixed(1)} g
                            {"  "}
                            C: {Number(food.carbs).toFixed(1)} g
                            {"  "}
                            F: {Number(food.fat).toFixed(1)} g
                          </Text>
                        </View>

                        <TouchableOpacity
                          onPress={() =>
                            handleDeleteFood(food.id, food.food_name)
                          }
                          style={{ padding: 8 }}
                        >
                          <Text style={{ color: "#C0395B" }}>
                            Delete
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                )}

                {mealLogs.length > 0 && (
                  <Text
                    style={{
                      marginTop: 12,
                      color: "#6B3E4B",
                      fontWeight: "bold",
                    }}
                  >
                    Meal Total: {mealCalories.toFixed(0)} kcal
                  </Text>
                )}

                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Coming Next",
                      "USDA food search will be connected in the next step."
                    )
                  }
                  style={{
                    marginTop: 14,
                    padding: 12,
                    borderRadius: 10,
                    backgroundColor: "#F8DDE5",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#6B3E4B",
                      fontWeight: "bold",
                    }}
                  >
                    + Add Food
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}
