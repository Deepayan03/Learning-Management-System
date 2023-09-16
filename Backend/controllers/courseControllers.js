import { json } from "express";
import Course from "../models/courseModels.js"
import AppError from "../utils/utilError.js";
import {v2 as cloudinary} from "cloudinary";
import fs from "fs/promises"
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

const createCourse=async(req,res,next)=>{
    const {title,description,category,createdBy}=req.body;
    if(!title || !description || !category || !createdBy){
        return next(new AppError("All fields are required",400));
    }

    try {
        const course = await Course.create({
            title,
            description,
            category,
            createdBy,
        });
        if(!course){
            return next(new AppError("Course couldnot be successful",500));
        }
        console.log(req.file);
        if(req.file){
            const result=await cloudinary.uploader.upload(req.file.path,{
                folder:"lms"
            });
            if(result){
                course.thumbnail.public_id=result.public_id;
                course.thumbnail.secure_url=result.secure_url;
            }
            fs.rm(`uploads/${req.file.filename}`);
        }
        await course.save();
    
        res.status(200).json({
            success:true,
            message:"Course created successfully",
            data: course
        });
    } catch (error) {
        return next(new AppError(error.message,400));
    }
}

const updateCourse=async(req,res,next)=>{
    try {
        const {id}=req.params;
        console.log(id);
        const course=await Course.findByIdAndUpdate(id,{$set:req.body},{runValidators:true});// find the course by id and overwrite it based on the data recieved from the request.Run validator ensures if the recieved data is correct 
        console.log(course);
        if(!course){
            return next(new AppError("Course doesnot exist",400))
        }
        await course.save();
        res.status(200).json({
            success:true,
            message:"Course Info updated successfully",
            data:course
        })
    } catch (error) {
        return next(new AppError(error.message,400));
    }
}

const removeCourse=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const course=await Course.findById(id);
        if(!course){
            return next(new AppError("Course doesnot exist",400))
        }
        await course.deleteOne();
        res.status(200).json({
            success:true,
            message:`Course with id ${id} Deleted successfully`
        });
    }catch(error){
        return next(new AppError(error.message,400));
    }
}

// Note: Images more than 1 mb and videos more than 10mb cannot be uploaded because the free tier of cloudinary is being used here
const addLectureToCourseById=async(req,res,next)=>{
    // console.log(req.headers['content-type']);
    const {title,description}=req.body;
    const {id}=req.params;
    const course=await Course.findById(id);
    if(!title || !description){
        return next(new AppError("All fields are required",500));
    }
    if(!course){
        return next(new AppError("Enter the proper id",500));
    }
    const lectureData={
        title,
        description,
        lecture:{}
    };
    if(req.file){
        try {
            const result=await cloudinary.uploader.upload(req.file.path,{
                folder:"lms",
                resource_type: "auto"
            });
            if(result){
                lectureData.lecture.public_id=result.public_id;
                lectureData.lecture.secure_url=result.secure_url;
            }
            fs.rm(`uploads/${req.file.filename}`);
        } catch (error) {
            return next(new AppError(error.message,400));
        }
    }
    console.log(lectureData);
    course.lectures.push(lectureData);
    course.numberOfLectures=course.lectures.length;
    await course.save();
    res.status(200).json({
        success:true,
        message:"Lectures added successfully",
        data:course.lectures[course.lectures.length-1]
    });
}

const deleteLecturebyid = async (req, res, next) => {
    const { id, lectureId } = req.params;
    console.log(lectureId);
    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("Course does not exist", 500));
    }
    
    // Use findIndex to get the index of the lecture in the array
    const lectureIndex = course.lectures.findIndex((lecture) => lecture._id.toString() === lectureId);
    console.log(lectureIndex);
  
    if (lectureIndex === -1) {
      return next(new AppError("Wrong lecture id", 400));
    }
  
    // Remove the lecture from the lectures array using splice
    const deletedLecture = course.lectures.splice(lectureIndex, 1)[0];
  
    // Save the updated course
    await course.save();
  
    res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
      data: deletedLecture, // Return the deleted lecture in the response
    });
  };

export{
    getAllCourses,
    getLecturesByCourseid,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById,
    deleteLecturebyid
};