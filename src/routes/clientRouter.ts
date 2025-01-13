import { Router } from "express";
import {
   ClientController
} from "../controllers/clientController";
import { AuthMiddleware } from "../middleware/authMiddleware";

const clientRouter = Router();

clientRouter.use(AuthMiddleware.authenticate);

clientRouter.get("/", ClientController.getClients);
clientRouter.get("/:id", ClientController.getClientById);
clientRouter.post("/", ClientController.createClient);
clientRouter.delete("/:id", ClientController.deleteClient);
clientRouter.put("/:id", ClientController.updateClient);

export default clientRouter;
