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
};

export type QueryError = {
  status: 'fail';
  message: string;
};

export type Product = {
  id?: number;
  product_name: string;
  category_id?: number;
  price: number;
  producer_country: string;
  producer_info: string;
  main_picture: string;
};

export type CpuProduct = Product & {
  product_id?: number;
  frequency: number;
  model: string;
  socket: string;
  n_cores: number;
};

export type CategoryName = {
  Field: string;
  Type: string;
  Null: string;
  Key: string;
  Default: string | null;
  Extra: string;
};

export type Category = {
  id: number;
  name: string;
  category_picture: string;
  category_description: string;
};
