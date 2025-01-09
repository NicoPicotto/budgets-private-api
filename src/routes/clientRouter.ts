import { Router } from "express";
import {
   getAllClients,
   addClient,
   deleteClient,
   getClientById,
   updateClient,
} from "../controllers/clientController";
import { AuthMiddleware } from "../middleware/authMiddleware";

const clientRouter = Router();

clientRouter.use(AuthMiddleware.authenticate);

clientRouter.get("/", getAllClients);
clientRouter.get("/:id", getClientById);
clientRouter.post("/", addClient);
clientRouter.delete("/:id", deleteClient);
clientRouter.put("/:id", updateClient);

export default clientRouter;
