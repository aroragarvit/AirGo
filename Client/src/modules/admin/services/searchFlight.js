import axios from "axios";

export const searchFlight = async (data) => {
  const res = await axios.post(
    "https://airgo-3t6h.onrender.com/admin/viewBookings",
    {
      flightId: data.flightId,
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
