import { User } from "../../models/userModel.js";
import { Flight } from "../../models/flightModel.js";

export async function bookings(req, res) {
  const user = req.id;
  try {
    const bookings = await User.findById(user).populate("bookings.flight");
    return res.status(200).json({ bookings: bookings.bookings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
