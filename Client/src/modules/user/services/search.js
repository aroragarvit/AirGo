import axios from "axios";
import jsCookie from "js-cookie";
export const search = async (data) => {
  const token = jsCookie.get("token");
  const res = await axios.post(
    "https://airgo-3t6h.onrender.com/user/flights",
    {
      date: data.departureDate,
      source: data.origin,
      destination: data.destination,
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
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
};
