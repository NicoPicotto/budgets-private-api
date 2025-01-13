import { Document } from 'mongoose';

//Model
export interface IResource extends Document {

    _id: string;
    name: string;
}
