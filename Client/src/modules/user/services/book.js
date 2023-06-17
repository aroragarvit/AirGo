import axios from "axios";

export const book = async (data) => {
    console.log(data)
  const res = await axios.post(
    "http://localhost:5000/user/book",
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
