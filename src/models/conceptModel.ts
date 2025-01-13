
import { Schema, model, Types } from 'mongoose';
import { IConcept } from "../interfaces/conceptInterface";


const ConceptSchema = new Schema(
    {
        name: { type: String, required: true },
        costPrice: { type: Number, required: true },
        amountHours: { type: Number, required: false },
        description: { type: String, required: false },
        conceptType: { type: Schema.Types.ObjectId, ref: 'ConceptType' },
        resourceType: { type: Schema.Types.ObjectId, ref: 'ResourceType' },
        isExternal: { type: Boolean, required: false }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export const ConceptModel = model<IConcept>('Concept', ConceptSchema);