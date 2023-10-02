import { Router } from "express";
import { isLoggedIn } from "../middlewares/AuthMiddleware.js";
import { authorizedRoles } from "../middlewares/RoleAuthorization.js";
import {
  allPayments,
  buySubscription,
  cancelSubscription,
  getRazorPayKey,
  verifySubscription,
} from "../controllers/paymentControllers.js";

const router = Router();
router.route("/key").get(isLoggedIn, getRazorPayKey);

router.route("/subscribe").post(isLoggedIn, buySubscription);

router.route("/verify").post(isLoggedIn, verifySubscription);

router.route("/unsubscribe").post(isLoggedIn, cancelSubscription);

router.route("/").get(isLoggedIn, authorizedRoles("ADMIN"), allPayments);

export default router;
