import axios from "axios";
export const updateUser = async (name, email) => {
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const res = await axios.put(
    `${apiUrl}/api/users/profile`,
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
