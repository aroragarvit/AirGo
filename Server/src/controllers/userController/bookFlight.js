import { Flight } from "../../models/flight.mjs";
import { User } from "../../models/user.mjs";

export async function bookFlight(req, res) {
  const { flightId, seats } = req.body;
  const userId = req.user.id;
  if (!flightId || !seats) {
    return res.status(400).json({ error: "Please enter details" });
  }
  try {
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(400).json({ error: "Invalid query" });
    }
    if (flight.seats < seats) {
      return res.status(400).json({ error: "Not enough seats" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Deduct booked seats from available seats
    flight.seats -= seats;

    // Add booking to flight's bookings array
    flight.bookings.push({
      user: userId,
      seatsBooked: seats,
    });

    // Add booking to user's bookings array
    user.bookings.push({
      flight: flightId,
      seatsBooked: seats,
    });

    await flight.save();
    await user.save();

    return res.json({ message: "Booking successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
}
