import { Document } from 'mongoose';

//Model
export interface IConcept extends Document {

    _id: string;
    name: string;
    costPrice: number;
    amountHours: number;
    description: string;
    conceptType: string;
    resourceType: string;
    isExternal: boolean;
}
