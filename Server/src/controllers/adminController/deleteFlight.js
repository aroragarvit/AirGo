import { Flight } from "../../models/flight.mjs";
import { User } from "../../models/user.mjs";

export async function removeFlight(req, res) {
  const userId = req.id;
  try {
    const user = await User.findById(userId);

    if (!user || !user.isAdmin) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { flightId, flightName } = req.body;

    if (!flightId && !flightName) {
      return res
        .status(400)
        .json({ error: "Please provide either the flightId or flightName" });
    }

    let query;
    if (flightId) {
      query = { _id: flightId };
    } else {
      query = { flightName };
    }

    if (flightId && flightName) {
      // If both the flight ID and flight name are provided, prioritize the flight ID
      delete query.flightName;
    }

    const result = await Flight.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Flight not found" });
    }

    return res.status(200).json({ msg: "Flight removed successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Internal server error Not able to delete" });
  }
}
