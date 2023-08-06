import {Router} from "express";
import { addLectureToCourseById, createCourse, deleteLecturebyid, getAllCourses, getLecturesByCourseid, removeCourse, updateCourse } from "../controllers/courseControllers.js";
import { isLoggedIn } from "../middlewares/AuthMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
import { authorizedRoles } from "../middlewares/RoleAuthorization.js";
import { isAuthorizedSubscriber } from "../middlewares/AuthSubscriber.js";
const router=Router();
router.route("/").get(getAllCourses).post(isLoggedIn,authorizedRoles("ADMIN"),upload.single("thumbnail"),createCourse);//Controllers will be determined based on the method of the request on the same route
router.route("/:id").get(isLoggedIn,isAuthorizedSubscriber,getLecturesByCourseid)
.put(isLoggedIn,authorizedRoles("ADMIN"),updateCourse)
.delete(isLoggedIn,authorizedRoles("ADMIN"),removeCourse)
.post(isLoggedIn,authorizedRoles("ADMIN"),upload.single("lecture"),addLectureToCourseById)


router.route("/:id/:lectureId").purge(isLoggedIn,authorizedRoles("ADMIN"),deleteLecturebyid);
//Controllers will be determined based on the method of the request on the same route
export default router;
