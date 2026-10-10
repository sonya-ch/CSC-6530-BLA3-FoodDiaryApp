import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";


// --- Props ---
import Home from "./Home"; //props Home
import Favorites from "./Favorites";
import FoodDetail from "./FoodDetail"; //Food Detail
import AddFood from "./AddFood";
import Profile from "./Profile"; // Profile Page

// --- Old Data --- 
//import foodData from "../data/food";

// --- SQLite Database Initialization ---  
import { useEffect } from 'react';
import {
  initDatabase,
  seedFoods,
  getFoods,
  addFood as addFoodToDatabase, //Add - Change name for foodhandler
  updateFood as updateFoodInDatabase, // Edit
  deleteFood as deleteFoodFromDatabase,// Delete
  updateFavorite
} from "../database/database";


// --- Style ---
import myStyle from "../assets/styles/myStyle.js";


export default function App() {
  
  // --- State ---
  //state Current screen, innitialize to "home"
  const [screen, setScreen] = useState("home");
  const [menuVisible, setMenuVisible] = useState(false); // Menu visibility state
 

  //---- Food data -----
 // const [foods, setFoods] = useState(foodData);
  const [foods, setFoods] = useState([]); //SQLite

  //Empty array for favorites food
  const [favorites, setFavorites] = useState([]);

  // When select food > go to FoodDetail page
  const [selectedFood, setSelectedFood] = useState(null);


  // ------- Functions ------

  // Open Food Detail Page
  const openFoodDetail = (food) => {
    setSelectedFood(food);
    setScreen("detail");
  };

  // Go Back to Home Page
  const goBackHome = () => {
    setSelectedFood(null);
    setScreen("home");
  };


  // ---- CURD -----
  // Open Add Food Page
  const openAddFood = () => {
    setScreen("add");
  };


  // CREATE - Add New Food
  const handleAddFood = async (newFood) => {
    try {
      console.log("ADDING FOOD TO DATABASE:", newFood);

      await addFoodToDatabase(newFood);
      await loadFoods();

      setScreen("home");
    } catch (error) {
      console.error("Error adding food:", error);
    }
};


  //--- DELETE - Delete food ---
const deleteFood = async (foodId) => {
  try {
    console.log("DELETING FOOD FROM DATABASE:", foodId);

    await deleteFoodFromDatabase(foodId);

    await loadFoods();

    setSelectedFood(null);
    setScreen("home");
  } catch (error) {
    console.error("Error deleting food:", error);
  }
};



  //--- EDIT and UPDATE ---
  const openEditFood = (food) => {
    setSelectedFood(food);
    setScreen("edit");
  };

  const updateFood = async (updatedFood) => {
    try {
      console.log("UPDATING FOOD IN DATABASE:", updatedFood);

      await updateFoodInDatabase(updatedFood);

      await loadFoods();

      setSelectedFood(updatedFood);
      setScreen("detail");
    } catch (error) {
      console.error("Error updating food:", error);
    }
  };

   // ------- Favorite ---------
  const toggleFavorite = async (food) => {
    try {
      const newFavoriteStatus = food.isFavorite ? 0 : 1;

      await updateFavorite(food.id, newFavoriteStatus);

      await loadFoods();
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  // ----- Database Setup -------
useEffect(() => {
  async function setupDatabase() {
    try {
      await initDatabase(); // Initialize the database
      await seedFoods();    // Seed the database with initial data
      await loadFoods();    // Load foods from SQLite

      console.log("Database ready!");

    } catch (error) {
      console.error("Database setup error:", error);
    }
  }

  setupDatabase();
}, []);
  //[] = empty dependency array, 
  // so this effect runs only once after the initial render

  
 // ------ NEW Reload Food after Favorites
  const loadFoods = async () => {
    try {
      const data = await getFoods();

      setFoods(data);

      const favoriteFoods = data.filter(
        (food) => food.isFavorite === 1
      );

      setFavorites(favoriteFoods);

      console.log("Foods from SQLite:", data);
      console.log("Favorites from SQLite:", favoriteFoods);
    } catch (error) {
      console.error("Error loading foods:", error);
    }
  };

  // ------- UI Rendering -------
  return (
    <View style={{ flex: 1 }}>

      {/* --- Render Screen --- */}
      {screen === "home" ? (
        <Home
          foods={foods}
          favorites={favorites}
          setFavorites={setFavorites}
          openFoodDetail={openFoodDetail}
          openAddFood={openAddFood}
          toggleFavorite={toggleFavorite}
          onOpenMenu={() => setMenuVisible(true)}
        />

      ) : screen === "favorites" ? (
        <Favorites
          favorites={favorites}
          setFavorites={setFavorites}
          openFoodDetail={openFoodDetail}
        />

      ) : screen === "detail" ? (
        <FoodDetail 
         food={selectedFood}
         onBack={goBackHome}
         onDelete={deleteFood} 
         onEdit={openEditFood}
         />

      ) : screen === "add" ? (
        <AddFood 
          onAddFood={handleAddFood} 
          onBack={goBackHome} 
        />

      ) : screen === "edit" ? (
        <AddFood
          foodToEdit={selectedFood}
          onUpdateFood={updateFood}
          onBack={() => setScreen("detail")}
        />

      ) : screen === "profile" ? (
         <Profile onBack={() => setScreen("home")} />
      
      ) : null}

      {/* --- Navigation Bar --- */}
      <View style={myStyle.navbar}>
        <TouchableOpacity onPress={() => setScreen("home")}>
          <Text>🏠 Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen("favorites")}>
          <Text>❤️ Favorites</Text>
        </TouchableOpacity>
      </View>
      
      {/* ----- Menu Overlay ------ */}  
      {menuVisible && (
        <View style={myStyle.menuOverlay}>
          <View style={myStyle.menuPanel}>
            <Text style={myStyle.menuPanelTitle}>ByteBurn Menu</Text>

            <TouchableOpacity
              style={myStyle.menuItem}
              onPress={() => {
                setMenuVisible(false);
                setScreen("home");
              }}
            >
              <Text style={myStyle.menuItemText}>🏠 Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={myStyle.menuItem}
              onPress={() => {
                setMenuVisible(false);
                setScreen("favorites");
              }}
            >
              <Text style={myStyle.menuItemText}>💗 Favorites</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={myStyle.menuItem}
              onPress={() => {
                setMenuVisible(false);
                setScreen("profile");
              }}
            >
              <Text style={myStyle.menuItemText}>👤 My Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={myStyle.menuCloseButton}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={myStyle.menuCloseText}>Close Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}


    </View>
  );
}
