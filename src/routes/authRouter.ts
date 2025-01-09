import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { AuthMiddleware } from "../middleware/authMiddleware";


const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/", AuthController.login);

authRouter.post("/forgotPassword", AuthController.forgotPassword);
authRouter.post("/changePassword", AuthMiddleware.authenticate, AuthController.changePassword);
authRouter.post("/resetPassword", AuthController.resetPassword);
authRouter.get("/validateResetToken/:accessToken", AuthController.validateResetToken);
authRouter.post("/refreshToken", AuthController.refreshToken);
authRouter.post("/logout", AuthController.logout);

export default authRouter;
