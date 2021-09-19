import asyncHandler from "express-async-handler"
import User from "../models/user";

// @desc authenticate and validate username and password then get token
// @route POST api/users/login
// @access Public Route
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  // match password function is in the user model / schema
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid Username or Password")
  }
})
