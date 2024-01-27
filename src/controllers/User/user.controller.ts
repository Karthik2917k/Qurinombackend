import { Request, Response } from "express";
import { prisma } from "../../prismaClient/index";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
// Load environment variables from .env file
import * as jwt from "jsonwebtoken";
dotenv.config();

export const newUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { email: true },
    });
    if (existingUser) {
      return res.status(400).json({ ok: false, message: "User already exist" });
    }
    const salt = await bcrypt.genSalt();
    const hashed_password = await bcrypt.hash(password, salt);
    await prisma.user.create({
      data: { name, email, password: hashed_password },
    });
    return res
      .status(201)
      .json({ ok: true, message: "User Created Successfully" });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { email: true, password: true, id: true, name: true },
    });
    if (!existingUser) {
      return res.status(400).json({
        ok: false,
        message: "User not found. Please enter correct Email",
      });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(400).json({
        ok: false,
        message: "Wrong Password. Please enter correct password",
      });
    }
    var token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser.id,
        role: "user",
        name: existingUser.name,
      },
      process.envJWTSECRETSECRET || "JWT_SECRET",
      { expiresIn: "1d" }
    );
    res.cookie("token", token);
    return res
      .status(201)
      .json({ ok: true, message: "User Logged Successfully" });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};
