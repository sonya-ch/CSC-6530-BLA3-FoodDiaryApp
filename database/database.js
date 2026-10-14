import * as SQLite from 'expo-sqlite';

import foodData from '../data/food.js'

let db;


// To use: const db = await getDatabase();
export async function getDatabase() {
  if (!db) {
    //Create and Open SQLite Database, name foodtracking.db
    //User don't need to do anything
    db = await SQLite.openDatabaseAsync('foodtracking.db');
  }

  return db;
}

// Initialize the database and create the foods table, if it doesn't exist
export async function initDatabase() {

  const db = await getDatabase();

// CREATE TABLE foods
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS foods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      calories INTEGER,
      protein REAL, -- Real is a floating-point type
      carbs REAL,
      fat REAL,
      image TEXT,
      isFavorite INTEGER DEFAULT 0 -- 1 for true, 0 for false
    );
  `);

// CREATE TABLE food_logs
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS food_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      food_id INTEGER,
      food_name TEXT NOT NULL,
      meal_type TEXT NOT NULL,
      log_date TEXT NOT NULL,
      quantity_grams REAL NOT NULL DEFAULT 100,
      calories REAL DEFAULT 0,
      protein REAL DEFAULT 0,
      carbs REAL DEFAULT 0,
      fat REAL DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

}

// Seeding data into the foods table
export async function seedFoods() {

  // Initialize the database and create the foods table, if it doesn't exist
  const db = await getDatabase();

  // Check if the foods table is already seeded 
  const result = await db.getFirstAsync(
    'SELECT COUNT(*) as count FROM foods'
  );

  // if the table is already seeded, return
  if (result.count > 0) {
    return;
  }

  // Seed the foods table with initial data
  for (const food of foodData) {
    await db.runAsync(
      `
      INSERT INTO foods
      (id, name, category, calories, protein, carbs, fat, image, isFavorite)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      food.id,
      food.name,
      food.category,
      food.calories,
      food.protein,
      food.carbs,
      food.fat,
      food.image,
      0
    );
  }
}

// --- READ ---- Show all foods
export async function getFoods() {
  const db = await getDatabase();

  const foods = await db.getAllAsync(
    "SELECT * FROM foods ORDER BY id"
  );

  return foods;
}

// ---- Add a new food item -----
export async function addFood(food) {
  const db = await getDatabase();

  const result = await db.runAsync(
    `
    INSERT INTO foods
    (name, category, calories, protein, carbs, fat, image, isFavorite)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    food.name,
    food.category,
    food.calories,
    food.protein,
    food.carbs,
    food.fat,
    food.image,
    0
  );

  return result.lastInsertRowId;
}


// ---- UPDATE - Edit Food ----
// UPDATE WHERE id == id
export async function updateFood(food) {
  const db = await getDatabase();

  await db.runAsync(
    `
    UPDATE foods
    SET
      name = ?,
      category = ?,
      calories = ?,
      protein = ?,
      carbs = ?,
      fat = ?,
      image = ?
    WHERE id = ?
    `,
    food.name,
    food.category,
    food.calories,
    food.protein,
    food.carbs,
    food.fat,
    food.image,
    food.id
  );
}


// ---------- DELETE FOOD -------------
export async function deleteFood(foodId) {
  const db = await getDatabase();

  await db.runAsync(
    "DELETE FROM foods WHERE id = ?",
    foodId
  );
}


// ----- UPDATE - Favorite Status -------
export async function updateFavorite(foodId, isFavorite) {
  const db = await getDatabase();

  await db.runAsync(
    `
    UPDATE foods
    SET isFavorite = ?
    WHERE id = ?
    `,
    isFavorite ? 1 : 0, // 1 = Fav, 0 = Not Fav
    foodId
  );
}



// --------- RESET -----------
export async function resetDatabase() {
  const db = await getDatabase();

  await db.execAsync(`
    DROP TABLE IF EXISTS foods;
  `);

  await initDatabase();
  await seedFoods();
}



/* ---------- FOOD DIARY ---------- */

// Add one food item to the diary
export async function addFoodLog(log) {
  const db = await getDatabase();

  const result = await db.runAsync(
    `INSERT INTO food_logs (
      food_id,
      food_name,
      meal_type,
      log_date,
      quantity_grams,
      calories,
      protein,
      carbs,
      fat
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    log.food_id ?? null,
    log.food_name,
    log.meal_type,
    log.log_date,
    log.quantity_grams ?? 100,
    log.calories ?? 0,
    log.protein ?? 0,
    log.carbs ?? 0,
    log.fat ?? 0
  );

  return result.lastInsertRowId;
}


// Get all food logs for a selected date
export async function getFoodLogsByDate(date) {
  const db = await getDatabase();

  return await db.getAllAsync(
    `SELECT *
     FROM food_logs
     WHERE log_date = ?
     ORDER BY id`,
    date
  );
}


// Delete one food log
export async function deleteFoodLog(logId) {
  const db = await getDatabase();

  await db.runAsync(
    "DELETE FROM food_logs WHERE id = ?",
    logId
  );
}
