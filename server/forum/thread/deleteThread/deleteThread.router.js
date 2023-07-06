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
  id: Joi.number().integer().positive(),
});

router.delete(
  "/id",
  queryValidationMiddleware(deleteThreadSchema),
  async () => {
    try {
      const { id } = request.params;
      const threadDelete = await repository.deleteThread(sanitizeInput(id));
      return response.json(threadDelete);
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }
);

module.exports = router;
