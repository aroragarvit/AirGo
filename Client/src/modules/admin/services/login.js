import axios from "axios";

export const login = async (email, password) => {
  const res = await axios.post("https://airgo-3t6h.onrender.com/admin/login", {
    email,
    password,
  });
  if(res.status == 200){
    console.log(res);
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
};
