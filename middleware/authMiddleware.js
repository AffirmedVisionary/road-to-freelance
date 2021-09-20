// const jwt = require("jsonwebtoken");

// Authenticate user middleware
// exports.requireLogin = (req, res, next) => {
//   try {
//     if (req.headers.authorization) {
//       // Get token from header
//       const token = req.headers.authorization.split(" ")[1];
//       // Verify token
//       const decode = jwt.verify(token, process.env.JWT_SECRET);
//       // Attach token with request
//       req.user = decode;
//       next();
//     } else {
//       return res.status(400).json({ message: "Unauthorized" });
//     }
//   } catch (err) {
//     console.log("Something went wrong");
//   }
// };


import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"

import User from "../models/user.js"

const protect = asyncHandler(async (req, res, next) => {
  let token

  // console.log(req.headers.authorization)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select("-password")

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error("Not authorised, token failed")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("No token found, Not authorised")
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error("Not authorised as admin")
  }
}


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

export { protect, admin, generateToken }
