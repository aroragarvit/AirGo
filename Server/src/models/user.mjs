import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { Flight } from "./flight.mjs";
// can only change admin from database cannot send the request from frontend to change the admin
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailVerificationToken: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    bookings: [
      {
        flight: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Flight",
        },
        seatsBooked: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  let user = this;
  if (user.isModified("password")) {
    // if the password is modified then only we will hash the password before saving it to the database
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR));

    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } else return next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  let user = this;
  try {
    await bcrypt.compare(candidatePassword, user.password);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const User = mongoose.model("User", userSchema);

// we can crate methods on the schema and then use them on the model like this user.comparePassword
export { User };
// moongose have hooks  pre and post hooks pre hooks are executed before an event and post hooks are executed after an event pre hooks are used before saving data to database and post hooks are used after saving data to database
