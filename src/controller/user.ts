import { Express, Request, Response } from "express";
import User from "../models/user";

class UserController {
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
}

// Instantiate the controller
const userController = new UserController();

export default userController;
