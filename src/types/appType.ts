import { NextFunction, Request, Response } from "express";

export type Middleware = (req: Request, res: Response, next: NextFunction) => void


export interface User {
    firstname?: string;
    lastName?: string;
    email?: string;
    password?: string;
}