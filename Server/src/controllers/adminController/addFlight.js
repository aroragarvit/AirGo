import { Flight } from "../../models/flight.mjs";
import { User } from "../../models/user.mjs";

export async function addFlight(req, res) {
  const userId = req.id;
  try {
    const user = await User.findById(userId);

    if (!user || !user.isAdmin) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { flightName, source, destination, departure, seats, price } =
      req.body;

    const flight = new Flight({
      flightName,
      source,
      destination,
      departure,
      seats,
      price,
    });

    await flight.save();

    return res.status(200).json({ msg: "Flight added successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Internal server error Not able to save" });
  }
}
