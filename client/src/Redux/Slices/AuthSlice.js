import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
};
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const { email, avatar, fullName, password } = data;
    const res = axiosInstance.post("user/register", {
      email,
      avatar,
      fullName,
      password,
    });
    toast.promise(res, {
      loading: "Wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });
    return (await res)?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const { email, password } = data;
    const res = axiosInstance.post("user/login", { email, password });
    toast.promise(res, {
      loading: "Wait! Logging in ",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to login",
    });
    return (await res)?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.get("user/logout");
    toast.promise(res, {
      loading: "Wait! Logging in ",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to login",
    });
    return (await res)?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const updateProfile = createAsyncThunk("/user/update", async (user) => {
  try {
    const res =  axiosInstance.put(`/user/update`, user);
    toast.promise(res, {
      loading: "Wait! Updating profile",
      success: res?.data?.message,
      error: "Failed to update profile",
    });
    return (await res)?.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

export const getUserData = createAsyncThunk("/user/get", async () => {
  try {
    const res = await axiosInstance.get(`/user/getProfile`);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const forgotPassword = createAsyncThunk("/user/forgotPassword" , async(email)=>{
  try {
    const response = await axiosInstance.post("/user/forgotPassword",{email});
    console.log(response);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const resetPassword = createAsyncThunk("/user/resetPassword" , async (data)=>{
  try {
    const [password , token] = data;
    const response = await axiosInstance.post(`/user/resetPassword/${token}`,{password});
    console.log(response);
    toast.success("Password Changed successfully")
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
export const changePassword = createAsyncThunk("/user/changePassword" , async (data)=>{
  try {
    const {oldPassword , newPassword} = data;
    const response =  axiosInstance.post("/user/changePassword/",{oldPassword , newPassword});
    toast.promise(response,{
      success: "Password changed successfully",
      loading : "Changing your password....",
    })
    const res = await response;
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("data", JSON.stringify(action?.payload?.data));
        localStorage.setItem("role", action?.payload?.data?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.data;
        state.role = action?.payload?.data?.role;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("data", JSON.stringify(action?.payload?.data));
        localStorage.setItem("role", action?.payload?.data?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.data;
        state.role = action?.payload?.data?.role;
      })
      .addCase(logout.fulfilled, (state, action) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        // console.log(action?.payload?.data);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("data", JSON.stringify(action?.payload?.data));
        localStorage.setItem("role", action?.payload?.data?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.data;
      }).addCase(changePassword.fulfilled,(state , action) =>{
        return action?.payload;
      });
  },
});

export default authSlice.reducer;
