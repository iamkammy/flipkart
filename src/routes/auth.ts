import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import authController from "../controller/auth";

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);

export default router;
