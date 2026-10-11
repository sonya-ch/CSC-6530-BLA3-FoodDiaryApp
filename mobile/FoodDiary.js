
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import myStyle from "../assets/styles/myStyle";

export default function FoodDiary({ onBack }) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const meals = [
    { name: "Breakfast", emoji: "🥞" },
    { name: "Lunch", emoji: "🍱" },
    { name: "Dinner", emoji: "🍝" },
  ];

  const changeDate = (days) => {
    const date = new Date(`${selectedDate}T12:00:00`);
    date.setDate(date.getDate() + days);
    setSelectedDate(date.toISOString().slice(0, 10));
  };

  return (
    <ScrollView style={myStyle.container}>
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
        {/* Date Selector */}
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
        {(() => {
            const date = new Date(`${selectedDate}T12:00:00`);
            const weekday = date.toLocaleDateString("en-US", {
            weekday: "short",
            });
            const month = date.toLocaleDateString("en-US", {
            month: "short",
            });
            const day = date.getDate();
            const year = date.getFullYear();

            return `${weekday}. ${month}. ${day}, ${year}`; // Sat. Oct. 10, 2026
        })()}
        </Text>

          <TouchableOpacity onPress={() => changeDate(1)}>
            <Text style={{ fontSize: 22 }}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Nutrition Summary */}
        <View
          style={{
            backgroundColor: "#FFF1F5",
            borderRadius: 14,
            padding: 18,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#6B3E4B" }}>
            Daily Summary
          </Text>

          <Text style={{ fontSize: 28, fontWeight: "bold", marginTop: 12 }}>
            0 kcal
          </Text>

          <Text style={{ color: "#6B3E4B" }}>
            Calories consumed
          </Text>

          <Text style={{ marginTop: 12 }}>
            Protein: 0 g  |  Carbs: 0 g  |  Fat: 0 g
          </Text>
        </View>

        {/* Meal Sections */}
        {meals.map((meal) => (
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

            <Text style={{ marginTop: 12, color: "#777777" }}>
              No food logged yet.
            </Text>

            <TouchableOpacity
              style={{
                marginTop: 14,
                padding: 12,
                borderRadius: 10,
                backgroundColor: "#F8DDE5",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#6B3E4B", fontWeight: "bold" }}>
                + Add Food
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
