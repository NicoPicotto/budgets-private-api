import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserRegisterBody, UserLoginBody } from "../interfaces/userInterface";

const userSchema = new mongoose.Schema(
   {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
   },
   { versionKey: false, timestamps: true }
);

const User = mongoose.model("User", userSchema);

// Obtener todos los usuarios
const getAllUsers = async () => {
   try {
      const users = await User.find({}, "-password");
      return users;
   } catch (error) {
      throw new Error("Error al obtener los usuarios");
   }
};

// Obtener un usuario por ID
const getUserById = async (id: string) => {
   try {
      const user = await User.findById(id, "-password");
      if (!user) throw new Error("Usuario no encontrado");
      return user;
   } catch (error) {
      throw new Error("Error al obtener el usuario");
   }
};

// Agregar un nuevo usuario (Registro)
const addUser = async (data: UserRegisterBody) => {
   try {
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) throw new Error("El usuario ya existe");

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = new User({
         ...data,
         password: hashedPassword,
      });
      await newUser.save();
      return newUser;
   } catch (error) {
      throw new Error("Error al registrar usuario");
   }
};

// Eliminar un usuario
const deleteUser = async (id: string) => {
   try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) throw new Error("Usuario no encontrado");
      return deletedUser;
   } catch (error) {
      throw new Error("Error al eliminar usuario");
   }
};

// Actualizar un usuario
const updateUser = async (id: string, data: Partial<UserRegisterBody>) => {
   try {
      const updatedUser = await User.findByIdAndUpdate(
         id,
         { $set: data },
         { new: true, runValidators: true, select: "-password" }
      );
      if (!updatedUser) throw new Error("Usuario no encontrado");
      return updatedUser;
   } catch (error) {
      throw new Error("Error al actualizar el usuario");
   }
};

// Login de usuario
const loginUser = async (data: UserLoginBody) => {
   try {
      const user = await User.findOne({ email: data.email });
      if (!user) throw new Error("Usuario no encontrado");

      const isPasswordCorrect = await bcrypt.compare(
         data.password,
         user.password
      );
      if (!isPasswordCorrect) throw new Error("Credenciales inválidas");

      return {
         email: user.email,
         _id: user._id,
      };
   } catch (error) {
      throw new Error("Error al autenticar usuario");
   }
};

export default {
   getAllUsers,
   getUserById,
   addUser,
   deleteUser,
   updateUser,
   loginUser,
};
