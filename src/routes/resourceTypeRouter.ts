import { Router } from "express";
import {
    ResourceTypeController
} from "../controllers/resourceTypeController";
import { AuthMiddleware } from "../middleware/authMiddleware";

const resourceTypeRouter = Router();

resourceTypeRouter.use(AuthMiddleware.authenticate);

resourceTypeRouter.get("/", ResourceTypeController.getResourceTypes);
resourceTypeRouter.get("/:id", ResourceTypeController.getResourceTypeById);
resourceTypeRouter.post("/", ResourceTypeController.createResourceType);
resourceTypeRouter.delete("/:id", ResourceTypeController.deleteResourceType);
resourceTypeRouter.put("/:id", ResourceTypeController.updateResourceType);

export default resourceTypeRouter;