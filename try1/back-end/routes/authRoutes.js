
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  requireLogin,
} = require("../controllers/authControllers");

//import validator
const { runValidation } = require("../validators");
const {
  userRegisterValidator,
  userLoginValidator,
} = require("../validators/authValidator");

//pass on controllers
router.post("/register", userRegisterValidator, runValidation, register);
router.post("/login", userLoginValidator, runValidation, login);
router.get("/logout", logout);

// test
router.get("/secret", requireLogin, (req, res) => {
  res.json({
    user: req.user,
  });
});

module.exports = router;
