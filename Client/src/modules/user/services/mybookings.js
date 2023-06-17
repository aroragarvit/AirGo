import axios from "axios";

export const mybookings = async () => {
  const res = await axios.post(
    "http://localhost:5000/user/mybookings",
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
