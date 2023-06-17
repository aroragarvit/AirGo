import axios from "axios";

export const searchFlight = async (data) => {
  const res = await axios.post(
    "http://localhost:5000/admin/viewBookings",
    {
      flightId: data.search,
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
