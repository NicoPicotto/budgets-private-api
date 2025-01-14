
import { Schema, model, } from 'mongoose';
import { IBudgetConcept } from "../interfaces/budgetConceptInterface";

const ClientSchema = new Schema(
    {
        concept: { type: Schema.Types.ObjectId, ref: "Concept" },
        quantity: { type: Number, required: false, default: 0 },
        costPrice: { type: Number, required: false, default: 0 },
        percentageRisk: { type: Number, required: false, default: 0 },
        effortHours: { type: Number, required: false, default: 0 },
        effortRisk: { type: Number, required: false, default: 0 },
        totalCost: { type: Number, required: false, default: 0 },
    },
    {
        timestamps: true,
    }
);

export const BudgetConceptModel = model<IBudgetConcept>("BudgetConcept", ClientSchema);