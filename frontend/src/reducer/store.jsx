import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./AuthReducer";
import { courseReducer } from "./CourseReducer";
import { paymentReducer } from "./PaymentReducer";
import { cartReducer } from "./CartReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    payment: paymentReducer,
    cart: cartReducer,
  },
});

export default store;
