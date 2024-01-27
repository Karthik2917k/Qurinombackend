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
exports.getCategories = exports.editCategory = exports.deleteCategory = exports.newCategory = void 0;
const index_1 = require("../../prismaClient/index");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const newCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.body;
        yield index_1.prisma.category.create({
            data: { name: category },
        });
        return res
            .status(200)
            .json({ ok: true, message: "Category created successfully" });
    }
    catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
});
exports.newCategory = newCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield index_1.prisma.subCategory.deleteMany({
            where: { categorie: { id } },
        });
        yield index_1.prisma.category.delete({
            where: { id },
        });
        return res
            .status(200)
            .json({ ok: true, message: "Category deleted successfully" });
    }
    catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
});
exports.deleteCategory = deleteCategory;
const editCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { category } = req.body;
        yield index_1.prisma.category.update({
            where: { id },
            data: { name: category },
        });
        return res
            .status(200)
            .json({ ok: true, message: "Category deleted successfully" });
    }
    catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
});
exports.editCategory = editCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield index_1.prisma.category.findMany({
            include: {
                SubCategory: true,
            },
        });
        return res.status(200).json({ ok: true, data: categories });
    }
    catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
});
exports.getCategories = getCategories;
