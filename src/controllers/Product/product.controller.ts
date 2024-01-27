import { Request, Response } from "express";
import { prisma } from "../../prismaClient/index";

import dotenv from "dotenv";
import { Prisma } from "@prisma/client";
dotenv.config();

export const newProduct = async (req: Request, res: Response) => {
  try {
    const {
      location,
      price,
      image,
      description,
      title,
      merchantId,
      subcategoryId,
      categoryId,
    } = req.body;
    await prisma.product.create({
      data: {
        categorie: { connect: { id: categoryId } },
        description,
        location,
        image,
        price: Number(price),
        Merchant: { connect: { id: merchantId } },
        subCategorie: { connect: { id: subcategoryId } },
        title,
      },
    });

    return res
      .status(200)
      .json({ ok: true, message: "new product created successfully" });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

export const editProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const newData = {...data,price:+data.price}
    await prisma.product.update({
      where: { id },
      data: {
        ...newData,
      },
    });

    return res
      .status(200)
      .json({ ok: true, message: "product updated successfully" });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id },
    });

    return res
      .status(200)
      .json({ ok: true, message: "product deleted successfully" });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      search = "",
      location = "",
      categories = [],
      subCategories = [],
      
      min = "",
      max = "",
    } = req.query;

 

    const parsedSubCategories: string[] = (
      Array.isArray(subCategories) ? subCategories : [subCategories]
    ).map((id) => id as string);

    const parsedCategories: string[] = (
      Array.isArray(categories) ? categories : [categories]
    ).map((id) => id as string);
    // orderBy: orderBy as any,
    const AND: Prisma.ProductWhereInput[] = [
      {
        location: {
          contains: typeof location === "string" ? location : "",
          mode: "insensitive",
        },
      },
      {
        title: {
          contains: typeof search === "string" ? search : "",
          mode: "insensitive",
        },
      },
      {
        price: {
          gt: +min,
          lt: +max,
        },
      },
    ];
    if (parsedCategories && parsedCategories.length > 0) {
      AND.push({
        categorie: {
          AND: [{ id: { in: parsedCategories } }],
        },
      });
    }
    if (parsedSubCategories && parsedSubCategories.length > 0) {
      AND.push({
        subCategorie: {
          AND: [{ id: { in: parsedSubCategories } }],
        },
      });
    }
    const products = await prisma.product.findMany({
      where: {
        AND: AND,
      },
      include: {
        subCategorie: true,
        categorie: true,
      },
    });

    return res.status(200).json({
      ok: true,
      data: products,
    });
  } catch (error: any) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};
