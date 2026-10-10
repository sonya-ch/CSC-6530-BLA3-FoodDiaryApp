// PostgreSQL connection pool - Backend connect to database by not reconnect everytime

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
