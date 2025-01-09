import { Router } from "express";
import {
   getAllBudgets,
   addBudget,
   deleteBudget,
   updateBudget,
   getBudgetById,
} from "../controllers/budgetController";
import { AuthMiddleware } from "../middleware/authMiddleware";

const budgetRouter = Router();

budgetRouter.use(AuthMiddleware.authenticate);

budgetRouter.get("/", getAllBudgets);
budgetRouter.get("/:id", getBudgetById);
budgetRouter.post("/", addBudget);
budgetRouter.delete("/:id", deleteBudget);
budgetRouter.put("/:id", updateBudget);

export default budgetRouter;
