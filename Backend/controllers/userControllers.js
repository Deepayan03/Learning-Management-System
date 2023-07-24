import user from "../models/userModels.js";
import AppError from "../utils/utilError.js"
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
  
      // File upload is left...
  
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
        const { email, password } = req.body;
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
            message: "User Logged in Successfully"
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

export {register,login,logout,getProfile};