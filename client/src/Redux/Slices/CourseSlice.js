import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";
import { QueryClient } from "react-query";
const initialState={
    courseData:[]
}

const queryClient=new QueryClient();
export const getAllCourses= createAsyncThunk("/course/get",async()=>{
        try {
            const response = axiosInstance.get("/courses/");
            toast.promise(response,{
                loading:"loading course data.....",
                success:"Courses loaded successfully",
                error:"Failed to load all the courses"
            });
            queryClient.invalidateQueries('courses');
            return (await response)?.data?.courses;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
});
const courseSlice=createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCourses.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.courseData = action.payload ? ([...action.payload]):[];
            
        })
    }
});

export default courseSlice.reducer;