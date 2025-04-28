const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  OtpVerification,
  ResendOtp,
  ResetPassword,
  ForgotPassword,
} = require("..//controllers/user");
const passport = require("..//configs/passport");

passport.serializeUser(function ({ user, token }, done) {
  done(null, user._id);
});
passport.deserializeUser(async function (id, done) {
  const user = await User.findById(id);
  done(null, user);
});

router.post("/register", Register);
router.post("/login", Login);
router.post("/otpverification/:id", OtpVerification);
router.post("/resendotp/:id", ResendOtp);
router.post("/forgotpassword", ForgotPassword);
router.put("/forgotpassword/resetpassword/:id", ResetPassword);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async function (req, res) {
    res.redirect("/");
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async function (req, res) {
    const { user, token } = req.user.user;
    console.log({ user, token });
    res.redirect("/");
  }
);

module.exports = router;
