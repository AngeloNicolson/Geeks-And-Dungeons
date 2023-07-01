// MIDDLEWARE IMPORTS
const express = require("express");
const router = express.Router();

// REPOSITORY IMPORTS
const repository = require("./profile.repository");

/*
----------------------------------
           ROUTERS
----------------------------------
*/
// Get user profile by username
router.get("/:auth0_id", async (request, response) => {
  try {
    const { auth0_id } = request.params;
    const userProfile = await repository.getUserProfileById(auth0_id);
    response.json(userProfile);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (request, response) => {
  try {
    const { username, auth0_id } = request.body;
    const newprofileUsername = await repository.updateUserProfileByUsername(
      username,
      auth0_id
    );

    return response.json(newprofileUsername);
  } catch (error) {
    if (error.status && error.status === 400) {
      return response.status(400).json({ error: error.message });
    } else {
      console.error(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// // Update user profile by username
// router.put("/:username", async (req, res) => {
//   try {
//     const { username } = req.params;
//     const newProfileData = req.body;
//     const updated = await profileRepository.updateUserProfileByUsername(
//       username,
//       newProfileData
//     );
//     res.json({ updated });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = router;