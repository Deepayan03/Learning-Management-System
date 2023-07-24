// Changes:
// 1. Set the `generateJWTToken` expiration using `expiresIn` option.
// 2. Update the `confirmPassword` method with correct `await` keyword.

import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const avatarSchema = new Schema({
  public_id: {
    type: String,
    default: 'default_public_id', // You can set a default value if needed
  },
  secure_url: {
    type: String,
    default: 'https://picsum.photos/200/300?grayscale', // Default URL for the avatar
  },
});

const schema = new Schema({
  fullName: {
    type: String,
    required: [true, "Name is a required field"],
    minLength: [5, "Name must be of 5 characters"],
    maxLength: [50, "Name should not exceed 50 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is a required field"],
    minLength: [5, "Email must be of 5 characters"],
    maxLength: [50, "Email should not exceed 50 characters"],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "password is a required field"],
    minLength: [5, "Password must be of 5 characters"],
    trim: true,
    select: false, // This will prevent password from being selected by default in queries
  },
  avatar: avatarSchema,
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
}, {
  timestamps: true,
});

// Use async/await correctly in the pre-save hook
schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    return next(error);
  }
});

schema.methods = {
    generateJWTToken: function () {
      return jwt.sign(
        {
          id: this._id,
          email: this.email,
          subscription: this.subscription,
          role: this.role,
        },
        process.env.SECRET,
        {
          expiresIn: "1h",
        }
      );
    },
    confirmPassword: async function (pass) {
      return await bcrypt.compare(pass, this.password);
    },
  };
const user = model("LmsUsers", schema);
export default user;
