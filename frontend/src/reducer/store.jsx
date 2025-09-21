import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./AuthReducer";
import { courseReducer } from "./CourseReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
  },
});

export default store;
