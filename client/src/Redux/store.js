import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/CourseSlice.js"
const store=configureStore({
    reducer:{
        auth:AuthSlice,
        course: courseSliceReducer
    },
    devTools: true
});

export default store;