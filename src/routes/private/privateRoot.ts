import express from "express";
import { protectMiddleware } from "../../middlewares/protectionMiddlewares";
import userRouter from "./userRouter";

const privateRoute = express.Router();

privateRoute.use(protectMiddleware)

privateRoute.use("user", userRouter);

export default privateRoute;
