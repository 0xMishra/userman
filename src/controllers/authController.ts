import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { config } from "../config";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, config.jwtSecret);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id }, config.jwtSecret);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
