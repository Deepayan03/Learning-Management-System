import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";
import { QueryClient } from "react-query";
const initialState = {
  courseData: [],
};

const queryClient = new QueryClient();
export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const response = axiosInstance.get("/courses/");
    toast.promise(response, {
      loading: "loading course data.....",
      success: "Courses loaded successfully",
      error: "Failed to load all the courses",
    });
    queryClient.invalidateQueries("courses");
    return (await response)?.data?.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const deleteCourse = createAsyncThunk("/course/delete", async (courseId) => {
  try {
    const response = axiosInstance.delete(`/courses/${courseId}`);
    toast.promise(response, {
      loading: "Deleting course .....",
      success: "Courses deleted successfully",
      error: "Failed to delete the course",
    });
    return (await response)?.data?.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});


export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data) => {
    try {
        let formData = new FormData();
        formData.append("title",data?.title);
        formData.append("description",data?.description);
        formData.append("createdBy",data?.createdBy);
        formData.append("thumbnail",data?.thumbnail);
        formData.append("category",data?.category);
        const res = axiosInstance.post("/courses",formData);
        toast.promise(res,{
            loading: "Adding your course ...",
            success : "Course added successfully",
            error: "Failed to add the course"
        })
        return (await res)?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.courseData = action.payload ? [...action.payload] : [];
    });
  },
});

export default courseSlice.reducer;
