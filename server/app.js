const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", async (request, response) => {
  response.send(request.params);
});

module.exports = app;
