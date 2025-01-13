import { Document } from 'mongoose';

//Model
export interface IConceptType extends Document {

    _id: string;
    name: string;
}
