import { Router } from "express";
import {
    SellerController
} from "../controllers/sellerController";
import { AuthMiddleware } from "../middleware/authMiddleware";

const sellerRouter = Router();

sellerRouter.use(AuthMiddleware.authenticate);

sellerRouter.get("/", SellerController.getSellers);
sellerRouter.get("/:id", SellerController.getSellerById);
sellerRouter.post("/", SellerController.createSeller);
sellerRouter.delete("/:id", SellerController.deleteSeller);
sellerRouter.put("/:id", SellerController.updateSeller);

export default sellerRouter;