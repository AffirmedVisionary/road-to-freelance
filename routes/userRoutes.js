const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const request = require('request')
const https = require('https')
const { requireLogin } = require('../middleware/auth')
const { runValidation } = require('../validators')
const {
  userRegisterValidator,
  userLoginValidator
} = require('../validators/authValidator')

// Register user
router.post(
  '/register',
  userRegisterValidator,
  runValidation,
  async (req, res) => {
    const { firstName, lastName, email, password, newsletter } = req.body
    try {
      if (newsletter === 'true') {
        let data = {
          members: [
            {
              email_address: email,
              status: 'subscribed',
              merge_fields: {
                FNAME: firstName,
                LNAME: lastName
              }
            }
          ]
        }
        let mailchimpData = JSON.stringify(data)

        const url = `https://us16.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}`
        const options = {
          method: 'POST',
          auth: process.env.MAILCHIMP_API_KEY
        }

        const request = https.request(url, options, function (response) {
          if (response.statusCode == 200) {
            console.log('successfully subscribed')
          } else {
            console.log('there was an error, you are not subscribed')
          }

          response.on('data', function (data) {
            console.log(JSON.parse(data))
          })
        })

        request.write(mailchimpData)
        request.end()

        let user = await User.findOne({ email })
        if (user) {
          return res.status(400).json({ error: 'User already exists' })
        }
        const hashed_password = await bcrypt.hash(password, 10)
        user = new User({
          firstName,
          lastName,
          email,
          password: hashed_password
        })
        await user.save()

        return res
          .status(201)
          .json({
            message: 'User created successfully and signed up to the newsletter'
          })
      } else {
        let user = await User.findOne({ email })
        if (user) {
          return res.status(400).json({ error: 'User already exists' })
        }
        const hashed_password = await bcrypt.hash(password, 10)
        user = new User({
          firstName,
          lastName,
          email,
          password: hashed_password
        })
        await user.save()

        return res.status(201).json({ message: 'User created successfully' })
      }
    } catch (err) {
      // console.log(err);
      return res.status(400).json({ error: err.message })
    }
  }
)

// Login user
router.post('/login', userLoginValidator, runValidation, async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (err) {
    // console.log(err);
    return res.status(400).json({ error: err.message })
  }
})

// Get logged in user
router.get('/', requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -__v')
    res.json(user)
  } catch (error) {
    // console.log(err);
    return res.status(400).json({ error: err.message })
  }
})

module.exports = router;


import express from "express"
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

router.route("/").post(registerUser).get(protect, admin, getUsers)
router.post("/login", authUser)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
