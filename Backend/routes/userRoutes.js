import { Router } from "express";
import {register,login,logout,getProfile} from "../controllers/userControllers.js"
const controller=Router();

controller.post("/register",register);
controller.post("/login",login);
controller.get("/logout",logout);
controller.get("/getProfile",getProfile);
export default controller;