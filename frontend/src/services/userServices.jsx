import axios from "axios";
import { buildApiUrl } from "../config/apiConfig";

export const updateUser = async (name, email) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(
    buildApiUrl("users/profile"),
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
