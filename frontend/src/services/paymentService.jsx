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
        Authorization: `${token}`,
      },
    }
  );
  console.log("Payload from backend", res.data);
  return res.data;
};
