
import { Schema, model } from 'mongoose';
import { IResourceType } from "../interfaces/resourceTypeInterface";


const ResourceTypeSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export const ResourceTypeModel = model<IResourceType>('ResourceType', ResourceTypeSchema);