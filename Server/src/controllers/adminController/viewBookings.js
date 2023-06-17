import { Flight } from "../../models/Flight.mjs";
import { User } from "../../models/User.mjs";

export const viewBookings = async (req, res) => {
  const { flightId } = req.body;
  const userId = req.id;
  try {
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!flightId) {
      return res.status(400).json({ error: "FlightId is required" });
    }

    const flight = await Flight.findById(flightId).populate("bookings.user");

    if (!flight) {
      return res.status(400).json({ error: "FlightId is not valid" });
    }

    if (flight.bookings.length == 0) {
      return res.status(400).json({ error: "No Bookings" });
    }

    if (userId) {
      const user = await User.findById(userId);
      if (!user) {
        return res
          .status(401)
          .json({ error: "Unauthorized User Not in database" });
      } else if (!user.isAdmin) {
        return res.status(401).json({ error: "Not an Admin" });
      }

      // Return flight details along with bookings
      res.json({
        flightName: flight.flightName,
        flightId: flight._id,
        departure: flight.departure,
        source: flight.source,
        destination: flight.destination,
        bookings: flight.bookings,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
