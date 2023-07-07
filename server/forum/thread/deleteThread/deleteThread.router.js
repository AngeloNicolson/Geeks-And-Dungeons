// MIDDLEWARE IMPORTS
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const queryValidationMiddleware = require("../../../middleware/queryValidationMiddleware");

// UTILS IMPORTS
const sanitizeInput = require("../../../utils/sanitization");

// REPOSITORY IMPORTS
const repository = require("./deleteThread.repository");

/*
----------------------------------
     JOI VALIDATION SCHEMA
----------------------------------
*/
const deleteThreadSchema = Joi.object({
  thread_id: Joi.number().integer().positive(),
});

router.delete(
  "/:thread_id",

  queryValidationMiddleware(deleteThreadSchema),
  async (request, response, next) => {
    try {
      const { thread_id } = request.params;
      const threadDelete = await repository.deleteThread(
        sanitizeInput(thread_id)
      );
      return response.json(threadDelete);
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }
);

module.exports = router;
