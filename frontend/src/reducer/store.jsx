import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./AuthReducer";
import { courseReducer } from "./CourseReducer";
import { paymentReducer } from "./PaymentReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    payment: paymentReducer,
  },
});

export default store;
