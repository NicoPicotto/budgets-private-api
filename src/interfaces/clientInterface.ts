
import { Document } from 'mongoose';

export interface IClient extends Document {

   _id: string;
   name: string;
   email: string;
   state: string;

}