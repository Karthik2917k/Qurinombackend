import express, { Request, Response } from "express";
import cors from "cors";
import UserRouter from "./routes/User/user.route";
import MerchantRouter from "./routes/Merchant/Merchant.route";
import ProductsRouter from "./routes/Product/product.route";
import dotenv from "dotenv";
import CategoryRouter from "./routes/Category/category.route";
import SubategoryRouter from "./routes/SubCategory/subCategory.route";

import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "https://qurinom-cyan.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/user", UserRouter);
app.use("/merchant", MerchantRouter);
app.use("/products", ProductsRouter);
app.use("/subCategory", SubategoryRouter);
app.use("/category", CategoryRouter);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ ok: true, message: "Hello, Qurinom Solutionns" });
});

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
