
import { Schema, model, } from 'mongoose';
import { IClient } from "../interfaces/clientInterface";
import { CLIENT_STATES } from '../config/constants';


const ClientSchema = new Schema(
   {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      state: { type: String, enum: [CLIENT_STATES.ACTIVE, CLIENT_STATES.INACTIVE, CLIENT_STATES.SUSPENDED, CLIENT_STATES.REMOVED], default: CLIENT_STATES.ACTIVE },
   },
   {
      versionKey: false,
      timestamps: true
   }
);

export const ClientModel = model<IClient>('Client', ClientSchema);