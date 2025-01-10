
import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { AuthService } from '../services/authService';
import { handleResponse } from '../utils/responseHandler';
import { ICreateUserRequest, ICreateUserResponse, IUserLoginRequest, IUserLoginResponse, IForgotPasswordRequest, ILogoutUserRequest, IRefreshTokenRequest, IChangePasswordRequest, ISendInvitationRequest, IAcceptInvitationRequest } from '../interfaces/userInterface';
import { ITokenRequest } from '../interfaces/tokenInterface';
import { MailerService } from '../services/mailerService';


export const AuthController = {

   // Registro
   async register(
      req: ICreateUserRequest,
      res: Response
   ): Promise<Response<ICreateUserResponse>> {
      try {
         const user = await UserService.createUser(req.body);
         return handleResponse(res, 201, 'Usuario registrado', { id: user._id });
      } catch (error) {
         const message = error instanceof Error ? error.message : 'Error desconocido';
         return handleResponse(res, 400, message, null, error);
      }
   },

   // Login
   async login(
      req: IUserLoginRequest,
      res: Response
   ): Promise<Response<IUserLoginResponse>> {
      try {

         const { accessToken, refreshToken } = await AuthService.login(req.body);

         return handleResponse(res, 200, 'Login successfully', {
            accessToken, refreshToken
         });
      } catch (error) {
         const message = error instanceof Error ? error.message : 'Error desconocido';
         return handleResponse(res, 400, message, null, error);
      }
   },

   async logout(req: ILogoutUserRequest, res: Response): Promise<Response> {
      try {
         const { refreshToken } = req.body;
         if (!refreshToken) throw new Error("Refresh token is required");

         await AuthService.logout(refreshToken);

         return handleResponse(res, 200, "Logged out successfully", null);

      } catch (error) {
         const message = error instanceof Error ? error.message : "Unknown error";
         return handleResponse(res, 400, message, null, error);
      }
   },

   async forgotPassword(req: IForgotPasswordRequest, res: Response): Promise<Response> {
      try {
         const { email } = req.body;
         if (!email) throw new Error("Email is required");

         const resetToken = await AuthService.generateResetToken(email);

         // Enviar correo con el token
         await MailerService.sendPasswordResetEmail(email, resetToken);

         return handleResponse(res, 200, "Password reset email sent successfully", null);
      } catch (error) {
         const message = error instanceof Error ? error.message : "Unknown error";
         return handleResponse(res, 400, message, null, error);
      }
   },

   async changePassword(req: IChangePasswordRequest, res: Response): Promise<Response> {
      try {
         const { newPassword } = req.body;
         if (!newPassword) throw new Error("Token and new password are required");

         const user = await AuthService.changePassword(req.currentUser._id, newPassword);

         const accessToken = AuthService.generateAccessToken(user._id, user.tokenVersion);
         const refreshToken = AuthService.generateRefreshToken(user._id, user.tokenVersion);
         await AuthService.saveRefreshToken(user._id, refreshToken);

         return handleResponse(res, 200, "Password changed successfully", { accessToken, refreshToken });

      } catch (error) {
         const message = error instanceof Error ? error.message : "Unknown error";
         return handleResponse(res, 400, message, null, error);
      }
   },

   async resetPassword(req: Request, res: Response): Promise<Response> {
      try {
         const { token, newPassword } = req.body;
         if (!token || !newPassword) {
            throw new Error("Token and new password are required");
         }

         // Validar el token y obtener el usuario
         const user = await AuthService.validateResetToken(token);

         //Cambiar la contraseña del usuario
         const userUpdated = await AuthService.changePassword(user._id, newPassword);

         //Generar nuevos tokens de acceso
         const accessToken = AuthService.generateAccessToken(userUpdated._id, userUpdated.tokenVersion);
         const refreshToken = AuthService.generateRefreshToken(userUpdated._id, userUpdated.tokenVersion);
         await AuthService.saveRefreshToken(userUpdated._id, refreshToken);


         return handleResponse(res, 200, "Password reset successfully", { accessToken, refreshToken });
      } catch (error) {
         const message = error instanceof Error ? error.message : "Unknown error";
         return handleResponse(res, 400, message, null, error);
      }
   },

   async validateResetToken(req: ITokenRequest, res: Response): Promise<Response> {
      try {
         const { accessToken } = req.params;
         if (!accessToken) throw new Error("Token is required");

         const user = await AuthService.validateResetToken(accessToken);

         return handleResponse(res, 200, 'Token is valid', user);

      } catch (error) {
         const message = error instanceof Error ? error.message : "Invalid or expired token";
         return res.status(400).json({ message });
      }
   },

   async refreshToken(req: IRefreshTokenRequest, res: Response): Promise<Response> {
      try {
         const { refreshToken } = req.body;
         if (!refreshToken) throw new Error("Refresh token is required");

         const accessToken = await AuthService.refreshToken(refreshToken);
         return handleResponse(res, 200, "Token refreshed successfully", { accessToken });
      } catch (error) {
         const message = error instanceof Error ? error.message : "Unknown error";
         return handleResponse(res, 400, message, null, error);
      }
   },
   async sendInvitation(req: ISendInvitationRequest, res: Response): Promise<Response> {

      try {
         const { email } = req.body;
         if (!email) throw new Error("Email is required");

         const resetToken = await AuthService.generateResetToken(email);

         await MailerService.sendInvitation(email, resetToken);

         return handleResponse(res, 200, "Invitation sent successfully", {});
      } catch (error) {
         const message = error instanceof Error ? error.message : "Unknown error";
         return handleResponse(res, 400, message, null, error);
      }
   },
   async validateInvitation(req: ITokenRequest, res: Response): Promise<Response> {
      try {
         const { accessToken } = req.params;
         if (!accessToken) throw new Error("Token is required");
         const user = await AuthService.validateResetToken(accessToken);

         return handleResponse(res, 200, 'Token is valid', user);
      } catch (error) {
         const message = error instanceof Error ? error.message : "Invalid or expired token";
         return res.status(400).json({ message });
      }
   },
   async acceptInvitation(req: IAcceptInvitationRequest, res: Response): Promise<Response> {
      try {

         const { token, newPassword } = req.body;
         if (!token || !newPassword) {
            throw new Error("Token and new password are required");
         }

         // Validar el token y obtener el usuario
         const user = await AuthService.validateResetToken(token);

         //Cambiar la contraseña del usuario
         const userUpdated = await AuthService.changePassword(user._id, newPassword);

         //Generar nuevos tokens de acceso
         const accessToken = AuthService.generateAccessToken(userUpdated._id, userUpdated.tokenVersion);
         const refreshToken = AuthService.generateRefreshToken(userUpdated._id, userUpdated.tokenVersion);

         return handleResponse(res, 200, "invitation accepted successfully", { accessToken, refreshToken });
      } catch (error) {
         const message = error instanceof Error ? error.message : "Invalid or expired token";
         return res.status(400).json({ message });
      }
   },
   async revokeToken(req: IRefreshTokenRequest, res: Response): Promise<Response> {
      try {
         const { refreshToken } = req.body;
         if (!refreshToken) throw new Error("Refresh token is required");

         await AuthService.revokeToken(refreshToken);

         return handleResponse(res, 200, "Token revoked successfully", null);
      } catch (error) {
         const message = error instanceof Error ? error.message : "Unknown error";
         return handleResponse(res, 400, message, null, error);
      }
   },
}