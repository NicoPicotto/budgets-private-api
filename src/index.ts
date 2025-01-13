import "dotenv/config";
import { connectDB } from "./config/mongo";
import express from "express";
import cors from "cors";
import budgetRouter from "./routes/budgetRouter";
import authRouter from "./routes/authRouter";
import clientRouter from "./routes/clientRouter";
import userRouter from "./routes/userRouter";
import conceptRouter from "./routes/conceptRouter";
import resourceTypeRouter from "./routes/resourceTypeRouter";
import conceptTypeRouter from "./routes/conceptTypeRouter";
import projectRouter from "./routes/projectRouter";


const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());


connectDB();

app.use("/api/budgets", budgetRouter);
app.use("/api/auth", authRouter);
app.use("/api/clients", clientRouter);
app.use("/api/users", userRouter);
app.use("/api/concepts", conceptRouter);
app.use("/api/concepttypes", conceptTypeRouter);
app.use("/api/resourcetypes", resourceTypeRouter);
app.use("/api/projects", projectRouter);



app.listen(PORT, () => {
   console.log("Server is running on port", PORT);
});
