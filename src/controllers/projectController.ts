import { Request, Response } from "express";
import { ProjectService } from "../services/projectService";
import { handleResponse } from "../utils/responseHandler";
import { getErrorMessage } from "../utils/errorHandler";

export const ProjectController = {
    async createProject(req: Request, res: Response) {
        try {
            const project = await ProjectService.createProject(req.body);
            return handleResponse(res, 201, "Project created", project);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async getProjects(req: Request, res: Response) {
        try {
            const projects = await ProjectService.getProjects();
            return handleResponse(res, 200, "Projects found", projects);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async getProjectById(req: Request, res: Response) {
        try {
            const project = await ProjectService.getProjectById(req.params.id);
            if (!project) {
                return handleResponse(res, 404, "Project not found");
            }
            return handleResponse(res, 200, "Project found", project);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async updateProject(req: Request, res: Response) {
        try {
            const project = await ProjectService.updateProject(req.params.id, req.body);
            if (!project) {
                return handleResponse(res, 404, "Project not found");
            }
            return handleResponse(res, 200, "Project updated", project);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async deleteProject(req: Request, res: Response) {
        try {
            const project = await ProjectService.deleteProject(req.params.id);
            if (!project) {
                return handleResponse(res, 404, "Project not found");
            }
            return handleResponse(res, 200, "Project deleted", project);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },
};
