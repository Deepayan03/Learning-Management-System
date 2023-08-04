import {Router} from "express";
import { addLectureToCourseById, createCourse, getAllCourses, getLecturesByCourseid, removeCourse, updateCourse } from "../controllers/courseControllers.js";
import { isLoggedIn } from "../middlewares/AuthMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
import { authorizedRoles } from "../middlewares/RoleAuthorization.js";
const router=Router();
router.route("/").get(getAllCourses).post(isLoggedIn,authorizedRoles("ADMIN"),upload.single("thumbnail"),createCourse);//Controllers will be determined based on the method of the request on the same route
router.route("/:id").get(isLoggedIn,getLecturesByCourseid)
.put(isLoggedIn,authorizedRoles("ADMIN"),updateCourse)
.delete(isLoggedIn,authorizedRoles("ADMIN"),removeCourse)
.post(isLoggedIn,authorizedRoles("ADMIN"),upload.single("lecture"),addLectureToCourseById);
//Controllers will be determined based on the method of the request on the same route
export default router;
