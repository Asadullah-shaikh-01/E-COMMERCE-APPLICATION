import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
} from "../controller/authController.js";
import { requireSignIn, isAdmin } from "./../middlewares/authMidleware.js";


// Routers object
const router = express.Router();

//Routing
//Register || Method Post
router.post("/register", registerController);

// login
router.post("/login", loginController);
// forget Password
router.post("/forgot-password", forgotPasswordController);

//Test Routes
router.get("/test", requireSignIn, isAdmin, testController);

// Protected user route Auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
// protect admin route Auth
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
// router.get("/orders", requireSignIn, getOrdersController);

// //all orders
// router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// // order status update
// router.put(
//   "/order-status/:orderId",
//   requireSignIn,
//   isAdmin,
//   orderStatusController
// );

export default router;
