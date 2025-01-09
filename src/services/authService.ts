import bcrypt from 'bcrypt';
import { UserModel } from '../models/userModel';
import { IUser, IResetPassword } from '../interfaces/userInterface';
import { IToken } from '../interfaces/tokenInterface';
import { getErrorMessage } from '../utils/errorHandler';
import { MailerService } from './mailerService';
import crypto from 'crypto';
import jwt from "jsonwebtoken";


export class AuthService {

    static async login(data: Partial<IUser>): Promise<any> { //TODO cambiar tipo reponse

        if (!data.email || !data.password) {
            throw new Error('Email and password are required');
        }

        try {
            // Buscar el usuario por email
            const user = await UserModel.findOne({ email: data.email });
            if (!user) {
                throw new Error("Invalid credentials");
            }

            const isMatch = await user.comparePassword(data.password);
            if (!isMatch) {
                throw new Error("Invalid credentials");
            }

            const accessToken = this.generateAccessToken(user.id, user.tokenVersion);
            const refreshToken = this.generateRefreshToken(user.id, user.tokenVersion);

            await this.saveRefreshToken(user.id, refreshToken);

            return { accessToken, refreshToken };

        } catch (error) {
            throw new Error(getErrorMessage(error));
        }
    }

    /*
    static async resetPassword(data: IResetPassword): Promise<IUser> {
        const { email, password, confirmPassword } = data;

        if (!password || password.trim() === '') {
            throw new Error("Password can't be blank");
        }

        if (!confirmPassword || confirmPassword.trim() === '') {
            throw new Error("Confirm password can't be blank");
        }

        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }

        try {
            // Buscar al usuario por email
            const user = await UserModel.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }

            // Actualizar la contraseña del usuario
            user.password = password;

            await user.save();

            return user.toObject();
        } catch (error) {
            throw new Error(getErrorMessage(error));
        }
    }


    static async getResetPassword(data: Partial<IToken>): Promise<IUser> {

        if (!data.accessToken) {
            throw new Error('Token is required');
        }

        try {

            // Crear el hash del token proporcionado
            const hashedToken = crypto.createHash('sha256').update(data.accessToken).digest('hex');

            const user = await UserModel.findOne({
                passwordResetToken: hashedToken,
                passwordResetTokenExpires: { $gt: Date.now() }, // Verificar que el token no haya expirado
            });

            if (!user) {
                throw new Error('Invalid or expired token');
            }

            return user.toObject(); // Convertir el documento a un objeto limpio

        } catch (error) {
            throw new Error(getErrorMessage(error));
        }
    }
    */

    static generateAccessToken(userId: string, tokenVersion: number): string {

        console.log("generateAccessToken - tokenVersion", tokenVersion)
        return jwt.sign({ id: userId, tokenVersion }, process.env.JWT_ACCESS_SECRET!, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || "15m",
        });
    }

    static generateRefreshToken(userId: string, tokenVersion: number): string {
        return jwt.sign({ id: userId, tokenVersion }, process.env.JWT_REFRESH_SECRET!, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || "7d",
        });
    }

    static async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
        await UserModel.findByIdAndUpdate(userId, { refreshToken });
    }

    static async incrementTokenVersion(userId: string): Promise<void> {
        await UserModel.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });
    }

    static async validateRefreshToken(refreshToken: string): Promise<IUser | null> {
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: string };
            const user = await UserModel.findOne({ _id: decoded.id, refreshToken });
            return user || null;
        } catch (error) {
            return null;
        }
    }

    static async refreshToken(refreshToken: string): Promise<string> {
        const user = await this.validateRefreshToken(refreshToken);
        if (!user) {
            throw new Error("Invalid or expired refresh token");
        }

        return this.generateAccessToken(user.id, user.tokenVersion);
    }

    static async logout(refreshToken: string): Promise<void> {
        const user = await UserModel.findOneAndUpdate(
            { refreshToken },
            { refreshToken: null, $inc: { tokenVersion: 1 } }
        );

        if (!user) {
            throw new Error("Invalid refresh token");
        }
    }


    static async generateResetToken(email: string): Promise<string> {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error("User with this email does not exist");
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.resetPasswordToken = resetTokenHash;
        user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora de validez
        await user.save();

        return resetToken; // Este token sin hash se envía al usuario
    }

    static async validateResetToken(token: string): Promise<IUser> {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await UserModel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: new Date() }, // El token debe estar vigente
        });

        if (!user) {
            throw new Error("Invalid or expired token");
        }

        return user.toObject();
    }

    static async changePassword(userId: string, newPassword: string): Promise<IUser> {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.tokenVersion += 1;

        await user.save();

        return user.toObject();
    }





}
