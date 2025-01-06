import { Request, Response } from "express";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

// Registro
export const register = async (req: Request, res: Response) => {
   try {
      const user = await userModel.addUser(req.body);
      return res
         .status(201)
         .json({ message: "Usuario registrado", id: user._id });
   } catch (error: any) {
      return res.status(400).json({ error: error.message });
   }
};

// Login
export const login = async (req: Request, res: Response) => {
   try {
      const user = await userModel.loginUser(req.body);
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
         expiresIn: "2h",
      });
      return res.status(200).json({ token, email: user.email });
   } catch (error: any) {
      return res.status(400).json({ error: error.message });
   }
};
