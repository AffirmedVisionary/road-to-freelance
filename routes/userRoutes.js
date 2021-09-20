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
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

router.post("/register", registerUser, userRegisterValidator, runValidation)
router.post("/login", authUser, userLoginValidator, runValidation)
router
.route("/profile")
.get(protect, getUserProfile)
.put(protect, updateUserProfile)

// for admin only
router.route("/admin/").get(protect, admin, getUsers)
router
  .route("/admin/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
