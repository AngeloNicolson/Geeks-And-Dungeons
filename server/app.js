// MIDDLEWARE
const express = require("express");
const app = express();
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");

// ROUTES
const postThreadRouter = require("./forum/postThread.router");
const getThreadRouter = require("./forum/getThreads.router");

const jwtCheck = auth({
  audience: "https://gnd-api",
  issuerBaseURL: "https://angelo-nicolson.au.auth0.com/",
  tokenSigningAlg: "RS256",
});

// Middleware
app.use(cors());
app.use(jwtCheck);
app.use(express.json()); //req.body

app.use(express.static("public")); // Function to serve all static files inside public directory.
app.use("/images", express.static("images"));

// ROUTES
app.use("/api/new-thread", postThreadRouter);
app.use("/api/get-threads", getThreadRouter);

module.exports = app;
