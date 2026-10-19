// ---- AI Routes ----
require("dotenv").config();
const aiRoutes = require("./ai/aiRoutes");

const express = require("express");
const pool = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/ai", aiRoutes); // AI Coach routes

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Hello from ByteBurn API!",
    status: "success",
  });
});

// Get all user profiles
app.get("/api/profiles", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM user_profiles ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Get profiles error:", error.message);
    res.status(500).json({ error: "Failed to retrieve profiles" });
  }
});

// ------- POST = INSERT/ Create a user profile ----------
app.post("/api/profiles", async (req, res) => {
  try {
    const {
      username,
      name,
      photo_url,
      sex,
      weight_kg,
      height_cm,
      age,
      activity_level,
    } = req.body;

    if (!username || !name) {
      return res.status(400).json({
        error: "username and name are required",
      });
    }

    // Parameterize the query $1, $2, etc.
    const result = await pool.query(
      `INSERT INTO user_profiles
        (username, name, photo_url, sex, weight_kg, height_cm)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        username,
        name,
        photo_url || null,
        sex || null,
        weight_kg ?? null,
        height_cm ?? null,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        error: "Username already exists",
      });
    }

    console.error("Create profile error:", error.message);
    res.status(500).json({ error: "Failed to create profile" });
  }
});


// ---------- PUT = EDIT/UPDATE PROFILE ----------
app.put("/api/profiles/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "Invalid profile ID",
      });
    }

    const {
      username,
      name,
      photo_url,
      sex,
      weight_kg,
      height_cm,
      age,
      activity_level,
    } = req.body;

    if (!username || !name) {
      return res.status(400).json({
        error: "username and name are required",
      });
    }

    // --- SQL Update ---
    const result = await pool.query(
      `UPDATE user_profiles
      SET username = $1,
          name = $2,
          photo_url = $3,
          sex = $4,
          weight_kg = $5,
          height_cm = $6,
          age = $7,
          activity_level = $8,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING *`,
      [
        username,
        name,
        photo_url ?? null,
        sex ?? null,
        weight_kg ?? null,
        height_cm ?? null,
        age ?? null,
        activity_level ?? null,
        id,
      ]
    );


    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Profile not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        error: "Username already exists",
      });
    }

    console.error("Update profile error:", error.message);
    res.status(500).json({
      error: "Failed to update profile",
    });
  }
});




// ---------- LISTEN ----------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`ByteBurn API running on port ${PORT}`);
});

