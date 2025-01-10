import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { IRequest } from "../interfaces/requestInterface";

//Model
export interface IUser extends Document {

   _id: string;
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   resetPasswordToken?: string;
   resetPasswordExpires?: Date;
   createdAt?: Date;
   updatedAt?: Date;
   refreshToken?: string;
   tokenVersion: number;
   comparePassword(password: string): Promise<boolean>;

}

//Request
export interface ICreateUserRequest extends IRequest {
   body: {
      firstName: string;
      lastName: string;
      email: string;
   };
}

export interface IUpdateUserRequest extends IRequest {
   body: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
   };
}

export interface IGetUserRequest extends IRequest {

}

export interface IGetUserByIdRequest extends IRequest {
   params: {
      id: string;
   };
}

export interface IDeleteUserRequest extends IRequest {
   params: {
      id: string;
   };
}

export interface IUserLoginRequest extends IRequest {
   body: {
      email: string;
      password: string;
   };
}
export interface ILogoutUserRequest extends IRequest {
   body: {
      refreshToken: string;
   };
}

export interface IRefreshTokenRequest extends ILogoutUserRequest {

}


//Response
export interface ICreateUserResponse extends Response {
   success: boolean;
   message: string;
   user: IUser;
}

export interface IUpdateUserResponse extends Response {
   success: boolean;
   message: string;
   user: IUser;
}
export interface IGetUsersResponse extends Response {
   success: boolean;
   message: string;
   users: IUser[];
}

export interface IGetUserByIdResponse extends Response {
   success: boolean;
   message: string;
   user: IUser;
}

export interface IDeleteUserResponse extends Response {
   success: boolean;
   message: string;
}

export interface IUserLoginResponse extends Response {
   accessToken: string;
   refreshToken: string;
}

//Auth
export interface IResetPassword {
   email: string;
   password: string;
   confirmPassword: string;
}

export interface IChangePasswordRequest extends IRequest {
   body: {
      accessToken: string;
      newPassword: string;
   };
}

export interface IForgotPasswordRequest extends IRequest {
   body: {
      email: string;
   };
}
export interface IForgotPasswordRequest extends IRequest {
   body: {
      email: string;
   };
}
export interface ISendInvitationRequest extends IRequest {
   body: {
      email: string;
   };
}

export interface IAcceptInvitationRequest extends IRequest {
   body: {
      token: string;
      newPassword: string;
   };
}




