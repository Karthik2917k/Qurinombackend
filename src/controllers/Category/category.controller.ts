import { Request, Response } from "express";
import { prisma } from "../../prismaClient/index";

import dotenv from "dotenv";
dotenv.config();

export const newCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.body;
    await prisma.category.create({
      data: { name: category },
    });
    return res
      .status(200)
      .json({ ok: true, message: "Category created successfully" });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.subCategory.deleteMany({
      where: { categorie: { id } },
    });
    await prisma.category.delete({
      where: { id },
    });
    return res
      .status(200)
      .json({ ok: true, message: "Category deleted successfully" });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

export const editCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { category } = req.body;
    await prisma.category.update({
      where: { id },
      data: { name: category },
    });
    return res
      .status(200)
      .json({ ok: true, message: "Category deleted successfully" });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        SubCategory: true,
      },
    });
    return res.status(200).json({ ok: true, data: categories });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};
