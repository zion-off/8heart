const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");
const User = require("../models/User.js");

router.post("/", async (req, res, next) => {
  console.log("req.body: ", req.body);
  try {
    const user = await User.findOne({ username: req.body.nameCookie });
    if (!user) {
      throw new Error("User not found in database");
    }
    const link = user.uniqueLink;
    res.send(link);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
