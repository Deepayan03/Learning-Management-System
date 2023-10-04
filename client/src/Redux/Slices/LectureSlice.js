import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  lectures: [],
};

export const getCourseLectures = createAsyncThunk(
  "/course/lectures/get",
  async (courseId) => {
    try {
      const response = axiosInstance.get(`/courses/${courseId}`);
      toast.promise(response, {
        loading: "Fetching Lectures....",
        success: (response) => {
          return response?.data?.message;
        },
      });
      return await response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const addCourseLectures = createAsyncThunk(
  "/course/lectures/add",
  async (courseData) => {
    try {
      const formData = new FormData();
      formData.append("title", courseData.title);
      formData.append("lecture", courseData.lecture);
      formData.append("description", courseData.description);

      const response = axiosInstance.post(
        `/courses/${courseData.id}`,
        courseData
      );
      toast.promise(response, {
        loading: "Adding Lectures....",
        success: (response) => {
          return response?.data?.message;
        },
      });
      return await response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteCourseLectures = createAsyncThunk(
  "/course/lectures/add",
  async (courseData) => {
    try {
      const response = axiosInstance.delete(
        `/courses?id=${courseData.id}&lectureId=${courseData.lectureId}`
      );
      toast.promise(response, {
        loading: "Deleting Lecture....",
        success: (response) => {
          return response?.data?.message;
        },
      });
      return await response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        console.log(action.payload);
        state.lectures = action.payload?.lectures;
      })
      .addCase(addCourseLectures.fulfilled, (state, action) => {
        console.log(action.payload);
        state.lectures = action?.payload?.data?.lectures;
      });
  },
});

export default lectureSlice.reducer;
