// MIDDLEWARE IMPORTS
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const queryValidationMiddleware = require("../../../middleware/queryValidationMiddleware");

// UTILS IMPORTS
const sanitizeInput = require("../../../utils/sanitization");

// REPOSITORY IMPORTS
const repository = require("./postReply.repository");

/*
----------------------------------
     JOI VALIDATION SCHEMA
----------------------------------
*/
const createReplySchema = Joi.object({
  reply_text: Joi.string().required().messages({
    "string.empty": "Reply text cannot be empty",
    "any.required": "Reply text is required",
  }),
  thread_id: Joi.number().required().messages({
    "number.empty": "Failed setting thread id",
    "any.required": "Thread id is required",
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
  queryValidationMiddleware(null, createReplySchema),
  async (request, response, next) => {
    try {
      const { reply_text, thread_id, author } = request.body;
      const newReply = await repository.createReply(
        sanitizeInput(reply_text),
        sanitizeInput(thread_id),
        sanitizeInput(author)
      );
      return response.json(newReply);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
