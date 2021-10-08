import asyncHandler from "express-async-handler"
import User from "../models/user.js";

// @desc GET all users
// @route POST api/users
// @access Private/Admin Route
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})

  res.json(users)
})

// @desc delete a user
// @route DELETE api/users/:api
// @access Private/Admin Route
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: "User Removed" })
  } else {
    res.status(404)
    throw new Error("User Not Found")
  }
})

// @desc GET a user by id
// @route GET api/users/:id
// @access Private/Admin Route
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password")

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error("User Not Found")
  }
})

// @desc UPDATE user
// @route PUT api/users/:id
// @access Private/Admin Route
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("User not Found")
  }
})

export {
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
