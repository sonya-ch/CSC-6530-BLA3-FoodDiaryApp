
const express = require("express");
const pool = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());

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

// Create a user profile
app.post("/api/profiles", async (req, res) => {
  try {
    const {
      username,
      name,
      photo_url,
      sex,
      weight_kg,
      height_cm,
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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`ByteBurn API running on port ${PORT}`);
});

