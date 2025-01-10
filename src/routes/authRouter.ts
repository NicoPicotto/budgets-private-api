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
authRouter.post("/sendInvitation", AuthController.sendInvitation);
authRouter.get("/validateInvitation/:accessToken", AuthController.validateInvitation);
authRouter.post("/acceptInvitation", AuthController.acceptInvitation);
authRouter.post("/revokeToken", AuthMiddleware.authenticate, AuthController.revokeToken);


export default authRouter;
