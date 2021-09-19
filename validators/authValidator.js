import { check } from "express-validator";

const userRegisterValidator = [
  check("firstName").not().isEmpty().withMessage("First Name is required"),
  check("lastName").not().isEmpty().withMessage("Last Name is required"),
  check("email").isEmail().withMessage("Must be a valid mail address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 char"),
];

const userLoginValidator = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 char"),
];

export { userLoginValidator, userRegisterValidator }
