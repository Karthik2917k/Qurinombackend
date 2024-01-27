import { Request, Response } from "express";
import { prisma } from "../../prismaClient/index";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();
import * as jwt from "jsonwebtoken";

export const newMerchant = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await prisma.merchant.findUnique({
      where: { email },
      select: { email: true },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ ok: false, message: "Merchant already exist" });
    }
    const salt = await bcrypt.genSalt();
    const hashed_password = await bcrypt.hash(password, salt);
    await prisma.merchant.create({
      data: { name, email, password: hashed_password },
    });
    return res
      .status(201)
      .json({ ok: true, message: "Merchat Created Successfully" });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

export const loginMerchant = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingMerchat = await prisma.merchant.findUnique({
      where: { email },
      select: { email: true, password: true, id: true, name: true },
    });
    if (!existingMerchat) {
      return res
        .status(400)
        .json({
          ok: false,
          message: "Email not found. Please enter correct Email",
        });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      existingMerchat.password
    );

    if (!passwordMatch) {
      return res
        .status(400)
        .json({
          ok: false,
          message: "Wrong Password. Please enter correct password",
        });
    }
    var token = jwt.sign(
      {
        email: existingMerchat.email,
        id: existingMerchat.id,
        role: "merchant",
        name: existingMerchat.name,
      },
      process.env.JWTSECRET || "JWT_SECRET",
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
