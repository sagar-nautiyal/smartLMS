import axios from "axios";
export const getCategories = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const res = await axios.get(`${apiUrl}/api/categories`);
    return res.data;
  } catch (err) {
    return [];
  }
};

export const filterCategories = async (filters) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const res = await axios.get(
      `${apiUrl}/api/categories/filters?${filters}`
    );
    return res.data.data;
  } catch (err) {
    return [];
  }
};
