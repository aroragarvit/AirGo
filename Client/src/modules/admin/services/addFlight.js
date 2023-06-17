import axios from "axios";

/**
 * data = {
 *   origin: "",
 *   destination: "",
 *   departureDate: "",
 *   seats: Number,
 *   flightName: "",
 *   price: Number,
 * }
 */

export const addFlight = async (data) => {
  const res = await axios.post(
    "https://airgo-3t6h.onrender.com/admin/addFlight",
    {
      flightName: data.flightName,
      source: data.origin,
      destination: data.destination,
      departure: data.departureDate,
      seats: data.seats,
      price: data.price,
    },
    {
      withCredentials: true,
    }
  );
  if (res.status == 200) {
    console.log(res);
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
};
