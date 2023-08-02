import {Router} from "express";
import { getAllCourses, getLecturesByCourseid } from "../controllers/courseControllers.js";
import { isLoggedIn } from "../middlewares/AuthMiddleware.js";
const router=Router();
router.get("/",getAllCourses);
router.get("/:id",isLoggedIn,getLecturesByCourseid);

export default router;