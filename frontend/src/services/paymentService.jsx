import axios from "axios";
import { buildApiUrl } from "../config/apiConfig";

export const createPaymentIntent = async (amount) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    buildApiUrl("payment/create-payment-intent"),
    {
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
