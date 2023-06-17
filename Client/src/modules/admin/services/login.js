import axios from "axios";

export const login = async (email, password) => {
  const res = await axios.post("http://localhost:5000/admin/login", {
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
