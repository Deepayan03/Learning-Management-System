import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoggedIn: localStorage.getItem("isLoggedIn") || "",
    role: localStorage.getItem("data") || {},
};

const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{}
});

// export const { } = authSlice.actions;
export default authSlice.reducer;
 