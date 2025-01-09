
import { Request, Response } from 'express';


export interface IToken {
    _userId: string;
    accessToken: string;
    createdAt: string;
}

export interface ITokenRequest extends Request {
    params: {
        accessToken: string;
    };
}

export interface ITokenResponse extends Response {
    success: boolean;
    message: string;
    accessToken: string;
}