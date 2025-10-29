import axios from "axios";
export const createPaymentIntent = async (amount) => {
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const res = await axios.post(
    `${apiUrl}/api/payment/create-payment-intent`,
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
