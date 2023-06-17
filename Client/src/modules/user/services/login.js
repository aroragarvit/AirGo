import axios from "axios";

export const login = async (email, password) => {
  const res = await axios.post("http://localhost:5000/user/login", {
    email,
    password,
  });
  if(res.status == 200){
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
};
