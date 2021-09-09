const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      max: 20,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      max: 20,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },

    hashed_password: {
      type: String,
      required: true,
    },

    salt: String,
    about: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
    // profile: {
    //   type: String,
    //   required: true,
    // },
    // username: {
    //   type: String,
    //   trim: true,
    //   required: true,
    //   max: 30,
    //   unique: true,
    //   index: true,
    //   lowercase: true,
    // },
    // photo: {
    //   data: Buffer,
    //   contentType: String,
    // },
    // resetPasswordLink: {
    //   data: String,
    //   default: "",
    // },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    //create a temporarity variable called password
    this._password = password;
    //gererate salt
    this.salt = this.makeSalt();
    //encryptPassword
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userSchema);
