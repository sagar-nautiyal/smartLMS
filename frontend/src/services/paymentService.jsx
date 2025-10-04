import axios from "axios";
export const createPaymentIntent = async (amount) => {
  const res = await axios.post("/api/payment/create-payment-intent", {
    amount,
  });
  return res.data;
};
