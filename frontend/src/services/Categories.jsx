import axios from "axios";
import { buildApiUrl } from "../config/apiConfig";

export const getCategories = async () => {
  try {
    const res = await axios.get(buildApiUrl("categories"));
    return res.data;
  } catch (err) {
    return [];
  }
};

export const filterCategories = async (filters) => {
  try {
    const res = await axios.get(
      buildApiUrl(`categories/filters?${filters}`)
    );
    return res.data.data;
  } catch (err) {
    return [];
  }
};
