import mongoose from "mongoose";
import BudgetBody from '../interfaces/budgetInterface';

const budgetSchema = new mongoose.Schema(
   {
      title: { type: String, required: true },
      client: { type: String, required: true },
      project: { type: String, required: true },
      items: { type: Array, required: true },
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
   },
   { versionKey: false, timestamps: true }
);

const Budget = mongoose.model("Budget", budgetSchema);

const getAllBudgets = async () => {
   try {
      const budgets = await Budget.find();
      return budgets;
   } catch (error) {
      throw new Error("Error al obtener los presupuestos");
   }
};

const addBudget = async (dataBudget: BudgetBody) => {
   try {
      const newBudget = new Budget(dataBudget);
      await newBudget.save();
      return newBudget;
   } catch (error) {
      throw new Error("Error al crear presupuesto");
   }
};

export default { getAllBudgets, addBudget };
