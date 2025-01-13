import { Router } from "express";
import {
    ConceptController
} from "../controllers/conceptController";
import { AuthMiddleware } from "../middleware/authMiddleware";

const conceptRouter = Router();

conceptRouter.use(AuthMiddleware.authenticate);

conceptRouter.get("/", ConceptController.getConcepts);
conceptRouter.get("/:id", ConceptController.getConceptById);
conceptRouter.post("/", ConceptController.createConcept);
conceptRouter.delete("/:id", ConceptController.deleteConcept);
conceptRouter.put("/:id", ConceptController.updateConcept);

export default conceptRouter;