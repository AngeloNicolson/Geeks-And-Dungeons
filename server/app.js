const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json()); //req.body

// ROUTES

app.post("/topic", async (request, response) => {
  try {
    const { title } = request.body;
    const newTopic = await pool.query("INSERT INTO topic (title) VALUES($1)", [
      title,
    ]);

    response.json(newTopic);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/", async (request, response) => {
  try {
    const getTopic = await pool.query("SELECT * FROM topic");

    response.json(getTopic.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = app;
