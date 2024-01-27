"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and controllers
const express_1 = require("express");
const VerifyToken_1 = __importDefault(require("../../middleware/VerifyToken"));
const category_controller_1 = require("../../controllers/Category/category.controller");
// Create a new Express Router instance
const app = (0, express_1.Router)();
// Route for creating a new Category
app.post("/new", VerifyToken_1.default, (req, res) => {
    return (0, category_controller_1.newCategory)(req, res);
});
app.get('/', VerifyToken_1.default, (req, res) => {
    return (0, category_controller_1.getCategories)(req, res);
});
// Route for updating a  existing Category
app.patch("/update/:id", VerifyToken_1.default, (req, res) => {
    return (0, category_controller_1.editCategory)(req, res);
});
// Route for deleting a  existing Category
app.delete("/delete/:id", VerifyToken_1.default, (req, res) => {
    return (0, category_controller_1.deleteCategory)(req, res);
});
// Export the Express Router instance
exports.default = app;
