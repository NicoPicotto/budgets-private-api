import { Router } from "express";
import {
   BudgetController
} from "../controllers/budgetController";
import { AuthMiddleware } from "../middleware/authMiddleware";

const budgetRouter = Router();

budgetRouter.use(AuthMiddleware.authenticate);

budgetRouter.get("/", BudgetController.getBudgets);
budgetRouter.post("/", BudgetController.createBudget);
budgetRouter.get("/:id", BudgetController.getBudgetById);
budgetRouter.put("/:id", BudgetController.updateBudget);
budgetRouter.delete("/:id", BudgetController.deleteBudget);
budgetRouter.post("/:id/concepts", BudgetController.addBudgetConcepts);
budgetRouter.get("/:id/concepts", BudgetController.getBudgetConcepts);
budgetRouter.get("/:id/concepts/:conceptId", BudgetController.getBudgetConceptById);
budgetRouter.put("/:id/concepts/:conceptId", BudgetController.updateBudgetConcept);
budgetRouter.delete("/:id/concepts/:conceptId", BudgetController.deleteBudgetConcept);

export default budgetRouter;
