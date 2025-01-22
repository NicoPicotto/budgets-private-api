import { IBudget } from "../interfaces/budgetInterface";
import { BudgetModel } from "../models/budgetModel";
import { BudgetConceptModel } from "../models/budgetConceptModel";
import { IBudgetConcept } from "../interfaces/budgetConceptInterface";
import { BUDGET_STATES } from "../config/constants";

export class BudgetService {
   static validateBudgetData(
      budgetData: Partial<IBudget>,
      isUpdate: boolean = false
   ): void {
      const errors = [];

      if (!isUpdate && !budgetData.project) {
         errors.push({ field: "project", message: "Project ID is required." });
      }

      if (budgetData.totalCost !== undefined && budgetData.totalCost < 0) {
         errors.push({
            field: "totalCost",
            message: "Total cost must be a non-negative number.",
         });
      }

      if (budgetData.totalHours !== undefined && budgetData.totalHours < 0) {
         errors.push({
            field: "totalHours",
            message: "Total hours must be a non-negative number.",
         });
      }

      if (
         budgetData.commissionPercentage !== undefined &&
         (budgetData.commissionPercentage < 0 ||
            budgetData.commissionPercentage > 100)
      ) {
         errors.push({
            field: "commissionPercentage",
            message: "Commission percentage must be between 0 and 100.",
         });
      }

      if (
         budgetData.state &&
         !Object.values(BUDGET_STATES).includes(budgetData.state as any)
      ) {
         errors.push({
            field: "state",
            message: "State must be a valid budget state.",
         });
      }

      if (errors.length > 0) {
         throw new Error(JSON.stringify(errors));
      }
   }

   public static async getBudgets(): Promise<IBudget[]> {
      const budgets = await BudgetModel.find({})
         .populate({
            path: "project",
            populate: { path: "client" },
         })
         .populate("budgetConcepts")
         .populate("seller");
      return budgets;
   }

   public static async getBudgetById(id: string): Promise<IBudget | null> {
      const budget = await BudgetModel.findById(id)
         .populate({
            path: "project",
            populate: { path: "client" },
         })
         .populate("budgetConcepts")
         .populate("seller");
      return budget;
   }

   public static async createBudget(budgetData: IBudget): Promise<IBudget> {
      this.validateBudgetData(budgetData);

      const newBudget = new BudgetModel(budgetData);
      await newBudget.save();

      const populatedBudget = await BudgetModel.findById(newBudget._id)
         .populate({
            path: "project",
            populate: { path: "client" },
         })
         .populate("budgetConcepts")
         .exec();

      if (!populatedBudget) {
         throw new Error("Error populating budget after creation.");
      }

      return populatedBudget;
   }

   public static async updateBudget(
      id: string,
      budgetData: Partial<IBudget>
   ): Promise<IBudget | null> {
      this.validateBudgetData(budgetData, true); // Pasamos `true` para indicar que es una actualización
      const updatedBudget = await BudgetModel.findByIdAndUpdate(
         id,
         budgetData,
         {
            new: true,
            runValidators: true,
         }
      )
         .populate({
            path: "project",
            populate: { path: "client" },
         })
         .populate("budgetConcepts");

      return updatedBudget;
   }

   public static async deleteBudget(id: string): Promise<IBudget | null> {
      const deletedBudget = await BudgetModel.findByIdAndDelete(id);
      return deletedBudget;
   }

