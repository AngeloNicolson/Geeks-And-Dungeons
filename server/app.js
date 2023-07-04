// MIDDLEWARE IMPORTS
const express = require("express");
const app = express();
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");

// ROUTE IMPORTS
const postThreadRouter = require("./forum/thread/postThread/postThread.router");
const getThreadRouter = require("./forum/thread/getThread/getThreads.router");
const profileRouter = require("./profile/profile.router");
const errorHandler = require("./middleware/errorHandler");
const joiErrorHandler = require("./middleware/joiErrorHandler");

const jwtCheck = auth({
  audience: "https://gnd-api",
  issuerBaseURL: "https://angelo-nicolson.au.auth0.com/",
  tokenSigningAlg: "RS256",
});

// MIDDLEWARE
app.use(cors());
app.use(express.json());

app.use(express.static("public")); // Function to serve all static files inside public directory.
app.use("/images", express.static("images"));

// OPEN ROUTES
app.use("/api/get-threads", getThreadRouter);

// PROTECTED ROUTES
app.use(jwtCheck); // PROTECTS ROUTES BELOW
app.use("/api/new-thread", postThreadRouter);
app.use("/api/profile", profileRouter);

// ERROR HANDLERS
app.use(joiErrorHandler);
app.use(errorHandler);

module.exports = app;
