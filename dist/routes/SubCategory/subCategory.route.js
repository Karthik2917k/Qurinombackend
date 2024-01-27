"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and controllers
const express_1 = require("express");
const VerifyToken_1 = __importDefault(require("../../middleware/VerifyToken"));
const subCategory_controller_1 = require("../../controllers/SubCategory/subCategory.controller");
// Create a new Express Router instance
const app = (0, express_1.Router)();
// Route for creating a new Sub  Category
app.post("/new", VerifyToken_1.default, (req, res) => {
    return (0, subCategory_controller_1.newSubCategory)(req, res);
});
// Route for getting all Sub  Category by category Id
app.get('/', (req, res) => {
    return (0, subCategory_controller_1.getSubCategories)(req, res);
});
// Route for updating a  existing Sub  Category
app.patch("/update/:id", VerifyToken_1.default, (req, res) => {
    return (0, subCategory_controller_1.editSubCategory)(req, res);
});
// Route for deleting a  existing Sub Category
app.delete("/delete/:id", VerifyToken_1.default, (req, res) => {
    return (0, subCategory_controller_1.deleteSubCategory)(req, res);
});
// Export the Express Router instance
exports.default = app;
