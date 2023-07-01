// MIDDLEWARE IMPORTS
const express = require("express");
const router = express.Router();

// REPOSITORY IMPORTS
const profileRepository = require("./profile.repository");

/*
----------------------------------
           ROUTERS
----------------------------------
*/
// Get user profile by username
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const userProfile = await profileRepository.getUserProfileByUsername(
      username
    );
    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create-username", async (req, res) => {
  try {
    const { username, auth0Id } = req.body;
    await repository.updateUserProfileByUsername(username, auth0Id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update user profile by username
router.put("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const newProfileData = req.body;
    const updated = await profileRepository.updateUserProfileByUsername(
      username,
      newProfileData
    );
    res.json({ updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
