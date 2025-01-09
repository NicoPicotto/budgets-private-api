import { Response } from 'express';

interface IResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: any;
}

export const handleResponse = <T>(
    res: Response,
    statusCode: number,
    message: string,
    data?: T,
    error?: any
): Response => {
    const response: IResponse<T> = {
        success: statusCode >= 200 && statusCode < 300,
        message,
        data,
        error,
    };
    return res.status(statusCode).json(response);
};
