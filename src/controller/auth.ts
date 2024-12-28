import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { logger } from "../utils/logger";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";

class AuthController {
  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const existingUser = await User.findOne({ email: req.body.email }).exec();
      if (existingUser) {
        res.status(400).send("User already registered");
        return;
      }

      const { firstName, lastName, email, password } = req.body;
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        username: Math.random().toString(),
      });

      await newUser.save();
      res.status(201).json({
        message: "User registered successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error: (error as Error).message,
      });
    }
  };

  // signin method
  signin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).exec();
      if (!user) {
        res.status(400).send("User not found");
        return;
      }
      if (!user.authenticate(password)) {
        res.status(400).send("Invalid credentials");
        return;
      }
      if (user.authenticate(password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
          expiresIn: process.env.TOKEN_EXPIRY,
        });
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error: (error as Error).message,
      });
    }
  };

  // requireSignin middleware
  requireSignin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).send("Access denied");
      return;
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).send("Invalid token");
    }
  };
}

// Instantiate the controller
const authController = new AuthController();

export default authController;
