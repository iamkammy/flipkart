import express, { Express, Request, Response, NextFunction } from "express";
const router = express.Router();
import userController from "../controller/user";

router.get("/signin", (req: Request, res: Response) => {
  res.status(200).send("SignIn Success");
});

router.post("/signup", userController.signup);

export default router;
