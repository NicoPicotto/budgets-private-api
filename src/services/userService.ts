import { UserModel } from '../models/userModel';
import { IUser } from '../interfaces/userInterface';


export class UserService {

    static async createUser(userData: Partial<IUser>): Promise<IUser> {
        const userExists = await UserModel.findOne({ email: userData.email });
        if (userExists) {
            throw new Error('User already exists');
        }
        const newUser = new UserModel(userData);
        await newUser.save();
        return newUser;
    }

    static async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
        const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
            new: true, // Devuelve el documento actualizado
            runValidators: true, // Ejecuta las validaciones del esquema
        });
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
