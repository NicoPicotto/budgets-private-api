import { Request, Response, NextFunction } from "express";
import Budget from "../models/budgetModel";
import BudgetBody from "../interfaces/budgetInterface";

const getAllBudgets = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const budgets = await Budget.getAllBudgets();
      res.status(200).json(budgets);
   } catch (error) {
      next(error);
   }
};

const addBudget = async (req: Request, res: Response, next: NextFunction) => {
   const { title, client, project, items, amount, date } = req.body;

   const budgetBody: BudgetBody = {
      title,
      client,
      project,
      items,
      amount,
      date,
   };

   try {
      const newBudget = await Budget.addBudget(budgetBody);
      res.status(201).json(newBudget);
   } catch (error) {
      next(error);
   }
};

export { getAllBudgets, addBudget };
