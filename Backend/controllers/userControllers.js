import user from "../models/userModels.js";
import sendEmail from "../utils/sendEmail.js";
import AppError from "../utils/utilError.js"
import cloudinary from "cloudinary"
import crypto from "crypto";
import fs from 'fs';
const cookieOptions={
    maxAge:7*24*60*60*1000,
    httpOnly:true,
    secure:true
}
const register = async (req, res, next) => {
    try {
      const { fullName, email, password, role } = req.body;
      console.log(fullName, email, password, role);
  
      if (!fullName || !email || !password) {
        return next(new AppError("All fields are required", 400));
      }
  
      const userExists = await user.findOne({ email });
      if (userExists) {
        return next(new AppError("Email already exists", 400));
      }
  
      const newUser = await user.create({
        fullName,
        email,
        password,
        avatar: {
          public_id: email, // Set the public_id to the user's email
          secure_url: "https://picsum.photos/200/300?grayscale", // Default URL for the avatar
        },
        role: role,
      });
  
      if (!newUser) {
        return next(new AppError("User registration unsuccessful. Please try again", 400));
      }
      // File Upload
      if(req.file){
        try{
          console.log(req.file.path);
          const result=await cloudinary.v2.uploader.upload(req.file.path,{
            folder:"lms",
            width:250,
            height:250,
            gravity:"faces",
            crop:"fill"
          });
          if(result){
            console.log(result.secure_url);
            newUser.avatar.public_id=result.public_id;
            newUser.avatar.secure_url=result.secure_url;
            fs.rmSync(req.file.path);
            console.log("File uploaded successfully and also deleted from local Storage");
          }
        }catch(e){
          return next(new AppError(e || "File not uploaded please try again",400));
        }
      }
  
      await newUser.save();
      newUser.password = undefined; // Set password to undefined to not send it in the response
  
      const token = newUser.generateJWTToken(); // Use newUser to generate the token
  
      res.cookie("token", token, cookieOptions);
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: newUser,
      });
    } catch (error) {
      return next(new AppError(error.message, 500));
    }
  };
  const login = async (req, res, next) => {
    try {
        // const {email,password} = req.body;
        const email=req.body.email;
        const password=req.body.password;
        console.log(req.body);
        if (!email || !password) {
            return next(new AppError("All fields are required", 400));
        }

        const User = await user.findOne({ email }).select("+password");
        if (!User || !(await User.confirmPassword(password))) {
            return next(new AppError("Wrong email or Password", 400));
        }

        const token = await User.generateJWTToken();
        console.log(token);
        res.cookie("token", token , cookieOptions);
        res.status(200).json({
            success: true,
            message: "User Logged in Successfully",
            data:User
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}
const logout=(req,res,next)=>{
   res.cookie("token",null,{
    secure:true,
    maxAge:0,
    httpOnly:true
   });
     res.status(200).json({
    success:true,
    message:"User logged out successfully"
   });
}
const getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const User = await user.findOne({ _id: userId });
        return res.status(200).json({
            success: true,
            message: "User Details",
            data:User
        });
    } catch (error) {
        return next(new AppError("Failed to fetch user Detail", 500));
    }
}

const forgotPassword= async(req,res,next)=>{
  const {email}=req.body;
  if(!email){
    return next(new AppError("Fields cannot be empty",500));
  }
  const emailExists=await user.findOne({email});
  if(!emailExists){
    return next(new AppError("Email does not exist",500));
  }
  const resetToken = await emailExists.generatePasswordResetToken();
  await emailExists.save();
  const resetPasswordURL=`${process.env.FrontEndURL}/user/resetPassword/${resetToken}`;
  const subject="reset password"
  const message=`You can reset your password by clicking <a href=${resetPasswordURL} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab${resetPasswordURL}.\n If you have not requested this, kindly ignore.`
  try{
    await sendEmail(email,subject,message);
    res.status(400).json({
      success:true,
      message:"Reset password link has been successfully"
    });
  }
  catch(e){
    user.forgotPasswordExpiry=undefined;
    user.forgotPasswordToken=undefined;
    await emailExists.save();
    return next(new AppError(e.message,500));
  }
}

const resetPassword= async(req,res,next)=>{
  const {resetToken}=req.params;
  const {password}=req.body;
  console.log(resetToken,password);
  const forgotPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  const checkUser=await user.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry:{$gt: Date.now()}
  });
  if(!checkUser){
    return next(new AppError("Token is invalid ,please try again ",400));
  }
  checkUser.password=password;
  checkUser.forgotPasswordToken=undefined;
  checkUser.forgotPasswordExpiry=undefined;
  await checkUser.save();

  res.status(200).json({
    success:true,
    message:"Your password has been changed successfully"
  });
}

const changePassword=async(req,res,next)=>{
  const {oldPassword,newPassword}=req.body;
  const {id}=req.user;
  console.log(oldPassword,newPassword);
  if(!oldPassword || !newPassword){
    return next(new AppError("All fields are mandatory",400));
  }
  const UserExists=await user.findById(id).select("+password");
  if(!UserExists){
    return next(new AppError("User doesnot exist",400));
  }
  const isValid=await UserExists.confirmPassword(oldPassword);
  if(!isValid){
    return next(new AppError("Invalid old password",400));
  }
  UserExists.password=newPassword;
  await UserExists.save();
  UserExists.password=undefined;
  res.status(200).json({
    success:true,
    message:"Password changed successfully"
  })

}
const updateUser=async(req,res,next)=>{
  const {fullName}=req.body;
  const {id}=req.user;
  const UserExists=await user.findById(id);
  if(!UserExists){
    return next(new AppError("User not found",400));
  }
  if (req.body.fullName) {
    UserExists.fullName = fullName;
  }
  console.log(UserExists);
  if(req.file){
    await cloudinary.v2.uploader.destroy(UserExists.avatar.public_id);
  }
  if(req.file){
  try{
    console.log(req.file.path);
    const result=await cloudinary.v2.uploader.upload(req.file.path,{
      folder:"lms",
      width:250,
      height:250,
      gravity:"faces",
      crop:"fill"
    });
    if(result){
      console.log(result.secure_url);
      newUser.avatar.public_id=result.public_id;
      newUser.avatar.secure_url=result.secure_url;
      fs.rmSync(req.file.path);
      console.log("File uploaded successfully and also deleted from local Storage");
    }
  }catch(e){
    return next(new AppError(e || "File not uploaded please try again",400));
  }
}

  await UserExists.save();
  res.status(200).json({
    success:true,
    message:"Profile update successful"
  });

}

export {register,login,logout,getProfile,forgotPassword,resetPassword,changePassword,updateUser};