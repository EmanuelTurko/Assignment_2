import express from "express";
import authController from "../Controller/auth_controller";
const authRoutes = express.Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.post("/logout", authController.logout);



export default authRoutes;