import { ControllerHandler } from "../types/appType";
import { isUserValid } from "../database/authDBhandlers";

export const login: ControllerHandler = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ status: "fail" });
  }

 isUserValid(req.body.email, req.body.password)
};



const authController = {
  login,
};

export default authController;
