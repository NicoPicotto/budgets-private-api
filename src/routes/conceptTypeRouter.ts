import { Router } from "express";
import {
    ConceptTypeController
} from "../controllers/conceptTypeController";
import { AuthMiddleware } from "../middleware/authMiddleware";

const conceptTypeRouter = Router();

conceptTypeRouter.use(AuthMiddleware.authenticate);

conceptTypeRouter.get("/", ConceptTypeController.getConceptTypes);
conceptTypeRouter.get("/:id", ConceptTypeController.getConceptTypeById);
conceptTypeRouter.post("/", ConceptTypeController.createConceptType);
conceptTypeRouter.delete("/:id", ConceptTypeController.deleteConceptType);
conceptTypeRouter.put("/:id", ConceptTypeController.updateConceptType);

export default conceptTypeRouter;