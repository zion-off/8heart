const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get(
  "/protected/home",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      message: "You have accessed the protected home page!",
      user: req.user,
    });
  }
);

module.exports = router;