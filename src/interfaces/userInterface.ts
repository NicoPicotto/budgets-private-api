import { Document } from 'mongoose';

//Model
export interface IUser extends Document {

   _id: string;
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   role: string;
   resetPasswordToken?: string;
   resetPasswordExpires?: Date;
   createdAt?: Date;
   updatedAt?: Date;
   refreshToken?: string;
   tokenVersion: number;
   confirmPassword?: string;
   comparePassword(password: string): Promise<boolean>;

}