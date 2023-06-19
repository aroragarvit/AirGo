import { Flight } from "../../models/flight.mjs";
import { User } from "../../models/user.mjs";

export const viewBookings = async (req, res) => {
  const { flightId } = req.body;
  console.log("Flight id is");
  console.log(flightId);

  if (!flightId) {
    return res.status(400).json({ error: "FlightId is required" });
  }
  try {
    const flight = await Flight.find({
      flightName: flightId,
    }).populate("bookings.user", "username email -_id");
    return res.status(200).json({ flight: flight });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
