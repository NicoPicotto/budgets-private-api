import { Document } from 'mongoose';

//Model
export interface IResourceType extends Document {

    _id: string;
    name: string;
    costPrice: number;
}
