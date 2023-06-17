import axios from "axios";

export const mybookings = async () => {
  const res = await axios.post(
    "https://airgo-3t6h.onrender.com/user/mybookings",
    {},
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
