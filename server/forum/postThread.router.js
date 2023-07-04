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
  thread_title: Joi.string().required().messages({
    "string.empty": "Thread title cannot be empty",
    "any.required": "Thread title is required",
  }),
  thread_text: Joi.string().required().messages({
    "string.empty": "Thread text cannot be empty",
    "any.required": "Thread text is required",
  }),
  updated_at: Joi.date(),
  topic_id: Joi.number().required().messages({
    "number.empty": "Please select a topic card",
    "any.required": "Topic card is required",
  }),
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
  async (request, response, next) => {
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
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
