const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json()); //req.body

// ROUTES

app.get("/", async (request, response) => {
  try {
    const getTopic = await pool.query("SELECT * FROM post");

    response.json(getTopic.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = app;
