import express from "express"
import { runValidation }from '../validators/index.js'
import {
  userRegisterValidator,
  userLoginValidator
} from '../validators/authValidator.js'

const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"

router.post("/register", registerUser, userRegisterValidator, runValidation)
router.post("/login", authUser, userLoginValidator, runValidation)
router
.route("/profile")
.get(protect, getUserProfile)
.put(protect, updateUserProfile)

export default router
