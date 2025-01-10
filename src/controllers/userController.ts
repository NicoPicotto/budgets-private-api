import { Response } from 'express';
import { UserService } from '../services/userService';
import { handleResponse } from '../utils/responseHandler';
import {
   ICreateUserRequest,
   IGetUserRequest,
   IGetUserByIdRequest,
   IDeleteUserRequest,
   IUpdateUserRequest,
   ICreateUserResponse,
   IGetUsersResponse,
   IGetUserByIdResponse,
   IDeleteUserResponse,
   IUpdateUserResponse
} from '../interfaces/userInterface';
import { getErrorMessage } from '../utils/errorHandler';

export const UserController = {

   async createUser(
      req: ICreateUserRequest,
      res: Response
   ): Promise<Response<ICreateUserResponse>> {
      try {
         const newUser = await UserService.createUser(req.body);
         return handleResponse(res, 201, 'User created successfully', newUser.toObject());
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error), undefined, error);
      }
   },
   async updateUser(
      req: IUpdateUserRequest,
      res: Response
   ): Promise<Response<IUpdateUserResponse>> {
      try {
         const updatedUser = await UserService.updateUser(req.params.id, req.body);
         return handleResponse(res, 200, 'User updated successfully', updatedUser.toObject());
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error), undefined, error);
      }
   },

   async getUsers(req: IGetUserRequest, res: Response): Promise<Response<IGetUsersResponse>> {

      try {
         const users = await UserService.getUsers();
         return handleResponse(res, 200, 'Users retrieved successfully', users);
      } catch (error) {
         return handleResponse(res, 500, 'Server Error', undefined, error);
      }
   },

   async getUserById(
      req: IGetUserByIdRequest,
      res: Response
   ): Promise<Response<IGetUserByIdResponse>> {
      try {
         const user = await UserService.getUserById(req.params.id);
         if (!user) {
            return handleResponse(res, 404, 'User not found');
         }
         return handleResponse(res, 200, 'User retrieved successfully', user);
      } catch (error) {
         return handleResponse(res, 500, 'Server Error', undefined, error);
      }
   },

   async deleteUser(
      req: IDeleteUserRequest,
      res: Response
   ): Promise<Response<IDeleteUserResponse>> {
      try {
         const user = await UserService.deleteUser(req.params.id);
         if (!user) {
            return handleResponse(res, 404, 'User not found');
         }
         return handleResponse(res, 200, 'User deleted successfully');
      } catch (error) {
         return handleResponse(res, 500, 'Server Error', undefined, error);
      }
   },
};
