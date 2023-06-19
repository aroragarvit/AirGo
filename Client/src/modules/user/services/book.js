import axios from "axios";
import jsCookie from "js-cookie";

export const book = async (data) => {
  const token = jsCookie.get("token");
    console.log(data)
  const res = await axios.post(
    "https://airgo-3t6h.onrender.com/user/book",
    {
      flightId: data.flightId,
      seats: data.seats,
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
