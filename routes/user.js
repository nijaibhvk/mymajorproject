const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userControllers = require("../controllers/user.js");

router
  .route("/signup")
  .get(userControllers.renderSignUp)
  .post(wrapAsync(userControllers.signUp));

router
  .route("/login")
  .get(userControllers.renderLogin)
  .post(
    saveRedirectUrl,
    //Passport is Express-compatible authentication middleware for Node.js.
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userControllers.login
  );

router.get("/logout", userControllers.logOut);

module.exports = router;
