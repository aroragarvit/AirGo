import axios from "axios";
import jsCookie from "js-cookie";

export const searchFlight = async (data) => {
  const token = jsCookie.get("token");
  const res = await axios.post(
    "https://airgo-3t6h.onrender.com/admin/viewBookings",
    {
      flightId: data.flightId,
    },


{
  headers: {
    Authorization: `Bearer ${token}`
  }
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
