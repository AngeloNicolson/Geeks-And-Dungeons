// MIDDLEWARE IMPORTS
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const queryValidationMiddleware = require("../middleware/queryValidationMiddleware");

// REPOSITORY IMPORTS
const repository = require("./profile.repository");

/*
----------------------------------
     JOI VALIDATION SCHEMA'S
----------------------------------
*/
const getUserProfileSchema = Joi.object({
  auth0_id: Joi.string(),
});

const createUserNameSchema = Joi.object({
  username: Joi.string().required(),
  auth0_id: Joi.string().required(),
});

/*
----------------------------------
           ROUTERS
----------------------------------
*/
// Get user profile by Auth0 id
router.get(
  "/:auth0_id",
  queryValidationMiddleware(getUserProfileSchema),
  async (request, response, next) => {
    try {
      const { auth0_id } = request.params;
      const userProfile = await repository.getUserProfileById(auth0_id);
      return response.json(userProfile);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Create username and auth0_id
router.post(
  "/",
  queryValidationMiddleware(null, createUserNameSchema),
  async (request, response, next) => {
    try {
      const { username, auth0_id } = request.body;
      const newprofileUsername = await repository.updateUserProfileByUsername(
        username,
        auth0_id
      );

      return response.json(newprofileUsername);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// // Update user profile by username
// router.put("/:username", async (request, response, next) => {
//   try {
//     const { username } = req.params;
//     const newProfileData = req.body;
//     const updated = await profileRepository.updateUserProfileByUsername(
//       username,
//       newProfileData
//     );
//     res.json({ updated });
//   } catch (error) {
//   console.error(error);
//   next(error);
// }
// });

module.exports = router;
