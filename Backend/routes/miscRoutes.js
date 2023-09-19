import { Router } from "express";
import { authorizedRoles } from "../middlewares/RoleAuthorization.js";
import { isLoggedIn } from "../middlewares/AuthMiddleware.js";
import { contactUs, userStats } from "../controllers/miscControllers.js";

const router = Router();

// url/misc/
router.route("/contact").post(contactUs);
router
  .route("/admin/stats/users")
  .get(isLoggedIn, authorizedRoles("ADMIN"), userStats);

export default router;
