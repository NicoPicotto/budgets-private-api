import { Response } from 'express';
import { UserService } from '../services/userService';
import { handleResponse } from '../utils/responseHandler';
import { getErrorMessage } from '../utils/errorHandler';
import { IRequest } from '../interfaces/requestInterface';

export const UserController = {

   async createUser(
      req: IRequest,
      res: Response
   ): Promise<Response> {
      try {
         const newUser = await UserService.createUser(req.body);
         return handleResponse(res, 201, 'User created successfully', newUser.toObject());
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error), undefined, error);
      }
   },
   async updateUser(
      req: IRequest,
      res: Response
   ): Promise<Response> {
      try {
         const updatedUser = await UserService.updateUser(req.params.id, req.body);
         return handleResponse(res, 200, 'User updated successfully', updatedUser.toObject());
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error), undefined, error);
      }
   },

   async getUsers(req: IRequest, res: Response): Promise<Response> {

      try {
         const users = await UserService.getUsers();
         return handleResponse(res, 200, 'Users retrieved successfully', users);
      } catch (error) {
         return handleResponse(res, 500, 'Server Error', undefined, error);
      }
   },

   async getUserById(
      req: IRequest,
      res: Response
   ): Promise<Response> {
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
      req: IRequest,
      res: Response
   ): Promise<Response> {
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
