import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import authController from "../controller/auth";

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);

router.post("/profile", authController.requireSignin, async (req: Request, res: Response) => {
  res.status(200).json({ profile: "Profile" });
});

export default router;
