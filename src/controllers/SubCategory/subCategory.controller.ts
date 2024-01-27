import { Request, Response } from "express";
import { prisma } from "../../prismaClient/index";

import dotenv from "dotenv";
dotenv.config();

export const newSubCategory = async (req: Request, res: Response) => {
  try {
    const { subcategory,categoryId} = req.body;
    await prisma.subCategory.create({
      data: { name:subcategory,categorie:{connect:{id:categoryId}} },
    });
    return res
      .status(200)
      .json({ ok: true, message: "Sub Category created successfully" });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

export const deleteSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.subCategory.delete({
      where: { id },
    });
    return res
      .status(200)
      .json({ ok: true, message: "Sub Category deleted successfully" });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

export const editSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Subcategory } = req.body;
    await prisma.subCategory.update({
      where: { id },
      data: { name: Subcategory },
    });
    return res
      .status(200)
      .json({ ok: true, message: "Sub Category deleted successfully" });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

export const getSubCategories = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const subCategory = await prisma.subCategory.findMany({
        where: { categorie:{id} },
      });
      return res
        .status(200)
        .json({ ok: true, data:subCategory });
    } catch (error: any) {
      return res.status(400).json({ ok: false, message: error.message });
    }
  };
