"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and controllers
const express_1 = require("express");
const VerifyToken_1 = __importDefault(require("../../middleware/VerifyToken"));
const product_controller_1 = require("../../controllers/Product/product.controller");
// Create a new Express Router instance
const app = (0, express_1.Router)();
// Route for creating a new product
app.post("/new", VerifyToken_1.default, (req, res) => {
    return (0, product_controller_1.newProduct)(req, res);
});
// Route for getting all products and we can apply filters
app.get("/", (req, res) => {
    return (0, product_controller_1.getProducts)(req, res);
});
// Route for updating a  existing product
app.patch("/update/:id", VerifyToken_1.default, (req, res) => {
    return (0, product_controller_1.editProduct)(req, res);
});
// Route for deleting a  existing product
app.delete("/delete/:id", VerifyToken_1.default, (req, res) => {
    return (0, product_controller_1.deleteProduct)(req, res);
});
// Export the Express Router instance
exports.default = app;
