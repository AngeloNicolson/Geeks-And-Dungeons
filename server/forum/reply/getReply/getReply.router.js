// MIDDLEWARE IMPORTS
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const queryValidationMiddleware = require("../../../middleware/queryValidationMiddleware");

// UTILS IMPORTS
const sanitizeInput = require("../../../utils/sanitization");

// REPOSITORY IMPORTS
const repository = require("./getReply.repository");

/*
----------------------------------
     JOI VALIDATION SCHEMA
----------------------------------
*/
const getRepliesSchema = Joi.object({
  thread_id: Joi.number().integer().positive().required(),
});

/*
----------------------------------
           ROUTERS
----------------------------------
*/

router.get(
  "/:thread_id",
  queryValidationMiddleware(getRepliesSchema),
  async (request, response, next) => {
    try {
      const { thread_id } = request.params;
      const replies = await repository.getReplies(sanitizeInput(thread_id));
      return response.json(replies);
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }
);

module.exports = router;
