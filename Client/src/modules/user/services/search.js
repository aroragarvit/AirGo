import axios from "axios";

export const search = async (data) => {
  const res = await axios.post(
    "http://localhost:5000/user/flights",
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
