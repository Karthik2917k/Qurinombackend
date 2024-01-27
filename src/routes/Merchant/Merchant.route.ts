// Import necessary modules and controllers
import { Request, Response, Router } from "express";
import {
  loginMerchant,
 newMerchant
} from "../../controllers/Merchat/merchat.controller";

// Create a new Express Router instance
const app = Router();

// Route for creating a new User
app.post("/new", (req: Request, res: Response) => {
  return newMerchant(req, res);
});

// Route for creating a new User
app.post("/login", (req: Request, res: Response) => {
  return loginMerchant(req, res);
});


// Export the Express Router instance
export default app;
