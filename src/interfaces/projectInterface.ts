import { Document } from 'mongoose';

//Model
export interface IProject extends Document {

    _id: string;
    name: string;
    client: number;
    state: string;
}
