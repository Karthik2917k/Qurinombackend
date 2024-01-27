import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { prisma } from "../prismaClient/index";
dotenv.config();

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization || req.cookies.token || "";

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    const decoded: any = jwt.verify(
      token,
      process.envJWTSECRETSECRET || "JWT_SECRET"
    );

    if (!decoded) {
      return res
        .status(400)
        .json({ ok: false, message: "Session Expired please login" });
    }
    await prisma.merchant.findUnique({
      where: { email: decoded.email, id: decoded.id },
    });
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Unauthorized: Token expired" });
    } else {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  }
};

export default verifyToken;
