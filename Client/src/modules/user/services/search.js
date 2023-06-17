import axios from "axios";

export const search = async (data) => {
  const res = await axios.post(
    "https://airgo-3t6h.onrender.com/user/flights",
    {
      date: data.departureDate,
      source: data.origin,
      destination: data.destination,
    },
    {
      withCredentials: true,
    }
  );
  if (res.status == 200) {
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
};
