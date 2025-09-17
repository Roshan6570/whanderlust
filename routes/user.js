const express=require("express");
const { route } = require("./listing");
const wrapAsync = require("../utils/wrapAsync");
const router=express.Router();
const passport=require("passport");
const {savesRedirectUrl}=require("../middleware.js");

const userController=require("../Controllers/users.js");


router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signUpRoute));

router.route("/login")
.get(userController.renderLoginForm)
.post(
  savesRedirectUrl,
  passport.authenticate("local", {
    failureRedirect:"/login",
    failureFlash:true,
  }),
  userController.login
);


router.get("/logout",userController.logOut);


module.exports=router;