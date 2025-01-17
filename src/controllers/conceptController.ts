import { Request, Response } from "express";
import { ConceptService } from "../services/conceptService";
import { handleResponse } from "../utils/responseHandler";
import { getErrorMessage } from "../utils/errorHandler";

export const ConceptController = {
    async createConcept(req: Request, res: Response) {
        try {
            const concept = await ConceptService.createConcept(req.body);
            return handleResponse(res, 201, "Concept created", concept);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async getConcepts(req: Request, res: Response) {
        try {
            const concepts = await ConceptService.getConcepts();
            console.log("cc", concepts)
            return handleResponse(res, 200, "Concepts found", concepts);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async getConceptById(req: Request, res: Response) {
        try {
            const concept = await ConceptService.getConceptById(req.params.id);
            if (!concept) {
                return handleResponse(res, 404, "Concept not found");
            }
            return handleResponse(res, 200, "Concept found", concept);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async updateConcept(req: Request, res: Response) {
        try {
            const concept = await ConceptService.updateConcept(req.params.id, req.body);
            if (!concept) {
                return handleResponse(res, 404, "Concept not found");
            }
            return handleResponse(res, 200, "Concept updated", concept);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async deleteConcept(req: Request, res: Response) {
        try {
            const concept = await ConceptService.deleteConcept(req.params.id);
            if (!concept) {
                return handleResponse(res, 404, "Concept not found");
            }
            return handleResponse(res, 200, "Concept deleted", concept);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },
    async getConceptsByResourceType(req: Request, res: Response) {
        try {
            const concepts = await ConceptService.getConceptsByResourceType(req.params.resourceType);
            return handleResponse(res, 200, "Concepts retrieved", concepts);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },
};
