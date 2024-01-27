"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.deleteProduct = exports.editProduct = exports.newProduct = void 0;
const index_1 = require("../../prismaClient/index");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const newProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { location, price, image, description, title, merchantId, subcategoryId, categoryId, } = req.body;
        yield index_1.prisma.product.create({
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
    }
    catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
});
exports.newProduct = newProduct;
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const newData = Object.assign(Object.assign({}, data), { price: +data.price });
        yield index_1.prisma.product.update({
            where: { id },
            data: Object.assign({}, newData),
        });
        return res
            .status(200)
            .json({ ok: true, message: "product updated successfully" });
    }
    catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
});
exports.editProduct = editProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield index_1.prisma.product.delete({
            where: { id },
        });
        return res
            .status(200)
            .json({ ok: true, message: "product deleted successfully" });
    }
    catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
});
exports.deleteProduct = deleteProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search = "", location = "", categories = [], subCategories = [], min = "", max = "", } = req.query;
        const parsedSubCategories = (Array.isArray(subCategories) ? subCategories : [subCategories]).map((id) => id);
        const parsedCategories = (Array.isArray(categories) ? categories : [categories]).map((id) => id);
        // orderBy: orderBy as any,
        const AND = [
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
        const products = yield index_1.prisma.product.findMany({
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
    }
    catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
});
exports.getProducts = getProducts;
