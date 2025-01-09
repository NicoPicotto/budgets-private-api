import { Request } from "express";

export interface IRequest extends Request {
    currentUser?: any;
    accessToken?: any;
}
