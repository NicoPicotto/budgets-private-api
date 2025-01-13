
import { Schema, model, } from 'mongoose';
import { IBudgetConcept } from "../interfaces/budgetConceptInterface";

const ClientSchema = new Schema(
    {
        concept: { type: Schema.Types.ObjectId, ref: "Concept" },
        quantity: { type: Number, required: false },
        costPrice: { type: Number, required: false },
        percentageRisk: { type: Number, required: false },
        effortHours: { type: Number, required: false },
        effortRisk: { type: Number, required: false },
        totalCost: { type: Number, required: false }
    },
    {
        timestamps: true,
    }
);

export const BudgetConceptModel = model<IBudgetConcept>("BudgetConcept", ClientSchema);