"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/User/user.route"));
const Merchant_route_1 = __importDefault(require("./routes/Merchant/Merchant.route"));
const product_route_1 = __importDefault(require("./routes/Product/product.route"));
const dotenv_1 = __importDefault(require("dotenv"));
const category_route_1 = __importDefault(require("./routes/Category/category.route"));
const subCategory_route_1 = __importDefault(require("./routes/SubCategory/subCategory.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "https://qurinom-cyan.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));
app.use("/user", user_route_1.default);
app.use("/merchant", Merchant_route_1.default);
app.use("/products", product_route_1.default);
app.use("/subCategory", subCategory_route_1.default);
app.use("/category", category_route_1.default);
app.get("/", (req, res) => {
    res.status(200).json({ ok: true, message: "Hello, Qurinom Solutionns" });
});
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
