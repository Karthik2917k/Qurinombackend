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
exports.getSubCategories = exports.editSubCategory = exports.deleteSubCategory = exports.newSubCategory = void 0;
const index_1 = require("../../prismaClient/index");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const newSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subcategory, categoryId } = req.body;
        yield index_1.prisma.subCategory.create({
            data: { name: subcategory, categorie: { connect: { id: categoryId } } },
        });
        return res
            .status(200)
            .json({ ok: true, message: "Sub Category created successfully" });
    }
    catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
});
exports.newSubCategory = newSubCategory;
const deleteSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield index_1.prisma.subCategory.delete({
            where: { id },
        });
        return res
            .status(200)
            .json({ ok: true, message: "Sub Category deleted successfully" });
    }
    catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
});
exports.deleteSubCategory = deleteSubCategory;
const editSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { Subcategory } = req.body;
        yield index_1.prisma.subCategory.update({
            where: { id },
            data: { name: Subcategory },
        });
        return res
            .status(200)
            .json({ ok: true, message: "Sub Category deleted successfully" });
    }
    catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
});
exports.editSubCategory = editSubCategory;
const getSubCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const subCategory = yield index_1.prisma.subCategory.findMany({
            where: { categorie: { id } },
        });
        return res
            .status(200)
            .json({ ok: true, data: subCategory });
    }
    catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
});
exports.getSubCategories = getSubCategories;
