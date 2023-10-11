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
      const res = (await response).data;
      return res;
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
        formData
      );
      toast.promise(response, {
        loading: "Adding Lectures....",
        success: (response) => {
          return response?.data?.message;
        },
      });
      const res = await response?.data;
      console.log(res);
      return (await response)?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteCourseLectures = createAsyncThunk(
  "/course/lectures/delete",
  async (courseData) => {
    try {
      const [courseId, lectureId] = courseData;
      console.log(courseId, lectureId);
      const response = axiosInstance.delete(
        `/courses/delete/${courseId}/${lectureId}`
      );
      toast.promise(response, {
        loading: "Deleting Lecture....",
        success: (response) => {
          return response?.data?.message;
        },
      });
      console.log(await response);
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
        state.lectures = action.payload?.data;
      })
      .addCase(addCourseLectures.fulfilled, (state, action) => {
        console.log(action.payload?.data);
        state.lectures = action?.payload?.data;
      });
  },
});

export default lectureSlice.reducer;