   public static async addBudgetConcepts(
      budgetId: string,
      budgetConcepts: IBudgetConcept[]
   ): Promise<IBudget | null> {
      const budget = await BudgetModel.findById(budgetId);
      if (!budget) {
         throw new Error("Budget not found");
      }

      // Save each BudgetConcept and collect their IDs
      const savedBudgetConceptIds = [];
      for (const concept of budgetConcepts) {
         const {
            concept: conceptId,
            quantity,
            costPrice,
            percentageRisk,
            effortHours,
            effortRisk,
            totalCost,
         } = concept;

         // Validate required fields
         if (!conceptId || !quantity || !costPrice) {
            throw new Error(
               "Each budget concept must have a concept ID, quantity, and cost."
            );
         }

         const newConcept = new BudgetConceptModel({
            concept: conceptId,
            quantity,
            costPrice,
            percentageRisk,
            effortHours,
            effortRisk,
            totalCost,
         });
         const savedConcept = await newConcept.save();
         savedBudgetConceptIds.push(savedConcept);
      }

      // Associate the saved BudgetConcept IDs with the Budget
      budget.budgetConcepts = [
         ...budget.budgetConcepts,
         ...savedBudgetConceptIds,
      ];
      await budget.save();

      const populatedBudget = await BudgetModel.findById(budgetId)
         .populate({
            path: "project",
            populate: { path: "client" },
         })
         .populate("budgetConcepts")
         .exec();

      return populatedBudget;
   }

   public static async addBudgetConcept(
      budgetId: string,
      budgetConcept: IBudgetConcept
   ): Promise<IBudget | null> {
      const budget = await BudgetModel.findById(budgetId);
      if (!budget) {
         throw new Error("Budget not found");
      }

      budget.budgetConcepts.push(budgetConcept);
      await budget.save();

      const populatedBudget = await BudgetModel.findById(budgetId)
         .populate({
            path: "project",
            populate: { path: "client" },
         })
         .populate("budgetConcepts")
         .exec();

      return populatedBudget;
   }

   public static async deleteBudgetConcept(
      budgetId: string,
      budgetConceptId: string
   ): Promise<IBudget | null> {
      const budget = await BudgetModel.findById(budgetId);
      if (!budget) {
         throw new Error("Budget not found");
      }

      budget.budgetConcepts = budget.budgetConcepts.filter(
         (concept) => concept.toString() !== budgetConceptId
      );
      await budget.save();

      const populatedBudget = await BudgetModel.findById(budgetId)
         .populate({
            path: "project",
            populate: { path: "client" },
         })
         .populate("budgetConcepts")
         .exec();

      return populatedBudget;
   }

   public static async getBudgetConceptsByBudgetId(
      budgetId: string
   ): Promise<IBudgetConcept[]> {
      const budget = await BudgetModel.findById(budgetId).populate(
         "budgetConcepts"
      );
      if (!budget) {
         throw new Error("Budget not found");
      }
      return budget.budgetConcepts as IBudgetConcept[];
   }

   public static async getBudgetConceptById(
      id: string
   ): Promise<IBudgetConcept | null> {
      const budgetConcept = await BudgetConceptModel.findById(id).populate(
         "budget"
      );
      if (!budgetConcept) {
         throw new Error("Budget concept not found");
      }
      return budgetConcept;
   }

   public static async updateBudgetConcept(
      budgetId: string,
      conceptId: string,
      budgetConceptData: Partial<IBudgetConcept>
   ): Promise<IBudget | null> {
      const updatedBudgetConcept = await BudgetConceptModel.findByIdAndUpdate(
         conceptId,
         budgetConceptData,
         {
            new: true,
            runValidators: true,
         }
      );

      if (!updatedBudgetConcept) {
         throw new Error("Budget concept not found");
      }

      const populatedBudget = await BudgetModel.findById(budgetId)
         .populate({
            path: "project",
            populate: { path: "client" },
         })
         .populate("budgetConcepts")
         .exec();

      return populatedBudget;
   }

   public static async getBudgetConcepts(
      budgetId: string
   ): Promise<IBudgetConcept[]> {
      const budget = await BudgetModel.findById(budgetId).populate({
         path: "budgetConcepts",
         populate: {
            path: "concept", // Poblamos el campo `concept`
         },
      });
      if (!budget) {
         throw new Error("Budget not found");
      }
      return budget.budgetConcepts as IBudgetConcept[];
   }
}
