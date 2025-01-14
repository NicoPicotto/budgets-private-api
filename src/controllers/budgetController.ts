import { Request, Response } from "express";
import { BudgetService } from "../services/budgetService";
import { handleResponse } from "../utils/responseHandler";
import { getErrorMessage } from "../utils/errorHandler";

export const BudgetController = {
   async createBudget(req: Request, res: Response) {
      try {
         const budget = await BudgetService.createBudget(req.body);
         return handleResponse(res, 201, "Budget created", budget);
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error));
      }
   },

   async getBudgets(req: Request, res: Response) {
      try {
         const budgets = await BudgetService.getBudgets();
         return handleResponse(res, 200, "Budgets found", budgets);
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error));
      }
   },

   async getBudgetById(req: Request, res: Response) {
      try {
         const budget = await BudgetService.getBudgetById(req.params.id);
         if (!budget) {
            return handleResponse(res, 404, "Budget not found");
         }
         return handleResponse(res, 200, "Budget found", budget);
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error));
      }
   },

   async updateBudget(req: Request, res: Response) {
      try {
         const budget = await BudgetService.updateBudget(req.params.id, req.body);
         if (!budget) {
            return handleResponse(res, 404, "Budget not found");
         }
         return handleResponse(res, 200, "Budget updated", budget);
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error));
      }
   },

   async deleteBudget(req: Request, res: Response) {
      try {
         const budget = await BudgetService.deleteBudget(req.params.id);
         if (!budget) {
            return handleResponse(res, 404, "Budget not found");
         }
         return handleResponse(res, 200, "Budget deleted", budget);
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error));
      }
   },

   async addBudgetConcepts(req: Request, res: Response) {
      try {

         console.log(req.body, "budgetConcept");
         const budget = await BudgetService.addBudgetConcepts(req.params.id, req.body.budgetConcepts);
         if (!budget) {
            return handleResponse(res, 404, "Budget not found");
         }
         return handleResponse(res, 200, "Budget concepts added", budget);
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error));
      }
   },

   async getBudgetConcepts(req: Request, res: Response) {
      try {
         const budgetConcepts = await BudgetService.getBudgetConcepts(req.params.id);
         if (!budgetConcepts) {
            return handleResponse(res, 404, "Budget concepts not found");
         }
         return handleResponse(res, 200, "Budget concepts found", budgetConcepts);
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error));
      }
   },

   async getBudgetConceptById(req: Request, res: Response) {
      try {
         const budgetConcept = await BudgetService.getBudgetConceptById(req.params.conceptId);
         if (!budgetConcept) {
            return handleResponse(res, 404, "Budget concept not found");
         }
         return handleResponse(res, 200, "Budget concept found", budgetConcept);
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error));
      }
   },

   async updateBudgetConcept(req: Request, res: Response) {
      try {
         const budgetConcept = await BudgetService.updateBudgetConcept(req.params.id, req.params.conceptId, req.body);
         if (!budgetConcept) {
            return handleResponse(res, 404, "Budget concept not found");
         }
         return handleResponse(res, 200, "Budget concept updated", budgetConcept);
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error));
      }
   },

   async deleteBudgetConcept(req: Request, res: Response) {
      try {
         const budgetConcept = await BudgetService.deleteBudgetConcept(req.params.id, req.params.conceptId);
         if (!budgetConcept) {
            return handleResponse(res, 404, "Budget concept not found");
         }
         return handleResponse(res, 200, "Budget concept deleted", budgetConcept);
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error));
      }
   },

   async getBudgetConceptsByBudgetId(req: Request, res: Response) {
      try {
         const budgetConcepts = await BudgetService.getBudgetConceptsByBudgetId(req.params.id);
         if (!budgetConcepts) {
            return handleResponse(res, 404, "Budget concepts not found");
         }
         return handleResponse(res, 200, "Budget concepts found", budgetConcepts);
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error));
      }
   },
};
