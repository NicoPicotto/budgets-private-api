import { Schema, model, } from 'mongoose';
import bcrypt from "bcrypt";
import { IUser } from "../interfaces/userInterface";
const { USER_STATES, ROLES } = require('../config/constants');


const UserSchema = new Schema(
   {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      state: { type: String, enum: [USER_STATES.INITIAL, USER_STATES.ACTIVE, USER_STATES.REMOVED, USER_STATES.INACTIVE, USER_STATES.SUSPENDED], default: USER_STATES.INITIAL },
      role: { type: String, enum: [ROLES.ADMIN, ROLES.MEMBER, ROLES.CLIENT, ROLES.GUEST, ROLES.MODERATOR], default: ROLES.MEMBER },
      password: { type: String, required: false, default: '' },
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

   if (this.isModified("password") && this.password) {
      this.password = bcrypt.hashSync(this.password, saltRounds);
   }
   next();
});

//compara la password para permitir el acceso
UserSchema.methods.comparePassword = async function (password: string) {

   return bcrypt.compareSync(password, this.password);
};


export const UserModel = model<IUser>('User', UserSchema);