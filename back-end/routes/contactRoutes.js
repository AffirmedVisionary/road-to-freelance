const express = require("express");
const router = express.Router();
const {
  email
} = require("../controllers/contactControllers");

//routes
router.post("/send", email)

module.exports = router;
