import user from "../models/userModels.js";
import AppError from "../utils/utilError.js"
const register=async (req,res,next)=>{
    const {fullName,email,password}=req.body;
    console.log( fullName,email,password);
    if(!fullName || !email || !password ){
        return next(new AppError("All fields are required",400));
    }
    const userExists=await user.findOne({email});
    if(userExists){
        return next(new AppError("Email already exists",400));
    }
    const newUser=await user.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email, // Set the public_id to the user's email
            secure_url: "https://picsum.photos/200/300?grayscale", // Default URL for the avatar
          },
          role:req.body.role
    });
    if(!user){
        return next(new AppError("User registration unsuccessful.Please try again",400));
    }

    //File upload is left...

    await newUser.save();
    user.password=undefined;
    return res.status(400).json({
        success:true,
        message:"User registered successfully",
        data: user
    });
}
const login=(req,res,next)=>{
    return res.status(200).json({
        message:"loggedin"
    });

}
const logout=(req,res,next)=>{
    return res.status(200).json({
        message:"Logged Out"
    });

}
const getProfile=(req,res,next)=>{
    return res.status(200).json({
        message:"Got your profile"
    });

}

export {register,login,logout, getProfile};