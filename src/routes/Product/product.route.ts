// Import necessary modules and controllers
import { Request, Response, Router } from "express";
import verifyToken from "../../middleware/VerifyToken";
import {
  deleteProduct,
  editProduct,
  getProducts,
  newProduct,
} from "../../controllers/Product/product.controller";

// Create a new Express Router instance
const app = Router();

// Route for creating a new product
app.post("/new", verifyToken, (req: Request, res: Response) => {
  return newProduct(req, res);
});
// Route for getting all products and we can apply filters
app.get("/", (req: Request, res: Response) => {
  return getProducts(req, res);
});
// Route for updating a  existing product
app.patch("/update/:id", verifyToken, (req: Request, res: Response) => {
  return editProduct(req, res);
});

// Route for deleting a  existing product
app.delete("/delete/:id", verifyToken, (req: Request, res: Response) => {
  return deleteProduct(req, res);
});

// Export the Express Router instance
export default app;
