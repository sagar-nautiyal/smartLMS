import axios from "axios";
export const createPaymentIntent = async (amount) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    "http://localhost:3000/api/payment/create-payment-intent",
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
