const mongoose = require("mongoose");
//a node module that hashes passwords
const crypto = require("crypto");
//generates unique ID strings
// const { v1: uuidv1 } = require("uuid");
let uuidv1 = require("uuidv1");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String, //identifier
    role: {
      type: Number,
      default: 0, //admin or user (admin 0 by default)
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

//virtual field
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1(); //generates random string
    this.hashed_password = this.encryptPassword(password); //gets user input password and hashes it
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) { //plaintext here is the use input password
    return this.encryptPassword(plainText) === this.hashed_password;
    //return true if password match, else return false
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto //part of node documentation for hashing password
        .createHmac("sha1", this.salt) //method that hashes password , salt - long complicated unique string
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

//export model so this usermodel can be reused to create users
module.exports = mongoose.model("User", userSchema);
