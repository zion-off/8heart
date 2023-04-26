const express = require('express');
const router = express.Router();
const User = require("../models/User.js");

router.get("/users/:uniqueLink", async (req, res) => {
    try {
      const user = await User.findOne({ uniqueLink: req.params.uniqueLink });
      if (!user) {
        // Handle case where user with matching uniqueLink is not found
        res.status(404).send("User not found.");
      } else {
        // Use the user object to render the unique link page
        res.render("Ranking", { user });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error.");
    }
  });

module.exports = router;