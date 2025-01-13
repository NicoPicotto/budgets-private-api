import { Request, Response } from "express";
import { ConceptTypeService } from "../services/conceptTypeService";
import { handleResponse } from "../utils/responseHandler";
import { getErrorMessage } from "../utils/errorHandler";

export const ConceptTypeController = {
    async createConceptType(req: Request, res: Response) {
        try {
            const conceptType = await ConceptTypeService.createConceptType(req.body);
            return handleResponse(res, 201, "Concept type created", conceptType);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async getConceptTypes(req: Request, res: Response) {
        try {
            const conceptTypes = await ConceptTypeService.getConceptTypes();
            return handleResponse(res, 200, "Concept types found", conceptTypes);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async getConceptTypeById(req: Request, res: Response) {
        try {
            const conceptType = await ConceptTypeService.getConceptTypeById(req.params.id);
            if (!conceptType) {
                return handleResponse(res, 404, "Concept type not found");
            }
            return handleResponse(res, 200, "Concept type found", conceptType);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async updateConceptType(req: Request, res: Response) {
        try {
            const conceptType = await ConceptTypeService.updateConceptType(req.body);
            if (!conceptType) {
                return handleResponse(res, 404, "Concept type not found");
            }
            return handleResponse(res, 200, "Concept type updated", conceptType);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async deleteConceptType(req: Request, res: Response) {
        try {
            const conceptType = await ConceptTypeService.deleteConceptType(req.params.id);
            if (!conceptType) {
                return handleResponse(res, 404, "Concept type not found");
            }
            return handleResponse(res, 200, "Concept type deleted", conceptType);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },
};
