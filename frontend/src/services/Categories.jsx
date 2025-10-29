import axios from "axios";
export const getCategories = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/categories");
    return res.data;
  } catch (err) {
    return [];
  }
};

export const filterCategories = async (filters) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/categories/filters?${filters}`
    );
    return res.data.data;
  } catch (err) {
    return [];
  }
};
