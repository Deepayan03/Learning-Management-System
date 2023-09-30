import { Router } from "express";
import {register,login,logout,getProfile,forgotPassword,resetPassword, changePassword, updateUser} from "../controllers/userControllers.js"
import { isLoggedIn } from "../middlewares/AuthMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
const controller=Router();
// Defining user routes
controller.post("/register",upload.single("avatar"),register);
controller.post("/login",login);
controller.get("/logout",logout);
controller.get("/getProfile/",isLoggedIn,getProfile);
controller.post("/forgotPassword",forgotPassword);
controller.post("/resetPassword/:resetToken", resetPassword);
controller.post("/changePassword",isLoggedIn,changePassword);
controller.put("/update",isLoggedIn,upload.single("avatar"),updateUser)
export default controller;
