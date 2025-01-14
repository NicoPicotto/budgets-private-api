import { Request, Response } from "express";
import { ClientService } from "../services/clientService";
import { handleResponse } from "../utils/responseHandler";
import { getErrorMessage } from "../utils/errorHandler";

export const ClientController = {
   async createClient(req: Request, res: Response) {
      try {
         const client = await ClientService.createClient(req.body);
         return handleResponse(res, 201, "Client created", client);
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error));
      }
   },

   async getClients(req: Request, res: Response) {
      try {
         const clients = await ClientService.getClients();
         return handleResponse(res, 200, "Clients found", clients);
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error));
      }
   },

   async getClientById(req: Request, res: Response) {
      try {
         const client = await ClientService.getClientById(req.params.id);
         if (!client) {
            return handleResponse(res, 404, "Client not found");
         }
         return handleResponse(res, 200, "Client found", client);
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error));
      }
   },

   async updateClient(req: Request, res: Response) {
      try {
         const client = await ClientService.updateClient(req.params.id, req.body);
         if (!client) {
            return handleResponse(res, 404, "Client not found");
         }
         return handleResponse(res, 200, "Client updated", client);
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error));
      }
   },

   async deleteClient(req: Request, res: Response) {
      try {
         const client = await ClientService.deleteClient(req.params.id);
         if (!client) {
            return handleResponse(res, 404, "Client not found");
         }
         return handleResponse(res, 200, "Client deleted", client);
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error));
      }
   },

   async getProjects(req: Request, res: Response) {
      try {
         const projects = await ClientService.getProjects(req.params.id);
         if (!projects || projects.length === 0) {
            return handleResponse(res, 404, "Projects not found for this client");
         }
         return handleResponse(res, 200, "Projects found", projects);
      } catch (error) {
         return handleResponse(res, 400, getErrorMessage(error));
      }
   },
};
