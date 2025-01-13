import { Router } from "express";
import {
    ProjectController
} from "../controllers/projectController";
import { AuthMiddleware } from "../middleware/authMiddleware";

const projectRouter = Router();

projectRouter.use(AuthMiddleware.authenticate);


projectRouter.get("/", ProjectController.getProjects);
projectRouter.get("/:id", ProjectController.getProjectById);
projectRouter.post("/", ProjectController.createProject);
projectRouter.put("/:id", ProjectController.updateProject);
projectRouter.delete("/:id", ProjectController.deleteProject);

export default projectRouter;