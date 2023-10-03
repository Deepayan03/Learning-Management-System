import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/CourseSlice.js";
import razorPaySlice from "./Slices/PaymentSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    course: courseSliceReducer,
    razorPay: razorPaySlice,
  },
  devTools: true,
});

export default store;
