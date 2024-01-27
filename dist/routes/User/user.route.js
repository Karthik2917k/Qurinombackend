"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and controllers
const express_1 = require("express");
const user_controller_1 = require("../../controllers/User/user.controller");
// Create a new Express Router instance
const app = (0, express_1.Router)();
// Route for creating a new User
app.post("/new", (req, res) => {
    return (0, user_controller_1.newUser)(req, res);
});
// Route for creating a new User
app.post("/login", (req, res) => {
    return (0, user_controller_1.loginUser)(req, res);
});
// Export the Express Router instance
exports.default = app;
