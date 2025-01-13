
export interface IBudgetConcept extends Document {

    _id: string;
    concept: string;
    quantity: number;
    costPrice: number;
    percentageRisk: number;
    effortHours: number;
    effortRisk: number;
    totalCost: number;

}