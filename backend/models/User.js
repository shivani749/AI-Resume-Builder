const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },
 
  otp: {
  type: String,
  default: null,
},

otpExpire: {
  type: Date,
  default: null,
},

isVerified: {
  type: Boolean,
  default: false,
},
 },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;