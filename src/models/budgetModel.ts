import { Schema, model, } from 'mongoose';
import { IBudget } from "../interfaces/budgetInterface";
import { BUDGET_STATES } from '../config/constants';
import { BudgetConceptModel } from "./budgetConceptModel";

const budgetSchema = new Schema(
   {
      project: { type: Schema.Types.ObjectId, ref: "Project", unique: true },
      budgetConcepts: [
         { type: Schema.Types.ObjectId, ref: BudgetConceptModel, default: [] },
      ],
      totalCost: { type: Number, default: 0 },
      totalHours: { type: Number, default: 0 },
      totalRisk: { type: Number, default: 0 },
      commissionPercentage: { type: Number, default: 0 },
      overallRiskPercentage: { type: Number, default: 0 },
      profitPercentage: { type: Number, default: 0 },
      profitRisk: { type: Number, default: 0 },
      overallRisk: { type: Number, default: 0 },
      totalPriceWOCommission: { type: Number, default: 0 },
      totalPrice: { type: Number, default: 0 },
      totalPriceRecurring: { type: Number, default: 0 },
      state: { type: String, enum: [BUDGET_STATES.DRAFT, BUDGET_STATES.PENDING_APPROVAL, BUDGET_STATES.APPROVED, BUDGET_STATES.ACTIVE, BUDGET_STATES.SUSPENDED, BUDGET_STATES.CANCELLED, BUDGET_STATES.COMPLETED], default: BUDGET_STATES.DRAFT },
   },
   { versionKey: false, timestamps: true }
);

export const BudgetModel = model<IBudget>("Budget", budgetSchema);
