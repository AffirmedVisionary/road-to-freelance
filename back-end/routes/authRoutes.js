
const express = require("express");
const route = express.Router();
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
route.post("/register", userRegisterValidator, runValidation, register);
route.post("/login", userLoginValidator, runValidation, login);
route.get("/logout", logout);

// test
route.get("/secret", requireLogin, (req, res) => {
  res.json({
    user: req.user,
  });
});

module.exports = route;
