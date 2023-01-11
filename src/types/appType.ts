import { NextFunction, Request, Response } from 'express';

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type ControllerHandler = (req: Request, res: Response) => void;

export type User = {
  id: number;
  firstname: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  image: string;
}


export type QueryError = {
    status: 'fail';
    message: string;
}
