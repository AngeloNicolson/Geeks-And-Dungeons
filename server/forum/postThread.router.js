// MIDDLEWARE IMPORTS
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const queryValidationMiddleware = require("../middleware/queryValidationMiddleware");

// UTILS IMPORTS
const sanitizeInput = require("../utils/sanitization");

// REPOSITORY IMPORTS
const repository = require("./postThread.repository");

/*
----------------------------------
     JOI VALIDATION SCHEMA
----------------------------------
*/
const createThreadSchema = Joi.object({
  thread_title: Joi.string().required(),
  thread_text: Joi.string().required(),
  updated_at: Joi.date(),
  topic_id: Joi.number().required(),
  author: Joi.string().required(),
});

/*
----------------------------------
           ROUTERS
----------------------------------
*/
router.post(
  "/",
  queryValidationMiddleware(createThreadSchema),
  async (request, response) => {
    try {
      const { thread_title, thread_text, updated_at, topic_id, author } =
        request.body;
      const newPost = await repository.createThread(
        sanitizeInput(thread_title),
        sanitizeInput(thread_text),
        updated_at,
        sanitizeInput(topic_id),
        sanitizeInput(author)
      );
      return response.json(newPost);
    } catch (err) {
      if (error.status && error.status === 400) {
        return response.status(400).json({ error: error.message });
      } else {
        console.error(error);
        return response.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
);

module.exports = router;
