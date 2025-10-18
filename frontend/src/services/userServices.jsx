import axios from "axios";
export const updateUser = async (name, email) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(
    "http://localhost:3000/api/users/profile",
    {
      name,
      email,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
