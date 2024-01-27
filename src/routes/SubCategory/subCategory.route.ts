// Import necessary modules and controllers
import { Request, Response, Router } from "express";
import verifyToken from "../../middleware/VerifyToken";
import {
 deleteSubCategory,editSubCategory,getSubCategories,newSubCategory
} from "../../controllers/SubCategory/subCategory.controller";

// Create a new Express Router instance
const app = Router();

// Route for creating a new Sub  Category
app.post("/new",verifyToken, (req: Request, res: Response) => {
  return newSubCategory(req, res);
});
// Route for getting all Sub  Category by category Id
app.get('/',(req: Request, res: Response) => {
    return getSubCategories(req, res);
  })
// Route for updating a  existing Sub  Category
app.patch("/update/:id",verifyToken, (req: Request, res: Response) => {
  return editSubCategory(req, res);
});

// Route for deleting a  existing Sub Category
app.delete("/delete/:id",verifyToken, (req: Request, res: Response) => {
    return deleteSubCategory(req, res);
  });


// Export the Express Router instance
export default app;
