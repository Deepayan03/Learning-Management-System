import {Router} from "express";
import { createCourse, getAllCourses, getLecturesByCourseid, removeCourse, updateCourse } from "../controllers/courseControllers.js";
import { isLoggedIn } from "../middlewares/AuthMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
const router=Router();
router.route("/").get(getAllCourses).post(isLoggedIn,upload.single("thumbnail"),createCourse);//Controllers will be determined based on the method of the request on the same route
router.route("/:id").get(isLoggedIn,getLecturesByCourseid)
.put(isLoggedIn,updateCourse)
.delete(isLoggedIn,removeCourse);
//Controllers will be determined based on the method of the request on the same route
export default router;
