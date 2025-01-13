import { Request, Response } from "express";
import { ResourceTypeService } from "../services/resourceTypeService";
import { handleResponse } from "../utils/responseHandler";
import { getErrorMessage } from "../utils/errorHandler";

export const ResourceTypeController = {
    async createResourceType(req: Request, res: Response) {
        try {
            const resourceType = await ResourceTypeService.createResourceType(req.body);
            return handleResponse(res, 201, "Resource type created", resourceType);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async getResourceTypes(req: Request, res: Response) {
        try {
            const resourceTypes = await ResourceTypeService.getResourceTypes();
            return handleResponse(res, 200, "Resource types found", resourceTypes);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async getResourceTypeById(req: Request, res: Response) {
        try {
            const resourceType = await ResourceTypeService.getResourceTypeById(req.params.id);
            if (!resourceType) {
                return handleResponse(res, 404, "Resource type not found");
            }
            return handleResponse(res, 200, "Resource type found", resourceType);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async updateResourceType(req: Request, res: Response) {
        try {
            const resourceType = await ResourceTypeService.updateResourceType(req.body);
            if (!resourceType) {
                return handleResponse(res, 404, "Resource type not found");
            }
            return handleResponse(res, 200, "Resource type updated", resourceType);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async deleteResourceType(req: Request, res: Response) {
        try {
            const resourceType = await ResourceTypeService.deleteResourceType(req.params.id);
            if (!resourceType) {
                return handleResponse(res, 404, "Resource type not found");
            }
            return handleResponse(res, 200, "Resource type deleted", resourceType);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },
};
