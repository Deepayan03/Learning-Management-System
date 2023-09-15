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
        return (await res)?.data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const {email,password}=data;
        const res = axiosInstance.post("user/login", {email,password});
        toast.promise(res, {
            loading: "Wait! Logging in ",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to login"
        });
        return (await res)?.data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const logout=createAsyncThunk("/auth/logout",async ()=>{
    try {
        const res = axiosInstance.get("user/logout");
        toast.promise(res, {
            loading: "Wait! Logging in ",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to login"
        });
        return (await res)?.data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(login.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.data));
            localStorage.setItem("role",action?.payload?.data?.role);
            state.isLoggedIn=true;
            state.data=action?.payload?.data;
        })
        .addCase(logout.fulfilled,(state,action)=>{
            localStorage.clear();
            state.data={};
            state.isLoggedIn = false;
            state.role= "";
        })
    }
});


// export const { } = authSlice.actions;
export default authSlice.reducer;
 