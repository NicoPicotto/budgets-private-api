
import { Schema, model } from 'mongoose';
import { IConceptType } from "../interfaces/conceptTypeInterface";


const ConceptTypeSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export const ConceptTypeModel = model<IConceptType>('ConceptType', ConceptTypeSchema);