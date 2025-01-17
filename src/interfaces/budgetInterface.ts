import { Types, Document } from 'mongoose';
import { IBudgetConcept } from "./budgetConceptInterface";

export interface IBudget extends Document {

   _id: string;
   project: string;
   budgetConcepts: IBudgetConcept[];
   totalCost: number;
   totalHours: number;
   totalRisk: number;
   commissionPercentage: number;
   overallRiskPercentage: number;
   profitPercentage: number;
   profitRisk: number;
   overallRisk: number;
   totalPriceWOCommission: number;
   totalPrice: number;
   totalPriceRecurring: number;
   state: string;
   seller: string
   createdAt: Date;
   updatedAt: Date;
   deletedAt: Date;

}