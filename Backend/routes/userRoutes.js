import { Router } from "express";
import {register,login,logout,getProfile} from "../controllers/userControllers.js"
import { isLoggedIn } from "../middlewares/AuthMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
const controller=Router();

controller.post("/register",upload.single("avatar"),register);
controller.post("/login",login);
controller.get("/logout",logout);
controller.get("/getProfile",isLoggedIn,getProfile);
export default controller;