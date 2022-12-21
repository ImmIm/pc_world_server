import { Middleware } from "../types/appType";

export const protectMiddleware: Middleware = (req, res, next) => {
  if (req.headers.appName !== "pc_world") {
    res.status(403).send({ status: "fail" });
  }

  next();
};


