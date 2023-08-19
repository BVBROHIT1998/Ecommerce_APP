import express from "express";
import {
  forgotPasswordController,
  getAllOrderController,
  getOrderController,
  orderStatusController,
  registerController,
  testController,
  updateProfileController,
} from "../controller/authController.js";
import { loginController } from "../controller/authController.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//Routing
//Register || Method POST
router.post("/register", registerController);

//login || post
router.post("/login", loginController);

//Forget Password
router.post("/forgot-password", forgotPasswordController);

//test route
router.get("/test", requireSignin, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile

router.put("/profile", requireSignin, updateProfileController);

//Order

router.get("/orders", requireSignin, getOrderController);

//All Orders

router.get("/all-orders", requireSignin, isAdmin, getAllOrderController);

//order status update

router.put("/order-status/:orderId", requireSignin, isAdmin, orderStatusController)

export default router;
