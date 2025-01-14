import { Request, Response } from "express";
import { SellerService } from "../services/sellerService";
import { handleResponse } from "../utils/responseHandler";
import { getErrorMessage } from "../utils/errorHandler";

export const SellerController = {
    async createSeller(req: Request, res: Response) {
        try {
            const seller = await SellerService.createSeller(req.body);
            return handleResponse(res, 201, "Seller created", seller);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async getSellers(req: Request, res: Response) {
        try {
            const sellers = await SellerService.getSellers();
            return handleResponse(res, 200, "Sellers found", sellers);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async getSellerById(req: Request, res: Response) {
        try {
            const seller = await SellerService.getSellerById(req.params.id);
            if (!seller) {
                return handleResponse(res, 404, "Seller not found");
            }
            return handleResponse(res, 200, "Seller found", seller);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async updateSeller(req: Request, res: Response) {
        try {
            const seller = await SellerService.updateSeller(req.body);
            if (!seller) {
                return handleResponse(res, 404, "Seller not found");
            }
            return handleResponse(res, 200, "Sller updated", seller);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },

    async deleteSeller(req: Request, res: Response) {
        try {
            const seller = await SellerService.deleteSeller(req.params.id);
            if (!seller) {
                return handleResponse(res, 404, "Sller not found");
            }
            return handleResponse(res, 200, "Sller deleted", seller);
        } catch (error) {
            return handleResponse(res, 400, getErrorMessage(error));
        }
    },
};
