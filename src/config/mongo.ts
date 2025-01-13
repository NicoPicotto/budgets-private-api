import mongoose from "mongoose";

export const connectDB = async () => {
   try {
      await mongoose.connect(process.env.URI_DB || "");
      console.log("Connected to MongoDB");
   } catch (error) {
      console.error("Error conectando a MongoDB:", error);
      process.exit(1);
   }
};
