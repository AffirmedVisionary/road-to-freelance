const express = require("express");
const router = express.Router();
const { read } = require("../controllers/userControllers");
const {
  requireLogin,
  authMiddleware,
} = require("../controllers/authControllers");

router.get("/profile", requireLogin, authMiddleware, read);

module.exports = router;
