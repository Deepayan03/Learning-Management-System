import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js"
import toast from "react-hot-toast";
const initialState={
    isLoggedIn: localStorage.getItem("isLoggedIn") || "",
    role: localStorage.getItem("data") || {},
};
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const {email,avatar,fullName,password}=data;
        const res = axiosInstance.post("user/register", {email,avatar,fullName,password});
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})
const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{}
});

// export const { } = authSlice.actions;
export default authSlice.reducer;
 