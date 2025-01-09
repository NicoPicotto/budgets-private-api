import dotenv from "dotenv";

// Carga las variables de entorno desde el archivo `.env`
dotenv.config();

if (!process.env.PORT || !process.env.URI_DB || !process.env.JWT_SECRET) {
    throw new Error("Missing required environment variables.");
}

export const ENV = {
    PORT: process.env.PORT,
    URI_DB: process.env.URI_DB,
    JWT_SECRET: process.env.JWT_SECRET,
};
