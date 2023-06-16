import { Flight } from "../../models/flight.mjs";

export async function getFlights(req, res) {
  const { date, source, destination } = req.query;

  if (!date || !source || !destination) {
    return res.status(400).json({ error: "Invalid query" });
  }

  try {
    const flights = await Flight.find({
      source: source,
      destination: destination,
      departure: date,
    });

    return res.status(200).json({ flights: flights });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
