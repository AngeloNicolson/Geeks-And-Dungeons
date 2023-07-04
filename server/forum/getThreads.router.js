// MIDDLEWARE IMPORTS
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const queryValidationMiddleware = require("../middleware/queryValidationMiddleware");

// UTILS IMPORTS
const sanitizeInput = require("../utils/sanitization");

// REPOSITORY IMPORTS
const repository = require("./getThreads.repository");

/*
----------------------------------
     JOI VALIDATION SCHEMA
----------------------------------
*/
const getSingleThreadSchema = Joi.object({
  id: Joi.number().integer().positive(),
});

/*
----------------------------------
           ROUTERS
----------------------------------
*/

router.get(
  "/:id",
  queryValidationMiddleware(getSingleThreadSchema),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const forumPost = await repository.getSingleThread(sanitizeInput(id));
      return response.json(forumPost);
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }
);

router.get("/", async (request, response, next) => {
  try {
    const forumPosts = await repository.getThreads();
    return response.json(forumPosts);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
