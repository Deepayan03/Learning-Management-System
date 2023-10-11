import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/CourseSlice.js";
import razorPaySlice from "./Slices/PaymentSlice";
import LectureSlice from "./Slices/LectureSlice";
import StatsSlice from "./Slices/StatsSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    course: courseSliceReducer,
    razorPay: razorPaySlice,
    lectures : LectureSlice,
    stats : StatsSlice
  },
  devTools: true,
});

export default store;
