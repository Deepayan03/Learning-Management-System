import Course from "../models/courseModels.js"
import AppError from "../utils/utilError.js";

const getAllCourses=async(req,res,next)=>{
    try {
        const courses=await Course.find({}).select("-lectures");
        res.status(200).json({
            success:true,
            message:"All courses",
            courses
        });   
    } catch (error) {
        return next(new AppError("Some kind of error occured.Cannot fetch the courses right now",500));
    }  
}

const getLecturesByCourseid=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const course=await Course.findById(id);
        if(!course){
            return next(new AppError("Invalid Course id",400));
        }
        res.status(200).json({
            success:true,
            message:"Course lectures fetched successfully",
            data:course.lectures
        });

    }catch(e){
        return next(new AppError(e.message,500));
    }
}


export{
    getAllCourses,
    getLecturesByCourseid
}