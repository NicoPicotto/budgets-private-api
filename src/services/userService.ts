import { UserModel } from '../models/userModel';
import { IUser } from '../interfaces/userInterface';
import { USER_STATES, ROLES } from '../config/constants';

export class UserService {

    static validateUserData(userData: Partial<IUser>): void {
        const errors = [];

        if (!userData.firstName || userData.firstName.trim().length < 3) {
            errors.push({ field: "firstNAme", message: "First Name must be at least 3 characters long." });
        }

        if (!userData.lastName || userData.lastName.trim().length < 3) {
            errors.push({ field: "lastName", message: "Last Name must be at least 3 characters long." });
        }

        if (!userData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            errors.push({ field: "email", message: "A valid email is required." });
        }

        if (userData.password && userData.password.length < 6) {
            errors.push({ field: "password", message: "Password must be at least 6 characters long." });
        }

        if (userData.role && !Object.values(ROLES).includes(userData.role as any)) {
            errors.push({ field: "state", message: "Role must be one of Admin, User, or Moderator." });
        }

        if (userData.state && !Object.values(USER_STATES).includes(userData.state as any)) {
            errors.push({ field: "state", message: "State must be a valid budget state." });
        }

        if (errors.length > 0) {
            throw new Error(JSON.stringify(errors));
        }
    }


    static async createUser(userData: Partial<IUser>): Promise<IUser> {

        this.validateUserData(userData);

        const userExists = await UserModel.findOne({ email: userData.email });
        if (userExists) {
            throw new Error('User already exists');
        }
        const newUser = new UserModel(userData);
        await newUser.save();
        return newUser;
    }

    static async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser> {

        this.validateUserData(updateData);

        const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            throw new Error('Error updating user');
        }
        return updatedUser;
    }

    static async getUsers(): Promise<IUser[]> {
        return await UserModel.find({}, "-password");
    }

    static async getUserById(id: string): Promise<IUser | null> {
        return await UserModel.findById(id, "-password");
    }

    static async deleteUser(id: string): Promise<IUser | null> {

        return await UserModel.findByIdAndDelete(id);
    }
}
