// Import necessary modules and controllers
import { Request, Response, Router } from "express";
import verifyToken from "../../middleware/VerifyToken";
import {
 deleteCategory,editCategory,getCategories,newCategory
} from "../../controllers/Category/category.controller";

// Create a new Express Router instance
const app = Router();

// Route for creating a new Category
app.post("/new",verifyToken, (req: Request, res: Response) => {
  return newCategory(req, res);
});

app.get('/',verifyToken,(req: Request, res: Response) => {
    return getCategories(req, res);
  })
// Route for updating a  existing Category
app.patch("/update/:id",verifyToken, (req: Request, res: Response) => {
  return editCategory(req, res);
});

// Route for deleting a  existing Category
app.delete("/delete/:id",verifyToken, (req: Request, res: Response) => {
    return deleteCategory(req, res);
  });


// Export the Express Router instance
export default app;
