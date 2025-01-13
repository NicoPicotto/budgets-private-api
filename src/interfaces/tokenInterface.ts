
import { Request, Response } from 'express';


export interface IToken {
    _userId: string;
    accessToken: string;
    createdAt: string;
}
