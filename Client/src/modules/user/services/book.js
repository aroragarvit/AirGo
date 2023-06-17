import axios from "axios";

export const book = async (data) => {
    console.log(data)
  const res = await axios.post(
    "https://airgo-3t6h.onrender.com/user/book",
    {
      flightId: data.flightId,
      seats: data.seats,
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
