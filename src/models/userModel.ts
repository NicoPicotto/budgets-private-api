import { Schema, model, } from 'mongoose';
import bcrypt from "bcrypt";
import { IUser } from "../interfaces/userInterface";

import crypto from 'crypto';
import { userInfo } from 'os';


const UserSchema = new Schema(
   {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      resetPasswordToken: {
         type: String,
         trim: true,
         required: false,
         select: false
      },
      resetPasswordExpires: {
         type: Date,
         trim: true,
         required: false,
         select: false
      },
      refreshToken: { type: String, default: '' },
      tokenVersion: { type: Number, default: 0 },
   },
   {
      toJSON: {
         transform: function (doc, ret) {
            delete ret.password; // Excluir el password
            delete ret.resetPasswordToken; // Excluir el resetPasswordToken
            delete ret.resetPasswordExpires; // Excluir el resetPasswordExpires
            return ret;
         }
      },
      toObject: {
         transform: function (doc, ret) {
            delete ret.password; // Excluir el password
            delete ret.resetPasswordToken; // Excluir el resetPasswordToken
            delete ret.resetPasswordExpires; // Excluir el resetPasswordExpires
            return ret;
         }
      },
      versionKey: false,
      timestamps: true
   }
);


const saltRounds = 10;


//plugin para la utilizacion de UNIQUE

//se ejecuta antes de hacer el evento save
UserSchema.pre("save", function (next) {

   if (this.isModified("password")) {
      this.password = bcrypt.hashSync(this.password, saltRounds);
   }
   next();
});

//compara la password para permitir el acceso
UserSchema.methods.comparePassword = async function (password: string) {

   return bcrypt.compareSync(password, this.password);
};


export const UserModel = model<IUser>('User', UserSchema);