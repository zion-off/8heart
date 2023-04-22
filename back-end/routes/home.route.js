const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const homeController = require("../controllers/home.controller.js");

// router.get(
//   "/protected/home",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.json({
//       message: "You have accessed the protected home page!",
//       user: req.user,
//     });
//   }
// );

router.post(
  "/",
  (req, res, next) => { console.log("req.body: ", req.body); next(); },
  passport.authenticate("jwt", { session: false }),
  homeController.generateText
);

module.exports = router;
