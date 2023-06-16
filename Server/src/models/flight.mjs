import mongoose from "mongoose";
import { Usser } from "./user.mjs";

const flightSchema = new mongoose.Schema({
  flightName: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  departure: {
    type: Date,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bookings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: {
        type: String,
      },

      seatsBooked: {
        type: Number,
      },
    },
  ],
});

const Flight = mongoose.model("Flight", flightSchema);
export { Flight };
